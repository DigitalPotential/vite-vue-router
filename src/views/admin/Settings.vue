<template>
  <div class="settings">
    <h2>Inställningar</h2>
    <form @submit.prevent="saveSettings">
      <div class="form-group">
        <label>Webbplatsnamn</label>
        <input type="text" v-model="settings.siteName">
      </div>
      <div class="form-group">
        <label>Email för notifieringar</label>
        <input type="email" v-model="settings.notificationEmail">
      </div>
      <div class="form-group">
        <label>Mörkt läge</label>
        <input type="checkbox" v-model="settings.darkMode">
      </div>
      <button type="submit">Spara inställningar</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const settings = ref({
  siteName: 'Min Admin Panel',
  notificationEmail: 'admin@example.com',
  darkMode: false
})

const saveSettings = () => {
  alert('Inställningar sparade!')
}
</script>

<style scoped>
.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

input[type="text"],
input[type="email"] {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #3aa876;
}
</style> 