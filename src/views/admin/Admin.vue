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