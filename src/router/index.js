import { createRouter, createWebHistory } from "vue-router";
import auth from "../services/auth";
import Login from "../views/Login.vue";
import HomeView from "../views/HomeView.vue";
import About from "../views/About.vue";
import Contact from "../views/Contact.vue";
import ProductList from "../views/ProductList.vue";
import ProductDetails from "../views/ProductDetails.vue";
import NotFound from "../views/NotFound.vue";
import Admin from "../views/admin/Admin.vue";
import Dashboard from "../views/admin/Dashboard.vue";
import Users from "../views/admin/Users.vue";
import Settings from "../views/admin/Settings.vue";
import Categories from "../views/Categories.vue";
import CategoryProducts from "../views/CategoryProducts.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Publika routes - behöver ingen roles definition
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        title: 'Hem',
        breadcrumb: 'Hem'
      }
    },
    {
      path: "/about",
      name: "about",
      component: About,
      meta: {
        title: 'Om oss',
        breadcrumb: 'Om oss'
      }
    },
    {
      path: "/contact",
      name: "contact",
      component: Contact,
      meta: {
        title: 'Kontakt',
        breadcrumb: 'Kontakt'
      }
    },
    // Produktrelaterade routes
    {
      path: "/products",
      name: "products",
      component: ProductList,
      meta: {
        title: 'Produkter',
        breadcrumb: 'Produkter'
      }
    },
    {
      path: "/product/:id", // Dynamisk route med parameter
      name: "product-details",
      component: ProductDetails,
      meta: {
        title: 'Produktdetaljer',
        breadcrumb: 'Detaljer'
      }
    },
    // Login route - speciell hantering
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        title: 'Logga in',
        breadcrumb: 'Logga in'
      }
    },
    // Skyddade routes - använd requiresAuth och roles
    {
      path: "/admin",
      component: Admin,
      meta: { 
        requiresAuth: true,
        title: 'Admin',
        breadcrumb: 'Admin',
        roles: ['admin'] // Endast för skyddade routes
      },
      children: [
        {
          path: "", // Tom path för default route
          name: "admin", // Flytta name hit istället
          redirect: { name: 'admin-dashboard' }
        },
        {
          path: "dashboard",
          name: "admin-dashboard",
          component: Dashboard,
          meta: {
            title: 'Dashboard',
            breadcrumb: 'Dashboard',
            roles: ['admin']
          }
        },
        {
          path: "users",
          name: "admin-users",
          component: Users,
          meta: {
            title: 'Användare',
            breadcrumb: 'Användare',
            roles: ['admin']
          }
        },
        {
          path: "settings",
          name: "admin-settings",
          component: Settings,
          meta: {
            title: 'Inställningar',
            breadcrumb: 'Inställningar',
            roles: ['admin']
          }
        }
      ]
    },
    // Kategori-sektion med nästlade produkter
    {
      path: "/categories",
      name: "categories",
      component: Categories,
      meta: {
        title: 'Kategorier',
        breadcrumb: 'Kategorier'
      },
      children: [
        {
          path: ":categoryId", // Dynamisk parameter för kategori
          name: "category",
          component: CategoryProducts,
          meta: {
            title: 'Produkter',
            breadcrumb: 'Produkter'
          }
        }
      ]
    },
    // 404 - Catch all route för sidor som inte finns
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: NotFound
    }
  ],
});

// Förenklad navigation guard
router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? `${to.meta.title} - Min Site` : 'Min Site';

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = auth.checkAuth();
  
  // Kontrollera roller endast för skyddade routes
  const hasRequiredRole = to.matched.every(record => {
    if (!record.meta.roles) return true; // Om inga roles är definierade, tillåt access
    return auth.hasRole(record.meta.roles);
  });

  if (to.name === 'login' && isAuthenticated) {
    return next({ name: 'admin-dashboard' });
  }

  if (requiresAuth && !isAuthenticated) {
    return next({ 
      name: 'login',
      query: { redirect: to.fullPath }
    });
  }

  if (requiresAuth && !hasRequiredRole) {
    return next({ name: 'home' });
  }

  next();
});

export default router;
