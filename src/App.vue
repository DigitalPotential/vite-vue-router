<script setup>
// Importera nödvändiga komponenter och composables
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Breadcrumb from './components/Breadcrumb.vue'
import ErrorBoundary from './components/ErrorBoundary.vue'
import LoadingSpinner from './components/LoadingSpinner.vue'

const router = useRouter()
const loading = ref(false)

// Sätt loading state när navigation börjar
router.beforeEach((to, from, next) => {
  loading.value = true
  next()
})

// Återställ loading state när navigation är klar
router.afterEach(() => {
  loading.value = false
})
</script>

<template>
  <header>
    <div class="container">
      <nav>
        <RouterLink to="/">Hem</RouterLink>
        <RouterLink to="/categories">Kategorier</RouterLink>
        <RouterLink to="/products">Produkter</RouterLink>
        <RouterLink to="/about">Om oss</RouterLink>
        <RouterLink to="/contact">Kontakt</RouterLink>
        <RouterLink to="/admin">Admin</RouterLink>
      </nav>
    </div>
  </header>

  <div class="container">
    <Breadcrumb />
    <ErrorBoundary>
      <Suspense>
        <template #default>
          <RouterView v-slot="{ Component }">
            <Transition 
              :name="$route.meta.transition || 'fade'" 
              mode="out-in"
            >
              <component :is="Component" />
            </Transition>
          </RouterView>
        </template>
        <template #fallback>
          <LoadingSpinner />
        </template>
      </Suspense>
    </ErrorBoundary>
  </div>
</template>

<style>
/* Container styling */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Slide transition */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease-out;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(60px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-60px);
}

/* Loading animation */
@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading {
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #42b983;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
  background-color: #f8f9fa;
  padding: 1rem 0;
  margin-bottom: 2rem;
}

nav {
  width: 100%;
  font-size: 1rem;
  text-align: center;
  display: flex;
  justify-content: center;
  gap: 1rem;
}

nav a {
  color: #2c3e50;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.3s ease;
}

nav a:hover {
  background-color: #e9ecef;
}

nav a.router-link-active {
  color: #42b983;
  font-weight: bold;
}

/* Ta bort dessa om du inte behöver dem */
.logo {
  display: block;
  margin: 0 auto 2rem;
}

/* Uppdatera media query för större skärmar */
@media (min-width: 1024px) {
  nav {
    font-size: 1rem;
  }
}
</style>
