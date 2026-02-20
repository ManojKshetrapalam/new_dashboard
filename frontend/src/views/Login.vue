<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const error = ref('')

const handleLogin = async () => {
  error.value = ''
  const success = await auth.login({
    email: email.value,
    password: password.value
  })
  
  if (success) {
    router.push('/')
  } else {
    error.value = auth.error
  }
}
</script>

<template>
  <div class="login-page">
    <div class="login-card card">
      <div class="login-header">
        <h1 class="logo-text">Plan A <span class="accent">Wedding</span></h1>
        <p class="subtitle">Vendor & Agent Portal</p>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label>Email Address</label>
          <input 
            v-model="email" 
            type="email" 
            placeholder="name@company.com" 
            required
            class="form-input"
          >
        </div>

        <div class="form-group">
          <label>Password</label>
          <input 
            v-model="password" 
            type="password" 
            placeholder="••••••••" 
            required
            class="form-input"
          >
        </div>

        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <button :disabled="auth.loading" type="submit" class="btn-primary login-btn">
          {{ auth.loading ? 'Signing in...' : 'Sign In' }}
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-primary);
}

.login-card {
  width: 100%;
  max-width: 400px;
  padding: var(--spacing-xl);
}

.login-header {
  text-align: center;
  margin-bottom: var(--spacing-xl);
}

.logo-text {
  font-size: 1.5rem;
}

.subtitle {
  color: var(--text-secondary);
  font-size: 0.875rem;
  margin-top: 4px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary);
}

.form-input {
  background-color: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  padding: 10px 12px;
  color: var(--text-primary);
  font-family: inherit;
  transition: border-color 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: var(--accent-primary);
}

.login-btn {
  padding: 12px;
  font-size: 1rem;
  margin-top: var(--spacing-md);
}

.error-message {
  color: var(--error);
  font-size: 0.875rem;
  text-align: center;
  background-color: rgba(239, 68, 68, 0.1);
  padding: 8px;
  border-radius: var(--radius-sm);
}

.accent {
  color: var(--accent-primary);
}
</style>
