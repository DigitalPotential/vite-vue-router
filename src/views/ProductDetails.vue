<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const product = ref(null)

const products = [
  { id: 1, name: 'Laptop', price: 9999, description: 'Kraftfull laptop för alla behov' },
  { id: 2, name: 'Phone', price: 5999, description: 'Smart telefon med senaste tekniken' },
  { id: 3, name: 'Tablet', price: 4999, description: 'Perfekt för både arbete och nöje' }
]

onMounted(() => {
  const productId = parseInt(route.params.id)
  product.value = products.find(p => p.id === productId)
})
</script>

<template>
  <div class="product-details" v-if="product">
    <h1>{{ product.name }}</h1>
    <p class="price">Pris: {{ product.price }} kr</p>
    <p class="description">{{ product.description }}</p>
    <RouterLink to="/products" class="back-link">Tillbaka till produkter</RouterLink>
  </div>
  <div v-else>
    <p>Produkten hittades inte</p>
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