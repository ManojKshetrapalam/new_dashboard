<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useLeadStore } from '../stores/leads'
import { TrendingUp, Users, Clock, ArrowRight } from 'lucide-vue-next'
import ManagerDashboard from './ManagerDashboard.vue'

const authStore = useAuthStore()
const leadStore = useLeadStore()

onMounted(() => {
  if (!authStore.isManager && !authStore.isSuperAdmin) {
    leadStore.fetchDashboardData()
  }
})

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}
</script>

<template>
  <ManagerDashboard v-if="authStore.isManager || authStore.isSuperAdmin" />
  
  <div v-else class="dashboard-view">
    <div class="header">
      <h1 class="title">Overview</h1>
      <p class="subtitle">Welcome back to your wedding business dashboard.</p>
    </div>

    <div class="stats-grid">
      <div class="stat-card card">
        <div class="stat-icon users"><Users :size="24" /></div>
        <div class="stat-info">
          <span class="stat-label">Total Leads</span>
          <span class="stat-value">{{ leadStore.stats.total_leads }}</span>
        </div>
      </div>
      
      <div class="stat-card card">
        <div class="stat-icon conversion"><TrendingUp :size="24" /></div>
        <div class="stat-info">
          <span class="stat-label">Conversion Rate</span>
          <span class="stat-value">{{ leadStore.stats.conversion_rate }}%</span>
        </div>
      </div>

      <div class="stat-card card">
        <div class="stat-icon active"><Clock :size="24" /></div>
        <div class="stat-info">
          <span class="stat-label">Active Enquiries</span>
          <span class="stat-value">18</span>
        </div>
      </div>
    </div>

    <section class="recent-leads">
      <div class="section-header">
        <h2 class="section-title">Recent Leads</h2>
        <RouterLink to="/leads" class="view-all">
          View All <ArrowRight :size="16" />
        </RouterLink>
      </div>

      <div class="card table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="lead in leadStore.recentLeads" :key="lead.id">
              <td>
                <div class="lead-name">
                  <span class="name">{{ lead.name }}</span>
                  <span class="mobile">{{ lead.mobile }}</span>
                </div>
              </td>
              <td><span class="badge category">{{ lead.enquiry_for }}</span></td>
              <td>
                <span 
                  class="badge status" 
                  :style="{ backgroundColor: lead.status?.color + '22', color: lead.status?.color }"
                >
                  {{ lead.status?.name }}
                </span>
              </td>
              <td>{{ formatDate(lead.created_at) }}</td>
            </tr>
            <tr v-if="leadStore.recentLeads.length === 0">
              <td colspan="4" class="empty-state">No recent leads found.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<style scoped>
.dashboard-view {
  padding: var(--spacing-xl);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

.header {
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

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: var(--spacing-lg);
}

.stat-card {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  padding: var(--spacing-lg);
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-icon.users { background-color: rgba(59, 130, 246, 0.1); color: #3b82f6; }
.stat-icon.conversion { background-color: rgba(242, 13, 13, 0.1); color: var(--accent-primary); }
.stat-icon.active { background-color: rgba(16, 185, 129, 0.1); color: #10b981; }

.stat-info {
  display: flex;
  flex-direction: column;
}

.stat-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
}

.recent-leads {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
}

.view-all {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.875rem;
  font-weight: 500;
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
  padding: var(--spacing-md) var(--spacing-lg);
  border-bottom: 1px solid var(--border-primary);
  font-size: 0.95rem;
}

.lead-name {
  display: flex;
  flex-direction: column;
}

.lead-name .name {
  font-weight: 500;
}

.lead-name .mobile {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.badge {
  padding: 4px 10px;
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 600;
}

.badge.category {
  background-color: var(--bg-tertiary);
  color: var(--text-secondary);
}

.empty-state {
  text-align: center;
  color: var(--text-muted);
  padding: var(--spacing-xl) !important;
}
</style>
