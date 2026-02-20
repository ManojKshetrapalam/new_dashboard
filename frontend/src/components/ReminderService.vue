<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import axios from 'axios'
import { Bell, X } from 'lucide-vue-next'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const upcomingReminders = ref([])
const seenReminders = ref(new Set())
const activeReminder = ref(null)
let pollInterval = null

const fetchReminders = async () => {
    if (!auth.isAuthenticated) return

    try {
        const response = await axios.get('/leads/upcoming-followups')
        const leads = response.data
        
        const now = new Date()
        // We trigger the reminder if it's within the next 6 minutes
        const sixMinutesFromNow = new Date(now.getTime() + 6 * 60000)

        leads.forEach(lead => {
            if (seenReminders.value.has(lead.id)) return

            // Lead follow_up_at is in UTC from server. new Date() parses it correctly.
            const followUpTime = new Date(lead.follow_up_at)
            
            if (followUpTime > now && followUpTime <= sixMinutesFromNow) {
                activeReminder.value = lead
                seenReminders.value.add(lead.id)
            }
        })
    } catch (err) {
        if (err.response?.status !== 401) {
            console.error('Failed to fetch reminders', err)
        }
    }
}

onMounted(() => {
    fetchReminders()
    pollInterval = setInterval(fetchReminders, 60000) // Poll every minute
})

onUnmounted(() => {
    if (pollInterval) clearInterval(pollInterval)
})

const closeReminder = () => {
    activeReminder.value = null
}
</script>

<template>
    <div v-if="activeReminder" class="reminder-overlay">
        <div class="reminder-popup">
            <div class="reminder-header">
                <div class="bell-icon">
                    <Bell :size="20" />
                </div>
                <h3>Follow-up Reminder</h3>
                <button @click="closeReminder" class="close-btn">
                    <X :size="18" />
                </button>
            </div>
            <div class="reminder-body">
                <p class="lead-name">{{ activeReminder.name }}</p>
                <p class="enquiry">{{ activeReminder.enquiry_for }}</p>
                <p class="time">Follow-up scheduled for {{ new Date(activeReminder.follow_up_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}</p>
            </div>
            <div class="reminder-footer">
                <router-link :to="`/leads/${activeReminder.id}`" @click="closeReminder" class="btn-primary view-btn">
                    View Lead Details
                </router-link>
            </div>
        </div>
    </div>
</template>

<style scoped>
.reminder-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
}

.reminder-popup {
    width: 360px;
    background-color: #1e1e1e;
    border: 1px solid #333;
    border-radius: 16px;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
    padding: 24px;
    animation: zoomIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    color: #fff;
}

@keyframes zoomIn {
    from { transform: scale(0.9); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
}

.reminder-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
}

.bell-icon {
    background-color: rgba(242, 13, 13, 0.1);
    color: #f20d0d;
    padding: 8px;
    border-radius: 8px;
    display: flex;
}

.reminder-header h3 {
    font-size: 1rem;
    font-weight: 600;
    margin: 0;
    flex: 1;
}

.close-btn {
    background: none;
    border: none;
    color: #888;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
}

.close-btn:hover {
    background-color: #333;
    color: #fff;
}

.reminder-body {
    margin-bottom: 20px;
}

.lead-name {
    font-weight: 700;
    font-size: 1.125rem;
    margin: 0 0 4px 0;
}

.enquiry {
    font-size: 0.875rem;
    color: #aaa;
    margin: 0 0 8px 0;
}

.time {
    font-size: 0.8125rem;
    color: #f20d0d;
    font-weight: 500;
    margin: 0;
}

.reminder-footer .view-btn {
    text-align: center;
    text-decoration: none;
    display: block;
    font-size: 0.875rem;
    background-color: #f20d0d;
    color: white;
    padding: 10px;
    border-radius: 6px;
    font-weight: 600;
}

.reminder-footer .view-btn:hover {
    background-color: #d10a0a;
}
</style>
