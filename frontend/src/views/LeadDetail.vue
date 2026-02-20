<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLeadStore } from '../stores/leads'
import axios from 'axios'
import { 
  ArrowLeft, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  User, 
  MessageSquare,
  History,
  Briefcase,
  TrendingUp
} from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const leadStore = useLeadStore()

const lead = ref(null)
const loading = ref(true)
const newNote = ref('')
const isSaving = ref(false)

const leadStatuses = ref([])
const selectedStatus = ref(null)
const followUpAt = ref('')
const isUpdatingStatus = ref(false)

const fetchStatuses = async () => {
  try {
    const response = await axios.get('/lead-statuses')
    leadStatuses.value = response.data
  } catch (err) {
    console.error('Error fetching statuses', err)
  }
}

const fetchLead = async () => {
  loading.value = true
  try {
    const response = await leadStore.fetchLeadDetails(route.params.id)
    lead.value = response
    selectedStatus.value = response.lead_status_id
    
    if (response.follow_up_at) {
        const date = new Date(response.follow_up_at);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        followUpAt.value = `${year}-${month}-${day}T${hours}:${minutes}`;
    }
  } catch (err) {
    console.error('Error fetching lead', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchLead()
  fetchStatuses()
})

const handleSaveNote = async () => {
  if (!newNote.value.trim() || isSaving.value) return

  isSaving.value = true
  try {
    const note = await leadStore.addLeadNote(lead.value.id, newNote.value)
    // Add to local lead object
    if (!lead.value.notes) lead.value.notes = []
    lead.value.notes.unshift(note)
    newNote.value = ''
  } catch (err) {
    alert('Failed to save note')
  } finally {
    isSaving.value = false
  }
}

const handleUpdateStatus = async () => {
  if (!selectedStatus.value || isUpdatingStatus.value) return
  
  if (selectedStatus.value === 3 && !followUpAt.value) {
    alert('Please select a follow-up date and time')
    return
  }

  isUpdatingStatus.value = true
  try {
    const utcFollowUp = followUpAt.value ? new Date(followUpAt.value).toISOString() : null
    const updatedLead = await leadStore.updateLeadStatus(
      lead.value.id, 
      selectedStatus.value, 
      selectedStatus.value === 3 ? utcFollowUp : null
    )
    lead.value.status = updatedLead.status
    lead.value.lead_status_id = updatedLead.lead_status_id
    lead.value.follow_up_at = updatedLead.follow_up_at
    alert('Status updated successfully')
  } catch (err) {
    alert('Failed to update status')
  } finally {
    isUpdatingStatus.value = false
  }
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<template>
  <div class="lead-detail-view">
    <div class="header">
      <button @click="router.back()" class="back-btn">
        <ArrowLeft :size="20" />
        <span>Back to Leads</span>
      </button>
    </div>

    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Loading lead profile...</p>
    </div>

    <div v-else-if="lead" class="profile-container">
      <div class="main-column">
        <!-- Lead Card -->
        <div class="card lead-card">
          <div class="lead-header">
            <div class="avatar-large">{{ lead.name?.substring(0, 1).toUpperCase() }}</div>
            <div class="title-info">
              <h1>{{ lead.name }}</h1>
              <span 
                class="badge status" 
                :style="{ backgroundColor: lead.status?.color + '22', color: lead.status?.color }"
              >
                {{ lead.status?.name }}
              </span>
            </div>
          </div>

          <div class="contact-grid">
            <div class="contact-item">
              <Phone :size="18" class="icon" />
              <div class="info">
                <span class="label">Mobile</span>
                <span class="value">{{ lead.mobile }}</span>
              </div>
            </div>
            <div class="contact-item">
              <MapPin :size="18" class="icon" />
              <div class="info">
                <span class="label">City</span>
                <span class="value">{{ lead.city || 'Not specified' }}</span>
              </div>
            </div>
            <div class="contact-item">
              <Calendar :size="18" class="icon" />
              <div class="info">
                <span class="label">Received</span>
                <span class="value">{{ formatDate(lead.created_at) }}</span>
              </div>
            </div>
            <div class="contact-item">
              <Briefcase :size="18" class="icon" />
              <div class="info">
                <span class="label">Enquiry For</span>
                <span class="value">{{ lead.enquiry_for }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Notes Section -->
        <div class="card notes-section">
          <div class="section-title">
            <MessageSquare :size="20" />
            <h2>Notes & Communication</h2>
          </div>
          
          <div v-if="lead.notes && lead.notes.length > 0" class="notes-list">
            <div v-for="note in lead.notes" :key="note.id" class="note-item">
              <div class="note-header">
                <span class="author">{{ note.user?.name }}</span>
                <span class="date">{{ formatDate(note.created_at) }}</span>
              </div>
              <p class="note-content">{{ note.content }}</p>
            </div>
          </div>
          <p v-else class="empty-note">No internal notes for this lead yet.</p>
          
          <div class="add-note">
             <textarea 
               v-model="newNote" 
               placeholder="Write a note..." 
               :disabled="isSaving"
             ></textarea>
             <button 
               @click="handleSaveNote" 
               class="btn-primary" 
               :disabled="isSaving || !newNote.trim()"
             >
               {{ isSaving ? 'Saving...' : 'Add Note' }}
             </button>
          </div>
        </div>
      </div>

      <aside class="side-column">
        <div class="card timeline-card">
          <div class="section-title">
            <History :size="20" />
            <h2>Timeline</h2>
          </div>
          <div class="timeline">
            <div class="timeline-item">
              <div class="dot active"></div>
              <div class="content">
                <span class="time">{{ formatDate(lead.created_at) }}</span>
                <p>Lead Ingested from Website</p>
              </div>
            </div>
          </div>
        </div>

        <div class="card info-card">
           <div class="section-title">
            <User :size="20" />
            <h2>Internal Assignment</h2>
          </div>
          <div class="internal-info">
            <div class="info-row">
              <span class="label">Vertical</span>
              <span class="value">{{ lead.vertical?.name || 'N/A' }}</span>
            </div>
            <div class="info-row">
              <span class="label">Assigned Agent</span>
              <span class="value">{{ lead.assign_to || 'Unassigned' }}</span>
            </div>
          </div>
        </div>

        <!-- Status Update Card -->
        <div class="card status-card">
          <div class="section-title">
            <TrendingUp :size="20" />
            <h2>Update Status</h2>
          </div>
          <div class="status-form">
            <div class="form-group">
              <label>Current Status</label>
              <select v-model="selectedStatus" class="form-select">
                <option v-for="status in leadStatuses" :key="status.id" :value="status.id">
                  {{ status.name }}
                </option>
              </select>
            </div>
            
            <div v-if="selectedStatus === 3" class="form-group">
              <label>Follow-up Date & Time</label>
              <input type="datetime-local" v-model="followUpAt" class="form-input" />
            </div>

            <button 
              @click="handleUpdateStatus" 
              class="btn-primary w-full" 
              :disabled="isUpdatingStatus"
            >
              {{ isUpdatingStatus ? 'Updating...' : 'Update Status' }}
            </button>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.lead-detail-view {
  padding: var(--spacing-xl);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

.status-card {
  margin-top: var(--spacing-lg);
}

.status-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
}

.form-select, .form-input {
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  padding: 10px 12px;
  color: var(--text-primary);
  font-size: 0.875rem;
  outline: none;
  transition: border-color 0.2s;
}

.form-select:focus, .form-input:focus {
  border-color: var(--accent-primary);
}

.w-full {
  width: 100%;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: none;
  color: var(--text-secondary);
  font-weight: 500;
  cursor: pointer;
  transition: color 0.2s;
}

.back-btn:hover {
  color: var(--text-primary);
}

.profile-container {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: var(--spacing-xl);
}

.main-column {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

.lead-card {
  padding: var(--spacing-xl);
}

.lead-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-xl);
}

.avatar-large {
  width: 80px;
  height: 80px;
  background-color: var(--accent-primary);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 700;
  color: white;
}

.title-info h1 {
  font-size: 2rem;
  margin-bottom: 8px;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-xl);
}

.contact-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.contact-item .icon {
  color: var(--text-muted);
}

.contact-item .info {
  display: flex;
  flex-direction: column;
}

.contact-item .label {
  font-size: 0.75rem;
  color: var(--text-muted);
  text-transform: uppercase;
  font-weight: 600;
}

.contact-item .value {
  font-size: 1.125rem;
  font-weight: 500;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: var(--spacing-lg);
}

.section-title h2 {
  font-size: 1.125rem;
  font-weight: 600;
}

.notes-section {
  flex: 1;
}

.empty-note {
  color: var(--text-muted);
  font-style: italic;
  margin-bottom: var(--spacing-lg);
}

.notes-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
}

