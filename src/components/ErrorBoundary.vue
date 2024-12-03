<script setup>
import { ref, onErrorCaptured } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const error = ref(null)

// Fånga fel från child-komponenter
onErrorCaptured((err) => {
  error.value = err
  return false // Stoppa error från att propagera vidare
})

// Funktion för att försöka igen
const retry = () => {
  error.value = null
  window.location.reload()
}

// Funktion för att gå tillbaka till startsidan
const goHome = () => {
  error.value = null
  router.push('/')
}
</script>

<template>
  <!-- Visa felmeddelande om något gick fel -->
  <div v-if="error" class="error-boundary">
    <h2>Något gick fel</h2>
    <p>{{ error.message }}</p>
    <div class="button-group">
      <button @click="retry" class="retry-button">Försök igen</button>
      <button @click="goHome" class="home-button">Gå till startsidan</button>
    </div>
  </div>
  <!-- Annars visa normal content -->
  <slot v-else></slot>
</template>

<style scoped>
.error-boundary {
  padding: 2rem;
  margin: 1rem;
  background-color: #fff3f3;
  border: 1px solid #ffcdd2;
  border-radius: 8px;
  text-align: center;
}

.button-group {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1rem;
}

.retry-button, .home-button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.retry-button {
  background-color: #42b983;
  color: white;
}

.home-button {
  background-color: #2c3e50;
  color: white;
}

.retry-button:hover {
  background-color: #3aa876;
}

.home-button:hover {
  background-color: #34495e;
}
</style> 