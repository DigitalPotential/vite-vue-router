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
    // Publika routes som alla kan nå
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        title: 'Hem',
        breadcrumb: 'Hem',
        roles: ['guest', 'user', 'admin'] // Alla roller har tillgång
      }
    },
    {
      path: "/about",
      name: "about",
      component: About,
      meta: {
        title: 'Om oss',
        breadcrumb: 'Om oss',
        roles: ['guest', 'user', 'admin']
      }
    },
    {
      path: "/contact",
      name: "contact",
      component: Contact,
      meta: {
        title: 'Kontakt',
        breadcrumb: 'Kontakt',
        roles: ['guest', 'user', 'admin']
      }
    },
    // Produktrelaterade routes
    {
      path: "/products",
      name: "products",
      component: ProductList,
      meta: {
        title: 'Produkter',
        breadcrumb: 'Produkter',
        roles: ['guest', 'user', 'admin']
      }
    },
    {
      path: "/product/:id", // Dynamisk route med parameter
      name: "product-details",
      component: ProductDetails,
      meta: {
        title: 'Produktdetaljer',
        breadcrumb: 'Detaljer',
        roles: ['guest', 'user', 'admin']
      }
    },
    // Auth routes
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        title: 'Logga in',
        breadcrumb: 'Logga in'
      }
    },
    // Skyddad admin-sektion med nästlade routes
    {
      path: "/admin",
      name: "admin",
      component: Admin,
      meta: { 
        requiresAuth: true,
        title: 'Admin',
        breadcrumb: 'Admin',
        roles: ['admin']
      },
      children: [
        // Lägg till denna redirect först i children-arrayen
        {
          path: "", // tom path
          redirect: { name: 'admin-dashboard' } // redirect till dashboard
        },
        // Admin undersidor
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

// Global navigation guard
router.beforeEach((to, from, next) => {
  // Uppdatera sidtitel
  document.title = to.meta.title ? `${to.meta.title} - Min Site` : 'Min Site';

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = auth.checkAuth();
  
  // Kontrollera användarroller
  const hasRequiredRole = to.matched.every(record => {
    const roles = record.meta.roles || ['guest'];
    return auth.hasRole(roles);
  });

  if (requiresAuth && !isAuthenticated) {
    // Om användaren inte är inloggad, skicka till login
    next({ 
      name: 'login',
      query: { redirect: to.fullPath }
    });
  } else if (to.name === 'login' && isAuthenticated) {
    // Om användaren redan är inloggad och försöker nå login-sidan
    next({ name: 'admin' });
  } else if (!hasRequiredRole) {
    // Om användaren saknar rätt roll
    next({ name: 'home' });
  } else {
    // Om allt är ok
    next();
  }
});

export default router;
