<template>
  <div class="not-found">
    <h1>404 - Sidan hittades inte</h1>
    <p>Tyvärr kunde vi inte hitta sidan du letade efter.</p>
    <RouterLink to="/" class="home-link">Gå till startsidan</RouterLink>
  </div>
</template>

<style scoped>
.not-found {
  text-align: center;
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
}

h1 {
  color: #e74c3c;
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.home-link {
  display: inline-block;
  margin-top: 2rem;
  padding: 0.5rem 1rem;
  background-color: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}

.home-link:hover {
  background-color: #3aa876;
}
</style> 