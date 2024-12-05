<script setup>
import { useRouter } from 'vue-router'
import auth from '../../services/auth'

const router = useRouter()

// Hantera utloggning
const handleLogout = () => {
  auth.logout()
  router.push('/login')
}
</script> 

<template>
  <div class="admin">
    <!-- Admin header med logout-knapp -->
    <div class="admin-header">
      <h1>Admin Panel</h1>
      <button @click="handleLogout" class="logout-btn">Logga ut</button>
    </div>
    
    <!-- Navigation för admin-undersidor -->
    <nav class="admin-nav">
      <RouterLink to="/admin/dashboard">Dashboard</RouterLink>
      <RouterLink to="/admin/users">Användare</RouterLink>
      <RouterLink to="/admin/settings">Inställningar</RouterLink>
    </nav>
    
    <!-- Visa aktiv admin-undersida -->
    <div class="admin-content">
      <RouterView />
    </div>
  </div>
</template>
<style scoped>
.admin {
  padding: 2rem;
}
.admin-nav {
  background-color: #2c3e50;
  padding: 1rem;
  margin-bottom: 2rem;
  border-radius: 4px;
}
.admin-nav a {
  color: white;
  text-decoration: none;
  margin-right: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
}
.admin-nav a.router-link-active {
  background-color: #42b983;
}
.admin-content {
  background-color: #f8f9fa;
  padding: 2rem;
  border-radius: 4px;
}
.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
.logout-btn {
  padding: 0.5rem 1rem;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.logout-btn:hover {
  background-color: #c0392b;
}
</style> 