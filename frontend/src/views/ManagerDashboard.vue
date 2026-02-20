<script setup>
import { onMounted, ref, watch } from 'vue'
import { useManagerStore } from '../stores/manager'
import { 
  Users, 
  TrendingUp, 
  CheckCircle, 
  Clock, 
  MessageSquare, 
  Calendar,
  ExternalLink
} from 'lucide-vue-next'

const managerStore = useManagerStore()
const selectedDate = ref(new Date().toISOString().split('T')[0])

const fetchStats = () => {
  managerStore.fetchManagerDashboard(selectedDate.value)
}

onMounted(() => {
  fetchStats()
})

watch(selectedDate, () => {
  fetchStats()
})

const formatDate = (dateString) => {
  if (!dateString) return 'Never'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatLeadDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}
</script>

<template>
  <div class="manager-dashboard">
    <div class="header">
      <div class="title-section">
        <h1 class="title">Manager Dashboard</h1>
        <p class="subtitle">Monitor team performance and lead pipeline.</p>
      </div>
      <div class="filter-section">
        <div class="date-picker">
          <Calendar :size="18" />
          <input type="date" v-model="selectedDate" />
        </div>
      </div>
    </div>

    <!-- Aggregated Stats -->
    <div class="stats-grid">
      <div class="stat-card card">
        <div class="stat-icon assigned"><Clock :size="24" /></div>
        <div class="stat-info">
          <span class="stat-label">Assigned Today</span>
          <span class="stat-value">{{ managerStore.aggregatedStats.total_assigned }}</span>
        </div>
      </div>
      
      <div class="stat-card card">
        <div class="stat-icon connected"><TrendingUp :size="24" /></div>
        <div class="stat-info">
          <span class="stat-label">Connected</span>
          <span class="stat-value">{{ managerStore.aggregatedStats.total_connected }}</span>
        </div>
      </div>

      <div class="stat-card card">
        <div class="stat-icon converted"><CheckCircle :size="24" /></div>
        <div class="stat-info">
          <span class="stat-label">Converted</span>
          <span class="stat-value">{{ managerStore.aggregatedStats.total_converted }}</span>
        </div>
      </div>
    </div>

    <!-- Team Activity Table -->
    <section class="team-activity">
      <div class="section-header">
        <h2 class="section-title">Team Performance</h2>
      </div>
      <div class="card table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Manager/Subordinate</th>
              <th>Last Login</th>
              <th>Assigned</th>
              <th>Connected</th>
              <th>Converted</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="member in managerStore.teamActivity" :key="member.id">
              <td>
                <div class="member-info">
                  <span class="name">{{ member.name }}</span>
                </div>
              </td>
              <td><span class="login-time">{{ formatDate(member.last_login) }}</span></td>
              <td><span class="count-badge">{{ member.leads_assigned }}</span></td>
              <td><span class="count-badge connected">{{ member.leads_connected }}</span></td>
              <td><span class="count-badge converted">{{ member.leads_converted }}</span></td>
              <td>
                <span class="status-indicator" :class="{ active: member.is_logged_in }">
                  {{ member.is_logged_in ? 'Online' : 'Offline' }}
                </span>
              </td>
            </tr>
            <tr v-if="managerStore.teamActivity.length === 0">
              <td colspan="6" class="empty-state">No team members found.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Combined Lead Feed -->
    <section class="leads-feed">
      <div class="section-header">
        <h2 class="section-title">Latest Team Activity & Remarks</h2>
      </div>
      <div class="leads-grid">
        <div v-for="lead in managerStore.teamLeads" :key="lead.id" class="lead-item card">
          <div class="lead-main">
            <div class="lead-header">
              <div class="lead-title">
                <h3>{{ lead.name }}</h3>
                <span class="agent-tag">Assigned to: {{ lead.assign_to }}</span>
              </div>
              <span 
                class="badge status" 
                :style="{ backgroundColor: lead.status?.color + '22', color: lead.status?.color }"
              >
                {{ lead.status?.name }}
              </span>
            </div>
            
            <div class="lead-meta">
              <span>{{ lead.enquiry_for }}</span>
              <span class="dot"></span>
              <span>{{ formatLeadDate(lead.created_at) }}</span>
            </div>

            <!-- Latest Remark -->
            <div v-if="lead.notes && lead.notes.length > 0" class="latest-remark">
              <div class="remark-header">
                <MessageSquare :size="14" />
                <span>Latest Remark by {{ lead.notes[0].user?.name }}</span>
              </div>
              <p class="remark-text">{{ lead.notes[0].content }}</p>
            </div>
            <div v-else class="no-remark">
              No remarks entered yet.
            </div>
          </div>
          
          <div class="lead-actions">
            <RouterLink :to="'/leads/' + lead.id" class="btn-icon">
              <ExternalLink :size="18" />
            </RouterLink>
          </div>
        </div>
        <div v-if="managerStore.teamLeads.length === 0" class="empty-card card">
           No leads found for your team.
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.manager-dashboard {
  padding: var(--spacing-xl);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
}