.note-item {
  background-color: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
}

.note-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.note-header .author {
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--accent-primary);
}

.note-header .date {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.note-content {
  font-size: 0.95rem;
  line-height: 1.5;
  white-space: pre-wrap;
}

.add-note textarea {
  width: 100%;
  height: 100px;
  background-color: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  color: var(--text-primary);
  font-family: inherit;
  margin-bottom: var(--spacing-md);
  resize: none;
}

.add-note textarea:focus {
  outline: none;
  border-color: var(--accent-primary);
}

.timeline {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  position: relative;
  padding-left: 14px;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background-color: var(--border-primary);
}

.timeline-item {
  position: relative;
}

.timeline-item .dot {
  position: absolute;
  left: -19px;
  top: 6px;
  width: 12px;
  height: 12px;
  background-color: var(--bg-secondary);
  border: 2px solid var(--border-primary);
  border-radius: 50%;
}

.timeline-item .dot.active {
  background-color: var(--accent-primary);
  border-color: var(--accent-primary);
}

.timeline-item .content {
  display: flex;
  flex-direction: column;
}

.timeline-item .time {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.timeline-item p {
  font-size: 0.95rem;
}

.internal-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.info-row {
  display: flex;
  justify-content: space-between;
}

.info-row .label {
  color: var(--text-secondary);
  font-size: 0.875rem;
}

.info-row .value {
  font-weight: 500;
}

.badge {
  padding: 4px 12px;
  border-radius: var(--radius-full);
  font-size: 0.875rem;
  font-weight: 600;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  color: var(--text-secondary);
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--border-primary);
  border-top-color: var(--accent-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: var(--spacing-md);
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
