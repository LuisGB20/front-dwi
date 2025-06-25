<script setup lang="ts">
const testimonios = [
  {
    mensaje:
      "Conducir el Mustang fue una experiencia única. Potencia y diseño sin igual.",
    autor: "Carla Mendoza",
  },
  {
    mensaje:
      "La tecnología y el confort me sorprendieron. Me enamoré al primer manejo.",
    autor: "Ricardo León",
  },
];
</script>

<template>
  <section class="bg-white py-20 px-6 text-center">
    <h2 class="text-3xl font-bold text-[#212121] mb-4">
      Lo que dicen nuestros clientes
    </h2>
    <p class="text-gray-600 mb-10 max-w-2xl mx-auto">
      Experiencias reales, emociones verdaderas.
    </p>
    <div
      class="flex flex-col md:flex-row gap-8 justify-center max-w-5xl mx-auto"
    >
      <div
        v-for="(testimonio, index) in testimonios"
        :key="index"
        class="bg-gray-100 p-6 rounded-xl shadow-md"
      >
        <p class="italic text-gray-700">“{{ testimonio.mensaje }}”</p>
        <span class="block mt-4 font-semibold text-[#A4161A]">
          — {{ testimonio.autor }}
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
