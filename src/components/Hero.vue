<script setup lang="ts">
const caracteristicas = [
  "Motor V8 5.0L – hasta 500hp",
  "Interior digital inmersivo de nueva generación",
  "Escape activo con sonido ajustable",
  "Diseño agresivo, aerodinámico y moderno",
];
</script>

<template>
  <section
    class="hero text-white flex items-center justify-center flex-col text-center p-6"
  >
    <h1
      class="text-5xl md:text-7xl font-extrabold tracking-tight drop-shadow-lg"
    >
      Mustang 2025
    </h1>
    <p class="mt-6 text-xl md:text-2xl text-gray-200 max-w-3xl leading-relaxed">
      Pura adrenalina, diseño icónico y tecnología del futuro. El auto deportivo
      más emblemático se reinventa.
    </p>
    <a
      href="#formulario"
      class="mt-10 px-6 py-3 bg-[#A4161A] hover:bg-[#821015] rounded-full font-semibold text-white transition"
    >
      Solicita tu prueba de manejo
    </a>
  </section>
  <section
    class="bg-[#212121] text-white py-20 px-6 md:px-16 flex flex-col md:flex-row gap-12 items-center"
  >
    <img
      src="https://www.ford.mx/content/ford/mx/es_mx/mustang-content/2025/media-carousel/interiores/jcr:content/par/mediacarouselitem_735337208/image.imgs.full.high.jpg/1741982958133.jpg"
      alt="Interior Mustang 2025"
      class="w-full md:w-1/2 rounded-2xl shadow-2xl object-cover max-h-[400px]"
    />
    <div class="md:w-1/2 space-y-6">
      <h2 class="text-4xl font-bold text-[#A4161A]">Redefiniendo el poder</h2>
      <p class="text-lg text-gray-300">
        El Mustang 2025 potencia su legado con innovación sin precedentes:
      </p>
      <ul class="list-disc list-inside text-gray-400 space-y-2 text-lg">
        <li v-for="(item, index) in caracteristicas" :key="index">{{ item }}</li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.hero {
  background: linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)),
    url("https://www.ford.mx/content/ford/mx/es_mx/home/autos/mustang/2025/jcr:content/par/billboard/imageComponent/image.imgs.full.high.jpg")
      center/cover no-repeat;
  min-height: 100vh;
}
</style>
