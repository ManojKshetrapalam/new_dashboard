<script setup>
import { computed } from 'vue'
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import { LayoutDashboard, Users, Settings, LogOut, ShoppingBag } from 'lucide-vue-next'
import { useAuthStore } from './stores/auth'
import ReminderService from './components/ReminderService.vue'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

import { onMounted } from 'vue'
onMounted(() => {
  auth.init()
})

const isLoginPage = computed(() => route.name === 'Login')

const handleLogout = async () => {
  await auth.logout()
  router.push('/login')
}
</script>

<template>
  <div class="app-layout">
    <aside v-if="!isLoginPage" class="sidebar">
      <div class="logo">
        <span class="logo-text">Plan A <span class="accent">Wedding</span></span>
      </div>
      
      <nav class="nav-menu">
        <RouterLink to="/" class="nav-item">
          <LayoutDashboard :size="20" />
          <span>Dashboard</span>
        </RouterLink>
        <RouterLink to="/leads" class="nav-item">
          <Users :size="20" />
          <span>Leads Hub</span>
        </RouterLink>
        <RouterLink to="/marketplace" class="nav-item">
          <ShoppingBag :size="20" />
          <span>Marketplace</span>
        </RouterLink>
      </nav>

      <div class="nav-footer">
        <RouterLink to="/settings" class="nav-item">
          <Settings :size="20" />
          <span>Settings</span>
        </RouterLink>
        <button @click="handleLogout" class="nav-item logout-btn">
          <LogOut :size="20" />
          <span>Logout</span>
        </button>
      </div>
    </aside>

    <main class="main-content" :class="{ 'full-width': isLoginPage }">
      <header v-if="!isLoginPage" class="top-bar">
        <div class="user-info">
          <span class="avatar">{{ auth.user?.name?.substring(0, 2).toUpperCase() || 'VP' }}</span>
          <span class="username">{{ auth.user?.name || 'Vendor Portal' }}</span>
        </div>
      </header>
      
      <div class="view-container">
        <RouterView />
      </div>
    </main>
    <ReminderService v-if="auth.isAuthenticated" />
  </div>
</template>

<style>
@import './assets/design-system.css';

.app-layout {
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.sidebar {
  width: 260px;
  background-color: var(--bg-secondary);
  border-right: 1px solid var(--border-primary);
  display: flex;
  flex-direction: column;
  padding: var(--spacing-lg) 0;
}

.logo {
  padding: 0 var(--spacing-lg) var(--spacing-xl);
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.logo .accent {
  color: var(--accent-primary);
}

.nav-menu {
  flex: 1;
  padding: 0 var(--spacing-sm);
}

.nav-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  color: var(--text-secondary);
  border-radius: var(--radius-md);
  transition: all 0.2s;
  text-decoration: none;
  border: none;
  background: transparent;
  width: 100%;
  text-align: left;
  font-size: 0.95rem;
  cursor: pointer;
}

.nav-item:hover {
  background-color: var(--bg-tertiary);
  color: var(--text-primary);
}

.nav-item.router-link-active {
  background-color: var(--accent-faded);
  color: var(--accent-primary);
}

.nav-footer {
  padding: 0 var(--spacing-sm);
  border-top: 1px solid var(--border-primary);
  padding-top: var(--spacing-md);
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: var(--bg-primary);
  overflow: hidden;
}

.main-content.full-width {
  width: 100%;
}

.top-bar {
  height: 64px;
  border-bottom: 1px solid var(--border-primary);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 var(--spacing-lg);
  background-color: var(--bg-secondary);
  flex-shrink: 0;
}

.view-container {
  flex: 1;
  overflow-y: auto;
}

.user-info {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.avatar {
  width: 32px;
  height: 32px;
  background-color: var(--accent-primary);
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
}

.logout-btn:hover {
  color: var(--error);
}
</style>
