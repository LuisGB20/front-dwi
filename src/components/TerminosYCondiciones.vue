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
      Términos y Condiciones
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
        <h2 class="text-2xl font-bold mb-4">Términos y Condiciones</h2>
        <p class="mb-4">
          Bienvenido a Mustang Experience. Al acceder y usar nuestro sitio web,
          usted acepta cumplir con los siguientes términos y condiciones...
        </p>
        <p class="mb-2">
          1. Uso del sitio: El contenido es solo para uso personal y no comercial.
        </p>
        <p class="mb-2">
          2. Propiedad intelectual: Todo el contenido está protegido por derechos
          de autor.
        </p>
        <p class="mb-2">
          3. Limitación de responsabilidad: No nos hacemos responsables por daños
          derivados del uso del sitio.
        </p>
        <p class="mb-2">
          4. Modificaciones: Podemos modificar estos términos en cualquier momento
          sin previo aviso.
        </p>
        <p>
          Para más información, contacte con nuestro equipo de soporte.
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
