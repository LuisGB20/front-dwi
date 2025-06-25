<script setup lang="ts">
const imagenes = [
  {
    src: "https://www.ford.mx/content/ford/mx/es_mx/home/autos/mustang/2025/jcr:content/par/billboard_668607619/imageComponent/image.imgs.full.high.jpg",
    alt: "Mustang exterior",
  },
  {
    src: "https://www.ford.mx/content/ford/mx/es_mx/home/autos/mustang/2025/jcr:content/par/billboard_853974961/imageComponent/image.imgs.full.high.jpg",
    alt: "Interior digital",
  },
  {
    src: "https://www.ford.mx/content/ford/mx/es_mx/home/autos/mustang/2025/jcr:content/par/splitter/splitter0/image/image.imgs.full.high.jpg/1741967820813.jpg",
    alt: "Perfil Mustang",
  },
];
</script>

<template>
  <section class="bg-[#F5F5F5] py-20 px-6">
    <h2 class="text-3xl font-bold text-center text-[#212121] mb-10">
      Galería Mustang 2025
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
      <img
        v-for="(img, index) in imagenes"
        :key="index"
        class="rounded-lg shadow-lg w-full object-cover aspect-[4/3]"
        :src="img.src"
        :alt="img.alt"
      />
    </div>
  </section>
</template>

<style scoped></style>
