<script setup>
import { onMounted } from 'vue';
import Footer from './components/Footer.vue';
import Navbar from './components/Navbar.vue';
import { verificarSesion } from './composables/auth';

onMounted(() => {
  verificarSesion()
})

</script>

<template>
  <Navbar />
  <RouterView />
  <Footer></Footer>
</template>

<style></style>
