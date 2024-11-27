<script setup>
const products = [
  { id: 1, name: 'Laptop', price: 9999 },
  { id: 2, name: 'Phone', price: 5999 },
  { id: 3, name: 'Tablet', price: 4999 }
]
</script>

<template>
  <div class="products">
    <h1>Våra Produkter</h1>
    <div class="product-grid">
      <div v-for="product in products" :key="product.id" class="product-card">
        <h2>{{ product.name }}</h2>
        <p>Pris: {{ product.price }} kr</p>
        <RouterLink :to="`/product/${product.id}`">Visa detaljer</RouterLink>
      </div>
    </div>
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
}
</style> 