import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // Mantiene el scroll al inicio en cada cambio de vista
  scrollBehavior() {
    return { top: 0 }
  },
  routes: [
    { 
      path: '/', 
      name: 'home', 
      component: HomeView 
    },
    { 
      path: '/nosotros', 
      name: 'nosotros', 
      component: () => import('../views/NosotrosView.vue') 
    },
    { 
      path: '/catalogo', 
      name: 'catalogo', 
      component: () => import('../views/CatalogoView.vue') 
    },
    { 
      path: '/carrito', 
      name: 'carrito', 
      component: () => import('../views/CarritoView.vue') 
    },
    { 
      path: '/login', 
      name: 'login', 
      component: () => import('../views/LoginView.vue') 
    },
    { 
      path: '/admin', 
      name: 'admin', 
      component: () => import('../views/AdminView.vue'),
      meta: { requiresAuth: true }
    },
    // Captura cualquier ruta inexistente y redirige al inicio
    { 
      path: '/:pathMatch(.*)*', 
      redirect: '/' 
    }
  ]
})

// Control de Navegación y Autenticación (Navigation Guard)
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('adminAutenticado') === 'true'

  if (to.meta.requiresAuth && !isAuthenticated) {
    // Intenta acceder al admin sin permisos
    next({ name: 'login' })
  } else if (to.name === 'login' && isAuthenticated) {
    // Si ya inició sesión y quiere ir al login, lo mandamos directo al admin
    next({ name: 'admin' })
  } else {
    next()
  }
})

// 🚪 Función helper para cerrar sesión desde cualquier componente (ej. Navbar o AdminView)
export const cerrarSesion = () => {
  localStorage.removeItem('adminAutenticado')
  router.push('/login')
}

export default router