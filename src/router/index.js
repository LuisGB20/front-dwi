import Crm from '@/views/Crm.vue'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Inicio',
            component: Home,
        },
        {
            path: '/login',
            name: 'Inicio de sesión',
            component: Login
        },
        {
            path: '/crm',
            meta: { requiresAuth: true },
            name: 'CRM',
            component: Crm
        },
    ],
})



router.beforeEach(async (to, from, next) => {
  // Primero: si la ruta es /login y el usuario ya está autenticado, redirige al /crm
  if (to.path === '/login') {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/verificar-sesion`, {
        credentials: 'include',
      })

      if (res.ok) {
        // Si está autenticado, redirige a CRM
        return next('/crm')
      }
    } catch (e) {
      // No está autenticado, sigue al login
      return next()
    }
  }

  // Segundo: proteger rutas que requieren autenticación
  if (to.matched.some(record => record.meta.requiresAuth)) {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/verificar-sesion`, {
        credentials: 'include'
      });

      if (!res.ok) throw new Error('No autorizado');
      return next();
    } catch (e) {
      return next('/login');
    }
  }

  // Si no hay condiciones especiales, continuar
  next();
})

export default router
