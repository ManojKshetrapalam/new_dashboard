import { defineStore } from 'pinia'
import axios from 'axios'

// Set base URL for axios
axios.defaults.baseURL = 'http://localhost:8000/api'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: JSON.parse(localStorage.getItem('user')) || null,
        token: localStorage.getItem('token') || null,
        loading: false,
        error: null
    }),

    getters: {
        isAuthenticated: (state) => !!state.token,
        isManager: (state) => state.user?.roles?.some(role => role.name === 'Manager'),
        isSuperAdmin: (state) => state.user?.roles?.some(role => role.name === 'Super Admin'),
    },

    actions: {
        async login(credentials) {
            this.loading = true
            this.error = null
            try {
                const response = await axios.post('/login', credentials)
                this.token = response.data.access_token
                this.user = response.data.user

                localStorage.setItem('token', this.token)
                localStorage.setItem('user', JSON.stringify(this.user))

                axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
                return true
            } catch (err) {
                this.error = err.response?.data?.message || 'Login failed'
                return false
            } finally {
                this.loading = false
            }
        },

        async logout() {
            try {
                await axios.post('/logout')
            } catch (err) {
                console.error('Logout failed', err)
            } finally {
                this.token = null
                this.user = null
                localStorage.removeItem('token')
                localStorage.removeItem('user')
                delete axios.defaults.headers.common['Authorization']
            }
        },

        init() {
            if (this.token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
            }
        }
    }
})