.title {
  font-size: 1.875rem;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.subtitle {
  color: var(--text-secondary);
  margin-top: 4px;
}

.date-picker {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  padding: 8px 12px;
  border-radius: var(--radius-md);
  color: var(--text-secondary);
}

.date-picker input {
  background: transparent;
  border: none;
  color: var(--text-primary);
  font-family: inherit;
  font-size: 0.875rem;
  outline: none;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-lg);
}

.stat-card {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  padding: var(--spacing-xl);
}

.stat-icon {
  width: 56px;
  height: 56px;
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-icon.assigned { background-color: rgba(59, 130, 246, 0.1); color: #3b82f6; }
.stat-icon.connected { background-color: rgba(245, 158, 11, 0.1); color: #f59e0b; }
.stat-icon.converted { background-color: rgba(16, 185, 129, 0.1); color: #10b981; }

.stat-info {
  display: flex;
  flex-direction: column;
}

.stat-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.stat-value {
  font-size: 2rem;
  font-weight: 800;
  line-height: 1;
  margin-top: 4px;
}

.section-header {
  margin-bottom: var(--spacing-lg);
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
}

.table-container {
  padding: 0;
  overflow: hidden;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.data-table th {
  padding: var(--spacing-md) var(--spacing-lg);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--text-muted);
  border-bottom: 1px solid var(--border-primary);
}

.data-table td {
  padding: var(--spacing-lg);
  border-bottom: 1px solid var(--border-primary);
}

.name {
  font-weight: 600;
  color: var(--text-primary);
}

.login-time {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.count-badge {
  display: inline-flex;
  padding: 4px 12px;
  background-color: var(--bg-tertiary);
  border-radius: var(--radius-full);
  font-weight: 700;
  font-size: 0.875rem;
}

.count-badge.connected { color: #f59e0b; }
.count-badge.converted { color: #10b981; }

.status-indicator {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-muted);
}

.status-indicator::before {
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--text-muted);
}

.status-indicator.active {
  color: #10b981;
}

.status-indicator.active::before {
  background-color: #10b981;
  box-shadow: 0 0 8px rgba(16, 185, 129, 0.4);
}

.leads-feed {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.leads-grid {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.lead-item {
  display: flex;
  justify-content: space-between;
  padding: var(--spacing-lg);
}

.lead-header {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-xl);
  margin-bottom: 8px;
}

.lead-title h3 {
  font-size: 1.125rem;
  font-weight: 600;
}

.agent-tag {
  font-size: 0.75rem;
  color: var(--text-muted);
  font-weight: 500;
}

.badge.status {
  padding: 4px 10px;
  border-radius: var(--radius-full);
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
}

.lead-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.875rem;
  color: var(--text-muted);
  margin-bottom: var(--spacing-md);
}

.dot {
  width: 4px;
  height: 4px;
  background-color: var(--text-muted);
  border-radius: 50%;
}

.latest-remark {
  background-color: var(--bg-secondary);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  border-left: 3px solid var(--accent-primary);
}

.remark-header {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: 6px;
}

.remark-text {
  font-size: 0.875rem;
  line-height: 1.5;
  color: var(--text-primary);
}

.no-remark {
  font-size: 0.875rem;
  font-style: italic;
  color: var(--text-muted);
}

.btn-icon {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  color: var(--text-muted);
  background-color: var(--bg-tertiary);
  transition: all 0.2s;
}

.btn-icon:hover {
  background-color: var(--accent-primary);
  color: white;
}

.empty-card {
  padding: var(--spacing-xl);
  text-align: center;
  color: var(--text-muted);
  font-style: italic;
}
</style>
