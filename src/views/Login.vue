<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import auth from '../services/auth'

const router = useRouter()

// Form state variabler
const username = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

// Hantera inloggningsförsök
const handleLogin = async () => {
  loading.value = true  // Visa loading state
  error.value = ''      // Rensa tidigare fel
  
  try {
    // Försök logga in med användarnamn och lösenord
    await auth.login(username.value, password.value)
    // Vid lyckad inloggning, navigera till admin
    router.push('/admin')
  } catch (err) {
    // Vid fel, visa felmeddelande
    error.value = err.message
  } finally {
    // Återställ loading state oavsett resultat
    loading.value = false
  }
}
</script>

<template>
  <div class="login">
    <h2>Logga in</h2>
    <!-- Visa eventuella felmeddelanden -->
    <div v-if="error" class="error">
      {{ error }}
    </div>

    <!-- Inloggningsformulär -->
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label>Användarnamn</label>
        <input type="text" v-model="username" required>
      </div>
      <div class="form-group">
        <label>Lösenord</label>
        <input type="password" v-model="password" required>
      </div>
      <!-- Login-knapp med loading state -->
      <button type="submit" :disabled="loading">
        {{ loading ? 'Loggar in...' : 'Logga in' }}
      </button>
    </form>
  </div>
</template>

<style scoped>
.login {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #a8d5c2;
  cursor: not-allowed;
}

.error {
  color: #e74c3c;
  margin-bottom: 1rem;
  padding: 0.5rem;
  background-color: #fde2e2;
  border-radius: 4px;
}
</style> 