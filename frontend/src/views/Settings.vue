<script setup>
import { ref } from 'vue'
import { Shield, Lock } from 'lucide-vue-next'

const loading = ref(false)
const oldPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')

const handlePasswordChange = async () => {
    if (newPassword.value !== confirmPassword.value) {
        alert('New passwords do not match')
        return
    }
    
    loading.value = true
    try {
        // Placeholder for actual password change API
        setTimeout(() => {
            alert('Password changed successfully')
            oldPassword.value = ''
            newPassword.value = ''
            confirmPassword.value = ''
            loading.value = false
        }, 1000)
    } catch (err) {
        alert('Failed to change password')
        loading.value = false
    }
}
</script>

<template>
  <div class="settings-view">
    <div class="header">
      <h1 class="title">Account Settings</h1>
      <p class="subtitle">Manage your account security and password.</p>
    </div>

    <div class="settings-container">
      <div class="card security-card">
          <div class="section-title">
              <Shield :size="20" />
              <h2>Security</h2>
          </div>
          
          <div class="password-form">
              <div class="form-group">
                  <label>Current Password</label>
                  <div class="input-wrapper">
                      <Lock :size="16" class="input-icon" />
                      <input type="password" v-model="oldPassword" placeholder="••••••••">
                  </div>
              </div>
              
              <div class="form-group">
                  <label>New Password</label>
                  <div class="input-wrapper">
                      <Lock :size="16" class="input-icon" />
                      <input type="password" v-model="newPassword" placeholder="••••••••">
                  </div>
              </div>
              
              <div class="form-group">
                  <label>Confirm New Password</label>
                  <div class="input-wrapper">
                      <Lock :size="16" class="input-icon" />
                      <input type="password" v-model="confirmPassword" placeholder="••••••••">
                  </div>
              </div>
              
              <button 
                @click="handlePasswordChange" 
                class="btn-primary" 
                :disabled="loading || !newPassword"
              >
                  {{ loading ? 'Updating...' : 'Change Password' }}
              </button>
          </div>
      </div>

      <div class="info-box">
          <p>Multi-factor authentication and further security settings will be available in a future update.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.settings-view {
  padding: var(--spacing-xl);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
  max-width: 600px;
  margin: 0 auto;
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

.settings-container {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xl);
}

.section-title {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-lg);
}

.section-title h2 {
    font-size: 1.125rem;
    font-weight: 600;
}

.password-form {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.form-group label {
    font-size: 0.875rem;
    color: var(--text-secondary);
}

.input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
}

.input-icon {
    position: absolute;
    left: 12px;
    color: var(--text-muted);
}

.input-wrapper input {
    width: 100%;
    background-color: var(--bg-primary);
    border: 1px solid var(--border-primary);
    border-radius: var(--radius-md);
    padding: 10px 14px 10px 38px;
    color: var(--text-primary);
    font-family: inherit;
    transition: border-color 0.2s;
}

.input-wrapper input:focus {
    outline: none;
    border-color: var(--accent-primary);
}

.btn-primary {
    background-color: var(--accent-primary);
    color: white;
    border: none;
    padding: 12px;
    border-radius: var(--radius-md);
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.2s;
    margin-top: var(--spacing-md);
}

.btn-primary:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.info-box {
    padding: var(--spacing-md);
    background-color: var(--bg-tertiary);
    border-radius: var(--radius-md);
    border: 1px solid var(--border-primary);
}

.info-box p {
    font-size: 0.875rem;
    color: var(--text-secondary);
    text-align: center;
}
</style>
