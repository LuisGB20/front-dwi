<script setup lang="ts">
// Aquí puedes agregar lógica futura (llamadas a API, validación, etc.)
</script>

<template>
  <!-- HERO -->
  <section class="hero text-white flex items-center justify-center flex-col text-center p-6">
    <h1 class="text-5xl md:text-6xl font-extrabold drop-shadow-xl tracking-tight">
      Mustang 2025
    </h1>
    <p class="mt-4 text-xl md:text-2xl text-gray-300 max-w-2xl">
      Pura adrenalina, diseño icónico y tecnología del futuro. El auto deportivo más emblemático se reinventa.
    </p>
  </section>

  <!-- INFORMACIÓN DESTACADA -->
  <section class="bg-[#1e1e1e] text-white py-16 px-6 md:px-12 flex flex-col md:flex-row gap-10 items-center">
    <img
      src="https://www.ford.mx/content/ford/mx/es_mx/mustang-content/2025/media-carousel/interiores/jcr:content/par/mediacarouselitem_735337208/image.imgs.full.high.jpg/1741982958133.jpg"
      alt="Interior Mustang 2025"
      class="w-full md:w-1/2 rounded-xl shadow-xl object-cover"
    />
    <div class="md:w-1/2 space-y-6">
      <h2 class="text-4xl font-bold text-[#d90429]">Redefiniendo el poder</h2>
      <p class="text-lg text-gray-300">
        El Mustang 2025 no solo mantiene su legado, lo potencia con innovación sin precedentes:
      </p>
      <ul class="list-disc list-inside text-gray-400 space-y-1 text-lg">
        <li>Motor V8 5.0L – hasta 500hp de pura fuerza</li>
        <li>Interior digital inmersivo de nueva generación</li>
        <li>Escape activo con sonido ajustable</li>
        <li>Diseño agresivo, aerodinámico y moderno</li>
      </ul>
    </div>
  </section>

  <!-- CARACTERÍSTICAS EN CARDS -->
  <section class="bg-gray-100 text-center py-16 px-6">
    <h2 class="text-3xl font-bold text-[#0f0f0f] mb-4">Tecnología & Diseño</h2>
    <p class="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
      El Mustang 2025 combina su esencia clásica con los avances más modernos en experiencia y rendimiento.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
      <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
        <h3 class="text-xl font-semibold text-[#d90429] mb-2">Pantalla curva 13.2”</h3>
        <p class="text-gray-700">Control total con SYNC 4 y experiencia digital inmersiva.</p>
      </div>
      <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
        <h3 class="text-xl font-semibold text-[#d90429] mb-2">Luces LED inteligentes</h3>
        <p class="text-gray-700">Estética moderna con iluminación adaptativa frontal y trasera.</p>
      </div>
      <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
        <h3 class="text-xl font-semibold text-[#d90429] mb-2">Modos de manejo</h3>
        <p class="text-gray-700">Normal, Sport, Track: elige cómo domar la carretera.</p>
      </div>
    </div>
  </section>

  <!-- FORMULARIO -->
  <section class="bg-[#1e1e1e] text-white py-20 px-6">
    <h2 class="text-3xl font-bold text-center mb-6">Solicita tu prueba de manejo</h2>
    <p class="text-lg text-center text-gray-400 mb-10 max-w-xl mx-auto">
      Completa el formulario y un asesor se pondrá en contacto contigo. ¡Haz rugir al Mustang 2025!
    </p>

    <form class="max-w-2xl mx-auto bg-[#0f0f0f] p-8 rounded-xl shadow-xl space-y-6">
      <div>
        <label class="block text-sm font-medium text-gray-300 mb-1">Nombre completo</label>
        <input
          type="text"
          placeholder="Tu nombre"
          class="w-full p-3 rounded-lg bg-[#1e1e1e] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-[#d90429]"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-300 mb-1">Correo electrónico</label>
        <input
          type="email"
          placeholder="correo@example.com"
          class="w-full p-3 rounded-lg bg-[#1e1e1e] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-[#d90429]"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-300 mb-1">Mensaje</label>
        <textarea
          rows="4"
          placeholder="Estoy interesado en una prueba de manejo..."
          class="w-full p-3 rounded-lg bg-[#1e1e1e] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-[#d90429]"
        ></textarea>
      </div>
      <button
        type="submit"
        class="w-full py-3 bg-[#d90429] hover:bg-red-700 text-white font-bold rounded-lg transition"
      >
        Enviar
      </button>
    </form>
  </section>

  <!-- FOOTER -->
  <footer class="bg-black text-gray-500 text-sm text-center py-6">
    &copy; 2025 Mustang Experience — Todos los derechos reservados.
  </footer>
</template>

<style scoped>
.hero {
  background: linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)),
    url("https://www.ford.mx/content/ford/mx/es_mx/home/autos/mustang/2025/jcr:content/par/billboard/imageComponent/image.imgs.full.high.jpg")
      center/cover no-repeat;
  min-height: 100vh;
}
</style>
