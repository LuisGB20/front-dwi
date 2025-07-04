<script setup lang="ts">
import { ref } from 'vue'
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router'
import { verificarSesion } from '@/composables/auth'

const email = ref('')
const password = ref('')
const router = useRouter()

const iniciarSesion = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/iniciar-sesion`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        correoElectronico: email.value,
        contrasena: password.value
      }),
      credentials: 'include' // para enviar/recibir cookies
    })

    if (!response.ok) {
      const errorData = await response.json()
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorData.error || 'Correo o contraseña incorrectos'
      })
      return
    }

    await verificarSesion()

    // Si todo salió bien, redirige a /crm
    await router.push('/crm')

  } catch (error) {
    console.error(error)
    // En caso de error en la petición (network, etc)
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se pudo conectar al servidor'
    })
  }
}
</script>


<template>
  <section class="min-h-screen flex flex-col md:flex-row">
    <!-- Lado Izquierdo - Imagen -->
    <div class="md:w-1/2 bg-black">
      <img src="https://www.mustang7g.com/forums/attachments/mustang-gtd-wind-tunnel-5-jpg.564627/" alt="Mustang 2025"
        class="w-full h-full object-cover object-center" />
    </div>

    <!-- Lado Derecho - Formulario -->
    <div class="md:w-1/2 bg-[#121212] flex items-center justify-center px-8 py-16">
      <div class="w-full max-w-md bg-[#1E1E1E] p-8 rounded-2xl shadow-2xl space-y-6">
        <h2 class="text-3xl font-bold text-center text-[#A4161A]">Iniciar sesión</h2>

        <form @submit.prevent="iniciarSesion" class="space-y-5">
          <div>
            <label for="email" class="block text-sm text-gray-400 mb-1">Correo electrónico</label>
            <input id="email" type="email" v-model="email" required
              class="w-full px-4 py-2 rounded-lg bg-[#2A2A2A] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#A4161A]" />
          </div>

          <div>
            <label for="password" class="block text-sm text-gray-400 mb-1">Contraseña</label>
            <input id="password" type="password" v-model="password" required
              class="w-full px-4 py-2 rounded-lg bg-[#2A2A2A] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#A4161A]" />
          </div>

          <button type="submit"
            class="w-full bg-[#A4161A] hover:bg-[#821015] text-white font-semibold py-2 rounded-lg transition">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
