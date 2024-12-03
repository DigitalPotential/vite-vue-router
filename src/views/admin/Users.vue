<script setup>
// Exempel på användardata (i en riktig app skulle detta komma från en API)
const users = [
  { id: 1, name: 'Anna Andersson', email: 'anna@example.com', role: 'Admin' },
  { id: 2, name: 'Erik Eriksson', email: 'erik@example.com', role: 'User' },
  { id: 3, name: 'Maria Nilsson', email: 'maria@example.com', role: 'Editor' },
]
</script>

<template>
  <div class="users">
    <h2>Användare</h2>
    <!-- Tabell för att visa användarlista -->
    <table>
      <!-- Tabellhuvud med kolumnrubriker -->
      <thead>
        <tr>
          <th>ID</th>
          <th>Namn</th>
          <th>Email</th>
          <th>Roll</th>
        </tr>
      </thead>
      <!-- Tabellinnehåll med användardata -->
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.role }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

th, td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f8f9fa;
  font-weight: bold;
}

tr:hover {
  background-color: #f5f5f5;
}
</style> 