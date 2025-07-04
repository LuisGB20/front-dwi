<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { usuarioAutenticado, logout } from '@/composables/auth'

const router = useRouter()

const cerrarSesion = async () => {
  await logout()
  router.push('/')
}
</script>

<template>
  <nav
    class="w-full bg-transparent absolute z-10 text-gray-400 text-sm py-4 px-6 flex justify-between items-center"
  >
    <RouterLink to="/" class="text-white text-xl font-semibold">
      Mustang Experience
    </RouterLink>

    <div class="flex items-center gap-4">
      <!-- Links visibles solo si está autenticado -->
      <template v-if="usuarioAutenticado">
        <RouterLink
          to="/"
          class="text-gray-300 hover:text-white text-base font-semibold"
          >Inicio</RouterLink
        >
        <RouterLink
          to="/crm"
          class="text-gray-300 hover:text-white text-base font-semibold"
          >CRM</RouterLink
        >
      </template>

      <!-- Botón ingresar / cerrar sesión -->
      <RouterLink
        v-if="!usuarioAutenticado"
        to="/login"
        class="bg-gray-800 text-gray-200 hover:bg-gray-700 px-4 py-2 rounded transition text-base font-semibold"
      >
        Ingresar
      </RouterLink>

      <button
        v-else
        @click="cerrarSesion"
        class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition text-base font-semibold"
      >
        Cerrar sesión
      </button>
    </div>
  </nav>
</template>
