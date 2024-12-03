<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const product = ref(null)

// Simulera en asynkron datahämtning
const loadProduct = async (id) => {
  const products = [
    { id: 1, name: 'Laptop', price: 9999, description: 'Kraftfull laptop för alla behov' },
    { id: 2, name: 'Phone', price: 5999, description: 'Smart telefon med senaste tekniken' },
    { id: 3, name: 'Tablet', price: 4999, description: 'Perfekt för både arbete och nöje' }
  ]

  // Simulera nätverksfördröjning (1 sekund)
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Hitta produkten och kasta error om den inte finns
  const found = products.find(p => p.id === id)
  if (!found) {
    throw new Error('Produkten hittades inte')
  }
  return found
}

// Top-level await gör komponenten async, vilket aktiverar Suspense
product.value = await loadProduct(parseInt(route.params.id))
</script>

<template>
  <div class="product-details" v-if="product">
    <h1>{{ product.name }}</h1>
    <p class="price">Pris: {{ product.price }} kr</p>
    <p class="description">{{ product.description }}</p>
    <RouterLink to="/products" class="back-link">Tillbaka till produkter</RouterLink>
  </div>
</template>

<style scoped>
.product-details {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.price {
  font-size: 1.2rem;
  color: #42b983;
}

.back-link {
  display: inline-block;
  margin-top: 1rem;
  color: #42b983;
  text-decoration: none;
}
</style> 