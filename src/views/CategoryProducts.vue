<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { categories } from '../data/categories'
import { products } from '../data/products'

const route = useRoute()
const router = useRouter()

// Definiera sorteringsalternativ
const sortOptions = [
  { value: 'price', label: 'Pris' },
  { value: 'name', label: 'Namn' },
  { value: 'newest', label: 'Senaste' }
]

// Håll koll på vald sortering, använd URL query eller default till 'price'
const selectedSort = ref(route.query.sort || 'price')

// Hantera ändring av sortering
const handleSortChange = (event) => {
  // Uppdatera URL med ny sortering men behåll andra query params
  router.push({
    query: { 
      ...route.query,
      sort: event.target.value 
    }
  })
}

// Hantera toggle av filter (new/sale)
const toggleFilter = (filter) => {
  // Skapa en Set från nuvarande filter i URL
  const currentFilters = new Set(route.query.filter?.split(',') || [])
  
  // Toggla filtret (lägg till eller ta bort)
  if (currentFilters.has(filter)) {
    currentFilters.delete(filter)
  } else {
    currentFilters.add(filter)
  }

  // Uppdatera URL med nya filter
  router.push({
    query: { 
      ...route.query,
      filter: Array.from(currentFilters).join(',') || undefined
    }
  })
}

// Computed property som filtrerar och sorterar produkter
const filteredProducts = computed(() => {
  // Hämta produkter för vald kategori
  let result = products[route.params.categoryId] || []
  
  // Applicera filter (new/sale)
  const filters = route.query.filter?.split(',') || []
  if (filters.length) {
    result = result.filter(product => {
      return filters.some(filter => {
        if (filter === 'new') return product.isNew
        if (filter === 'sale') return product.onSale
        return true
      })
    })
  }

  // Applicera sortering
  const sort = route.query.sort
  if (sort) {
    result = [...result].sort((a, b) => {
      if (sort === 'price') return a.price - b.price
      if (sort === 'name') return a.name.localeCompare(b.name)
      if (sort === 'newest') return a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1
      return 0
    })
  }

  return result
})
</script>

<template>
  <div class="category-products">
    <h1>{{ 
      categories.find(c => c.slug === route.params.categoryId)?.name || 
      route.params.categoryId 
    }}</h1>
    
    <div class="filters">
      <div class="sort">
        <label>Sortera efter:</label>
        <select v-model="selectedSort" @change="handleSortChange">
          <option v-for="option in sortOptions" 
                  :key="option.value" 
                  :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </div>
      <div class="filter-options">
        <button @click="toggleFilter('new')" 
                :class="{ active: route.query.filter?.includes('new') }">
          Nya produkter
        </button>
        <button @click="toggleFilter('sale')"
                :class="{ active: route.query.filter?.includes('sale') }">
          Rea
        </button>
      </div>
    </div>

    <TransitionGroup 
      name="products" 
      tag="div" 
      class="product-grid"
    >
      <div v-for="product in filteredProducts" 
           :key="product.id" 
           class="product-card">
        <h3>{{ product.name }}</h3>
        <p class="price">{{ product.price }} kr</p>
        <div class="tags">
          <span v-if="product.isNew" class="tag new">Ny</span>
          <span v-if="product.onSale" class="tag sale">Rea</span>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  padding: 1rem;
}

.product-card {
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 8px;
  position: relative;
}

.price {
  color: #42b983;
  font-weight: bold;
}

.tags {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  display: flex;
  gap: 0.5rem;
}

.tag {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

.tag.new {
  background: #42b983;
  color: white;
}

.tag.sale {
  background: #e74c3c;
  color: white;
}

.filters {
  margin-bottom: 2rem;
  display: flex;
  gap: 2rem;
  align-items: center;
}

.sort {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.filter-options {
  display: flex;
  gap: 0.5rem;
}

button {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  cursor: pointer;
}

button.active {
  background: #42b983;
  color: white;
  border-color: #42b983;
}

.products-move {
  transition: all 0.5s ease;
}

.products-enter-active,
.products-leave-active {
  transition: all 0.5s ease;
}

.products-enter-from,
.products-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style> 