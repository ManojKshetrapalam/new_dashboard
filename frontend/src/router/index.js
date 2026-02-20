import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import Dashboard from '../views/Dashboard.vue'
import Login from '../views/Login.vue'

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: { public: true }
    },
    {
        path: '/',
        name: 'Dashboard',
        component: Dashboard
    },
    {
        path: '/leads',
        name: 'Leads',
        component: () => import('../views/Leads.vue')
    },
    {
        path: '/leads/:id',
        name: 'LeadDetail',
        component: () => import('../views/LeadDetail.vue')
    },
    {
        path: '/marketplace',
        name: 'Marketplace',
        component: () => import('../views/Marketplace.vue')
    },
    {
        path: '/settings',
        name: 'Settings',
        component: () => import('../views/Settings.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const auth = useAuthStore()
    const isPublic = to.matched.some(record => record.meta.public)
    const isAuthenticated = auth.isAuthenticated

    if (!isPublic && !isAuthenticated) {
        next('/login')
    } else if (isPublic && isAuthenticated) {
        next('/')
    } else {
        next()
    }
})

export default router
