<script setup>
import { ref } from 'vue'

// Grundinställningar för admin-panelen med default-värden
const settings = ref({
  siteName: 'Min Admin Panel',
  notificationEmail: 'admin@example.com',
  darkMode: false
})

// Simulera sparande av inställningar (i en riktig app skulle detta vara ett API-anrop)
const saveSettings = () => {
  alert('Inställningar sparade!')
}
</script>

<template>
  <div class="settings">
    <h2>Inställningar</h2>
    <!-- Formulär för admin-inställningar -->
    <form @submit.prevent="saveSettings">
      <!-- Webbplatsnamn -->
      <div class="form-group">
        <label>Webbplatsnamn</label>
        <input type="text" v-model="settings.siteName">
      </div>
      <!-- Email för notifieringar -->
      <div class="form-group">
        <label>Email för notifieringar</label>
        <input type="email" v-model="settings.notificationEmail">
      </div>
      <!-- Toggle för mörkt läge -->
      <div class="form-group">
        <label>Mörkt läge</label>
        <input type="checkbox" v-model="settings.darkMode">
      </div>
      <!-- Submit-knapp -->
      <button type="submit">Spara inställningar</button>
    </form>
  </div>
</template>

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