<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { verificarSesion } from '@/composables/auth'

const router = useRouter()

// Definir esquema de validación con yup
const schema = yup.object({
  correoElectronico: yup
    .string()
    .required('El correo es obligatorio')
    .email('Formato de correo inválido'),
  contrasena: yup
    .string()
    .required('La contraseña es obligatoria')
    .min(8, 'La contraseña debe tener al menos 8 caracteres'),
})

// Crear formulario con esquema
const { handleSubmit } = useForm({
  validationSchema: schema,
})

const { value: correoElectronico, errorMessage: errorCorreo } = useField('correoElectronico')
const { value: contrasena, errorMessage: errorContrasena } = useField('contrasena')

const iniciarSesion = handleSubmit(async (values) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/iniciar-sesion`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values),
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

    // Suponiendo que tienes una función verificarSesion en tu composable auth
    // para actualizar el estado global del usuario autenticado
    await verificarSesion()

    // Si todo salió bien, redirige a /crm
    await router.push('/crm')

  } catch (error) {
    console.error(error)
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se pudo conectar al servidor'
    })
  }
})
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
            <label for="correoElectronico" class="block text-sm text-gray-400 mb-1">Correo electrónico</label>
            <input
              id="correoElectronico"
              type="email"
              v-model="correoElectronico"
              class="w-full px-4 py-2 rounded-lg bg-[#2A2A2A] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#A4161A]"
            />
            <p class="text-red-500 text-sm mt-1">{{ errorCorreo }}</p>
          </div>

          <div>
            <label for="contrasena" class="block text-sm text-gray-400 mb-1">Contraseña</label>
            <input
              id="contrasena"
              type="password"
              v-model="contrasena"
              class="w-full px-4 py-2 rounded-lg bg-[#2A2A2A] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#A4161A]"
            />
            <p class="text-red-500 text-sm mt-1">{{ errorContrasena }}</p>
          </div>

          <button
            type="submit"
            class="w-full bg-[#A4161A] hover:bg-[#821015] text-white font-semibold py-2 rounded-lg transition"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  </section>
</template>
