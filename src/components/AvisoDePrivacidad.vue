<script setup lang="ts">
import { ref } from "vue";

const mostrar = ref(false);
const toggle = () => (mostrar.value = !mostrar.value);
</script>

<template>
  <div>
    <button
      @click="toggle"
      class="text-gray-400 underline hover:text-white transition"
      type="button"
    >
      Aviso de Privacidad
    </button>

    <div
      v-if="mostrar"
      class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-6"
    >
      <div
        class="bg-white rounded-lg max-w-3xl max-h-[80vh] overflow-auto p-6 relative text-gray-900"
      >
        <button
          @click="toggle"
          class="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          aria-label="Cerrar"
        >
          ✕
        </button>
        <h2 class="text-2xl font-bold mb-4">Aviso de Privacidad</h2>
        <p class="mb-4">
          En Mustang Experience valoramos su privacidad y nos comprometemos a
          proteger sus datos personales.
        </p>
        <p class="mb-2">
          1. Datos recolectados: Información personal que usted nos proporciona
          al registrarse o solicitar servicios.
        </p>
        <p class="mb-2">
          2. Uso de los datos: Utilizamos sus datos para ofrecerle una mejor
          experiencia y mejorar nuestros servicios.
        </p>
        <p class="mb-2">
          3. Protección de datos: Implementamos medidas de seguridad para
          proteger su información.
        </p>
        <p class="mb-2">
          4. Derechos del usuario: Usted puede solicitar acceso, corrección o
          eliminación de sus datos en cualquier momento.
        </p>
        <p>
          Para dudas o solicitudes, contáctenos a través de nuestro formulario de
          contacto.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
button:focus {
  outline: 2px solid #A4161A;
  outline-offset: 2px;
}
</style>
