<script setup>
import { onMounted, ref } from 'vue'
import { useLeadStore } from '../stores/leads'
import { ShoppingCart, Filter, Search, IndianRupee, MapPin, Calendar, Briefcase } from 'lucide-vue-next'

const leadStore = useLeadStore()
const marketplaceLeads = ref([])
const loading = ref(true)

const fetchMarketplace = async () => {
  loading.value = true
  try {
    // This would typically be a separate endpoint for available leads
    const response = await leadStore.fetchMarketplaceLeads()
    marketplaceLeads.value = response
  } catch (err) {
    console.error('Error fetching marketplace leads', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchMarketplace()
})

const buyLead = async (id) => {
  if (confirm('Are you sure you want to purchase this lead?')) {
    const success = await leadStore.purchaseLead(id)
    if (success) {
      alert('Lead purchased successfully!')
      fetchMarketplace()
    }
  }
}
</script>

<template>
  <div class="marketplace-view">
    <div class="header">
      <h1 class="title">Lead Marketplace</h1>
      <p class="subtitle">Purchase exclusive high-intent wedding enquiries for your business.</p>
    </div>

    <div class="controls card">
      <div class="search-box">
        <Search :size="18" class="search-icon" />
        <input type="text" placeholder="Search by city or category..." class="search-input">
      </div>
      <div class="filters">
        <div class="filter-group">
          <Filter :size="18" />
          <select class="filter-select">
            <option>All Verticals</option>
            <option>Wedding Venue</option>
            <option>Catering</option>
          </select>
        </div>
      </div>
    </div>

    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Baking fresh leads for you...</p>
    </div>

    <div v-else class="leads-grid">
      <div v-for="lead in marketplaceLeads" :key="lead.id" class="card marketplace-card">
        <div class="card-header">
          <div class="category-badge">{{ lead.enquiry_for }}</div>
          <div class="price-tag">
            <IndianRupee :size="14" />
            <span>499</span>
          </div>
        </div>

        <div class="card-body">
          <h3 class="lead-abstract">Enquiry for {{ lead.enquiry_for }} in {{ lead.city || 'Mumbai' }}</h3>
          <div class="lead-meta">
            <div class="meta-item">
              <MapPin :size="14" />
              <span>{{ lead.city || 'Mumbai' }}</span>
            </div>
            <div class="meta-item">
              <Calendar :size="14" />
              <span>{{ new Date(lead.created_at).toLocaleDateString() }}</span>
            </div>
          </div>
          <div class="lead-blur">
             <p>Contact Details Locked</p>
             <span class="blur-effect">98200 XXXX</span>
          </div>
        </div>

        <div class="card-footer">
          <button @click="buyLead(lead.id)" class="buy-btn">
            <ShoppingCart :size="18" />
            <span>Buy Lead</span>
          </button>
        </div>
      </div>

      <div v-if="marketplaceLeads.length === 0" class="empty-marketplace">
        <p>No new leads available in the marketplace currently.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.marketplace-view {
  padding: var(--spacing-xl);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
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
}

.leads-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: var(--spacing-xl);
}

.marketplace-card {
  padding: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.card-header {
  padding: var(--spacing-lg);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--bg-tertiary);
}

.category-badge {
  background-color: var(--bg-secondary);
  padding: 4px 12px;
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-primary);
}

.price-tag {
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--accent-primary);
  font-weight: 700;
  font-size: 1.125rem;
}

.card-body {
  padding: var(--spacing-lg);
  flex: 1;
}

.lead-abstract {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: var(--spacing-md);
  line-height: 1.4;
}

.lead-meta {
  display: flex;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.lead-blur {
  background-color: var(--bg-secondary);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  text-align: center;
  border: 1px dashed var(--border-primary);
}

.lead-blur p {
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-bottom: 4px;
}

.blur-effect {
  filter: blur(4px);
  font-weight: 700;
  letter-spacing: 2px;
}

.card-footer {
  padding: var(--spacing-lg);
  border-top: 1px solid var(--border-primary);
}

.buy-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-md);
  background-color: var(--accent-primary);
  color: white;
  border: none;
  padding: 12px;
  border-radius: var(--radius-md);
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
}

.buy-btn:hover {
  opacity: 0.9;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
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
