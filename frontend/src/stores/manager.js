import { defineStore } from 'pinia'
import axios from 'axios'

export const useManagerStore = defineStore('manager', {
    state: () => ({
        aggregatedStats: {
            total_assigned: 0,
            total_connected: 0,
            total_converted: 0
        },
        teamActivity: [],
        teamLeads: [],
        pagination: null,
        loading: false,
        error: null
    }),

    actions: {
        async fetchManagerDashboard(date = null) {
            this.loading = true
            try {
                const response = await axios.get('/manager/dashboard', {
                    params: { date }
                })
                this.aggregatedStats = response.data.aggregated_stats
                this.teamActivity = response.data.team_activity
                this.teamLeads = response.data.team_leads.data
                this.pagination = {
                    current_page: response.data.team_leads.current_page,
                    last_page: response.data.team_leads.last_page,
                    total: response.data.team_leads.total
                }
            } catch (err) {
                this.error = 'Failed to fetch manager dashboard data'
                console.error(err)
            } finally {
                this.loading = false
            }
        }
    }
})
