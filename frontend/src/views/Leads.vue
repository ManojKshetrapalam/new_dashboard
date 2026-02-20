<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useLeadStore } from '../stores/leads'
import { Search, Filter, ChevronLeft, ChevronRight, MoreVertical } from 'lucide-vue-next'

const leadStore = useLeadStore()
const router = useRouter()
const searchQuery = ref('')
const statusFilter = ref('')

const fetchLeads = (page = 1) => {
  leadStore.fetchLeads(page, {
    search: searchQuery.value,
    status: statusFilter.value
  })
}

onMounted(() => {
  fetchLeads()
})

watch([searchQuery, statusFilter], () => {
  fetchLeads(1)
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
  <div class="leads-view">
    <div class="header">
      <h1 class="title">Leads Hub</h1>
      <p class="subtitle">Manage and track your wedding enquiries.</p>
    </div>

    <div class="controls card">
      <div class="search-box">
        <Search :size="18" class="search-icon" />
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Search leads by name or mobile..." 
          class="search-input"
        >
      </div>

      <div class="filters">
        <div class="filter-group">
          <Filter :size="18" />
          <select v-model="statusFilter" class="filter-select">
            <option value="">All Statuses</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Interested">Interested</option>
            <option value="Converted">Converted</option>
          </select>
        </div>
      </div>
    </div>

    <div class="card table-container">
      <table class="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Vertical</th>
            <th>Status</th>
            <th>Created</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="lead in leadStore.leads" :key="lead.id" class="clickable-row" @click="router.push(`/leads/${lead.id}`)">
            <td>
              <div class="lead-name">
                <span class="name">{{ lead.name }}</span>
                <span class="mobile">{{ lead.mobile }}</span>
              </div>
            </td>
            <td><span class="badge category">{{ lead.enquiry_for }}</span></td>
            <td><span class="badge vertical">{{ lead.vertical?.name }}</span></td>
            <td>
              <span 
                class="badge status" 
                :style="{ backgroundColor: lead.status?.color + '22', color: lead.status?.color }"
              >
                {{ lead.status?.name }}
              </span>
            </td>
            <td>{{ formatDate(lead.created_at) }}</td>
            <td class="actions">
              <button class="icon-btn"><MoreVertical :size="18" /></button>
            </td>
          </tr>
          <tr v-if="leadStore.leads.length === 0">
            <td colspan="6" class="empty-state">No leads matching your criteria.</td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination -->
      <div v-if="leadStore.pagination" class="pagination">
        <span class="page-info">
          Showing <b>{{ leadStore.leads.length }}</b> of <b>{{ leadStore.pagination.total }}</b> leads
        </span>
        <div class="page-btns">
          <button 
            :disabled="leadStore.pagination.current_page === 1"
            @click="fetchLeads(leadStore.pagination.current_page - 1)"
            class="page-btn"
          >
            <ChevronLeft :size="18" />
          </button>
          <span class="current-page">{{ leadStore.pagination.current_page }}</span>
          <button 
            :disabled="leadStore.pagination.current_page === leadStore.pagination.last_page"
            @click="fetchLeads(leadStore.pagination.current_page + 1)"
            class="page-btn"
          >
            <ChevronRight :size="18" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.leads-view {
  padding: var(--spacing-xl);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.header {
  margin-bottom: var(--spacing-sm);
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

.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--spacing-lg);
  padding: var(--spacing-md) var(--spacing-lg);
}

.search-box {
  flex: 1;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  background-color: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  padding: 8px 12px;
}

.search-input {
  background: transparent;
  border: none;
  color: var(--text-primary);
  width: 100%;
  font-family: inherit;
  font-size: 0.95rem;
}

.search-input:focus {
  outline: none;
}

.filters {
  display: flex;
  gap: var(--spacing-md);
}

.filter-group {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  color: var(--text-secondary);
}

.filter-select {
  background-color: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  padding: 6px 12px;
  color: var(--text-primary);
  font-family: inherit;
  font-size: 0.875rem;
  outline: none;
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

.clickable-row {
  cursor: pointer;
  transition: background-color 0.2s;
}

.clickable-row:hover {
  background-color: var(--bg-tertiary);
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

.badge.category { background-color: var(--bg-tertiary); color: var(--text-secondary); }
.badge.vertical { background-color: rgba(59, 130, 246, 0.1); color: #3b82f6; }

.icon-btn {
  background: transparent;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: 4px;
  border-radius: var(--radius-sm);
}

.icon-btn:hover {
  background-color: var(--bg-tertiary);
  color: var(--text-primary);
}

.pagination {
  padding: var(--spacing-md) var(--spacing-lg);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--bg-secondary);
}

.page-info {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.page-btns {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.page-btn {
  background-color: var(--bg-primary);
  border: 1px solid var(--border-primary);
  color: var(--text-primary);
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  cursor: pointer;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.current-page {
  font-size: 0.875rem;
  font-weight: 600;
}

.empty-state {
  text-align: center;
  color: var(--text-muted);
  padding: var(--spacing-xl) !important;
}
</style>
