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

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: About,
    },
    {
      path: "/contact",
      name: "contact",
      component: Contact,
    },
    {
      path: "/products",
      name: "products",
      component: ProductList,
    },
    {
      path: "/product/:id",
      name: "product-details",
      component: ProductDetails,
    },
    {
      path: "/jobs",
      name: "jobs",
      component: ProductList,
    },
    {
      path: "/all-jobs",
      redirect: "/jobs"
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/admin",
      name: "admin",
      component: Admin,
      meta: { requiresAuth: true },
      children: [
        {
          path: "dashboard",
          name: "admin-dashboard",
          component: Dashboard
        },
        {
          path: "users",
          name: "admin-users",
          component: Users
        },
        {
          path: "settings",
          name: "admin-settings",
          component: Settings
        },
        {
          path: "",
          redirect: { name: 'admin-dashboard' }
        }
      ]
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: NotFound
    }
  ],
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = auth.checkAuth();

  if (requiresAuth && !isAuthenticated) {
    next({ 
      name: 'login',
      query: { redirect: to.fullPath }
    });
  } else if (to.name === 'login' && isAuthenticated) {
    next({ name: 'admin' });
  } else {
    next();
  }
});

export default router;
