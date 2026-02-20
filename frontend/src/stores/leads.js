import { defineStore } from 'pinia'
import axios from 'axios'

export const useLeadStore = defineStore('leads', {
    state: () => ({
        leads: [],
        recentLeads: [],
        stats: {
            total_leads: 0,
            conversion_rate: 0
        },
        pagination: null,
        loading: false,
        error: null
    }),

    actions: {
        async fetchDashboardData() {
            this.loading = true
            try {
                const response = await axios.get('/dashboard')
                this.stats = response.data.stats
                this.recentLeads = response.data.recent_leads
            } catch (err) {
                this.error = 'Failed to fetch dashboard data'
            } finally {
                this.loading = false
            }
        },

        async fetchLeads(page = 1, filters = {}) {
            this.loading = true
            try {
                const response = await axios.get('/leads', {
                    params: { page, ...filters }
                })
                this.leads = response.data.data
                this.pagination = {
                    current_page: response.data.current_page,
                    last_page: response.data.last_page,
                    total: response.data.total
                }
            } catch (err) {
                this.error = 'Failed to fetch leads'
            } finally {
                this.loading = false
            }
        },

        async fetchLeadDetails(id) {
            this.loading = true
            try {
                const response = await axios.get(`/leads/${id}`)
                return response.data
            } catch (err) {
                this.error = 'Failed to fetch lead details'
                throw err
            } finally {
                this.loading = false
            }
        },

        async fetchMarketplaceLeads() {
            this.loading = true
            try {
                const response = await axios.get('/leads', {
                    params: { view: 'marketplace' }
                })
                return response.data.data
            } catch (err) {
                this.error = 'Failed to fetch marketplace leads'
                throw err
            } finally {
                this.loading = false
            }
        },

        async purchaseLead(id) {
            try {
                const response = await axios.post(`/leads/${id}/purchase`)
                return true
            } catch (err) {
                this.error = 'Failed to purchase lead'
                return false
            }
        },

        async updateLeadStatus(id, statusId) {
            try {
                const response = await axios.patch(`/leads/${id}/status`, {
                    lead_status_id: statusId
                })
                // Update local state
                const index = this.leads.findIndex(l => l.id === id)
                if (index !== -1) {
                    this.leads[index] = response.data.lead
                }
                return true
            } catch (err) {
                this.error = 'Failed to update lead status'
                return false
            }
        },

        async addLeadNote(leadId, content) {
            try {
                const response = await axios.post(`/leads/${leadId}/notes`, {
                    content
                })
                return response.data.note
            } catch (err) {
                this.error = 'Failed to add note'
                throw err
            }
        },

        async updateLeadStatus(leadId, statusId, followUpAt = null) {
            try {
                const response = await axios.patch(`/leads/${leadId}/status`, {
                    lead_status_id: statusId,
                    follow_up_at: followUpAt
                })
                return response.data.lead
            } catch (err) {
                this.error = 'Failed to update status'
                throw err
            }
        }
    }
})
