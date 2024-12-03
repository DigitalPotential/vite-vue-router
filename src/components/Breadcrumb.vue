<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// Beräkna breadcrumbs baserat på matchade routes
const breadcrumbs = computed(() => {
  // Mappa varje matchad route till ett breadcrumb-objekt
  return route.matched.map(r => {
    return {
      name: r.meta.breadcrumb, // Använd breadcrumb-text från route meta
      path: r.path,
      // Säkerställ att path börjar med '/'
      link: r.path.startsWith('/') ? r.path : `/${r.path}`
    }
  // Filtrera bort routes som saknar breadcrumb i meta
  }).filter(b => b.name)
})
</script>

<template>
  <nav class="breadcrumb" v-if="breadcrumbs.length">
    <!-- Hem-länk är alltid första steget -->
    <RouterLink to="/" class="breadcrumb-item">Hem</RouterLink>
    
    <!-- Loopa genom alla breadcrumbs -->
    <span v-for="(crumb, index) in breadcrumbs" :key="crumb.path">
      <span class="separator">/</span>
      <RouterLink 
        :to="crumb.link"
        class="breadcrumb-item"
        :class="{ 'active': index === breadcrumbs.length - 1 }"
      >
        {{ crumb.name }}
      </RouterLink>
    </span>
  </nav>
</template>

<style scoped>
.breadcrumb {
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
  background-color: #f8f9fa;
  border-radius: 4px;
}

.breadcrumb-item {
  color: #42b983;
  text-decoration: none;
}

.breadcrumb-item.active {
  color: #666;
  pointer-events: none;
}

.separator {
  margin: 0 0.5rem;
  color: #666;
}
</style> 