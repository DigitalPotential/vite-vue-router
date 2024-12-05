<template>
  <!-- Admin dashboard med statistik -->
  <div class="dashboard">
    <h2>Dashboard</h2>
    <div class="stats-grid">
      <!-- Statistikrutor för olika mätvärden -->
      <div class="stat-card">
        <h3>Totala användare</h3>
        <p class="stat">1,234</p>
      </div>
      <div class="stat-card">
        <h3>Aktiva ordrar</h3>
        <p class="stat">56</p>
      </div>
      <div class="stat-card">
        <h3>Månadens intäkter</h3>
        <p class="stat">123,456 kr</p>
      </div>
    </div>
  </div>
</template> 

<style scoped>
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}
.stat-card {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
.stat {
  font-size: 1.5rem;
  color: #42b983;
  font-weight: bold;
}
</style> 