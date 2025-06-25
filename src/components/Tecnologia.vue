<script setup lang="ts">
const caracteristicas = [
  {
    titulo: "Pantalla curva 13.2”",
    descripcion: "Control total con SYNC 4 y experiencia digital inmersiva.",
  },
  {
    titulo: "Luces LED inteligentes",
    descripcion: "Iluminación adaptativa para máxima visibilidad.",
  },
  {
    titulo: "Modos de manejo",
    descripcion: "Normal, Sport y Track: elige tu nivel de adrenalina.",
  },
];
</script>

<template>
  <section class="bg-[#F5F5F5] text-center py-20 px-6">
    <h2 class="text-3xl font-bold text-[#212121] mb-4">Tecnología & Diseño</h2>
    <p class="text-lg text-gray-700 max-w-2xl mx-auto mb-10">
      Combina su esencia clásica con lo último en innovación y experiencia de manejo.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      <div
        v-for="(item, index) in caracteristicas"
        :key="index"
        class="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
      >
        <h3 class="text-xl font-semibold text-[#A4161A] mb-2">{{ item.titulo }}</h3>
        <p class="text-gray-600">{{ item.descripcion }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
