import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import CatalogView from '@/views/CatalogView.vue'
import ProductDetailView from '@/views/ProductDetailView.vue'
import CartView from '@/views/CartView.vue'
import AdminView from '../views/admin/AdminView.vue'
import ProductsAdmin from '../views/admin/ProductsAdmin.vue'
import ProductForm from '../components/admin/ProductForm.vue'
import StatisticsView from '../views/admin/StatisticsView.vue'
import PickupPointsView from '../views/admin/PickupPointsView.vue'
import GuidesAdmin from '../views/admin/GuidesAdmin.vue'
import AdminEntregas from '../views/admin/AdminEntregas.vue'
import Login from '../views/admin/login.vue'


// Función para verificar autenticación
function isAuthenticated() {
  return localStorage.getItem('adminAuth') === 'true'
}

const routes = [
  // Rutas públicas
  { path: '/', name: 'home', component: HomeView },
  { path: '/catalogo', name: 'catalog', component: CatalogView },
  { path: '/producto/:id', name: 'product-detail', component: ProductDetailView, props: true },
  { path: '/carrito', name: 'cart', component: CartView },
  { path: '/login', name: 'login', component: Login },

  // Rutas protegidas (admin)
  {
    path: '/admin',
    name: 'admin',
    component: AdminView,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/products',
    name: 'products-admin',
    component: ProductsAdmin,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/products/new',
    name: 'product-new',
    component: ProductForm,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/products/edit/:id',
    name: 'product-edit',
    component: ProductForm,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/estadisticas',
    name: 'stats',
    component: StatisticsView,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/puntos-de-entrega',
    name: 'pickup-points',
    component: PickupPointsView,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/guias',
    name: 'guias',
    component: GuidesAdmin,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/entregas',
    name: 'entregas',
    component: AdminEntregas,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Guard de navegación
router.beforeEach((to, from, next) => {
  // Si la ruta requiere autenticación y no está autenticado
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next({ name: 'login', query: { redirect: to.fullPath } })
  }
  // Si ya está autenticado y va al login, redirigir al admin
  else if (to.name === 'login' && isAuthenticated()) {
    next({ name: 'admin' })
  }
  else {
    next()
  }
})

export default router