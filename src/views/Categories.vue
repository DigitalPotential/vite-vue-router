<script setup>
import { useRouter, useRoute } from 'vue-router'
import { categories } from '../data/categories'

const route = useRoute()
</script>

<template>
  <div class="categories">
    <div v-if="!route.params.categoryId">
      <h1>Kategorier</h1>
      <div class="category-grid">
        <RouterLink 
          v-for="category in categories" 
          :key="category.id"
          :to="{
            name: 'category',
            params: { categoryId: category.slug }
          }"
          class="category-card"
        >
          <h2>{{ category.name }}</h2>
        </RouterLink>
      </div>
    </div>

    <RouterView />
  </div>
</template>

<style scoped>
.categories {
  padding: 1rem;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.category-card {
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  text-decoration: none;
  color: inherit;
  text-align: center;
  transition: all 0.3s ease;
}

.category-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
</style> 