<script setup lang="ts">
import { ref } from "vue";
import { Field, Form, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { RecaptchaV2, useRecaptcha } from "vue3-recaptcha-v2";

const widgetId = ref<number | null>(null);

const schema = yup.object({
  nombre: yup
    .string()
    .trim()
    .required("El nombre es obligatorio"),
  correo: yup
    .string()
    .trim()
    .email("Correo electrónico inválido")
    .required("El correo es obligatorio"),
  telefono: yup
    .string()
    .trim()
    .matches(/^\+?\d{7,15}$/, "Número de teléfono inválido")
    .required("El teléfono es obligatorio"),
  mensaje: yup
    .string()
    .trim()
    .required("El mensaje es obligatorio"),
});

const enviarFormulario = async (values: any, { resetForm }: any) => {
  const token = handleGetResponse(widgetId.value);
  console.log('*****************************', token)
  if (!token) {
    alert("Por favor completa el reCAPTCHA.");
    return;
  }

  values.recaptcha_token = token;


  try {
    const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/api/contacto`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!respuesta.ok) {
      throw new Error(`Error del servidor: ${respuesta.statusText}`);
    }

    const resultado = await respuesta.json();
    console.log("Formulario enviado correctamente:", resultado);
    alert("Gracias por contactarnos. Te responderemos pronto.");

    resetForm();
  } catch (error) {
    console.error("Error al enviar el formulario:", error);
    alert("Ocurrió un error al enviar tu mensaje. Inténtalo más tarde.");
  }
};

const { handleGetResponse } = useRecaptcha();

const handleWidgetId = (id: number) => {
  widgetId.value = id;
};

const handleErrorCallback = () => {
  // console.log("Error callback");
};
const handleExpiredCallback = () => {
  // console.log("Expired callback");
};
const handleLoadCallback = (response: unknown) => {
  // console.log("Load callback", response);
};
</script>


<template>
  <section class="hero text-white flex items-center justify-center flex-col text-center p-6">
    <h1 class="text-5xl md:text-7xl font-extrabold tracking-tight drop-shadow-lg">
      Mustang 2025
    </h1>
    <p class="mt-6 text-xl md:text-2xl text-gray-200 max-w-3xl leading-relaxed">
      Pura adrenalina, diseño icónico y tecnología del futuro. El auto deportivo
      más emblemático se reinventa.
    </p>
    <a href="#formulario"
      class="mt-10 px-6 py-3 bg-[#A4161A] hover:bg-[#821015] rounded-full font-semibold text-white transition">
      Solicita tu prueba de manejo
    </a>
  </section>

  <section class="bg-[#212121] text-white py-20 px-6 md:px-16 flex flex-col md:flex-row gap-12 items-center">
    <img
      src="https://www.ford.mx/content/ford/mx/es_mx/mustang-content/2025/media-carousel/interiores/jcr:content/par/mediacarouselitem_735337208/image.imgs.full.high.jpg/1741982958133.jpg"
      alt="Interior Mustang 2025" class="w-full md:w-1/2 rounded-2xl shadow-2xl object-cover max-h-[400px]" />
    <div class="md:w-1/2 space-y-6">
      <h2 class="text-4xl font-bold text-[#A4161A]">Redefiniendo el poder</h2>
      <p class="text-lg text-gray-300">
        El Mustang 2025 potencia su legado con innovación sin precedentes:
      </p>
      <ul class="list-disc list-inside text-gray-400 space-y-2 text-lg">
        <li>Motor V8 5.0L – hasta 500hp</li>
        <li>Interior digital inmersivo de nueva generación</li>
        <li>Escape activo con sonido ajustable</li>
        <li>Diseño agresivo, aerodinámico y moderno</li>
      </ul>
    </div>
  </section>

  <section class="bg-[#F5F5F5] text-center py-20 px-6">
    <h2 class="text-3xl font-bold text-[#212121] mb-4">Tecnología & Diseño</h2>
    <p class="text-lg text-gray-700 max-w-2xl mx-auto mb-10">
      Combina su esencia clásica con lo último en innovación y experiencia de
      manejo.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      <div class="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
        <h3 class="text-xl font-semibold text-[#A4161A] mb-2">
          Pantalla curva 13.2”
        </h3>
        <p class="text-gray-600">
          Control total con SYNC 4 y experiencia digital inmersiva.
        </p>
      </div>
      <div class="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
        <h3 class="text-xl font-semibold text-[#A4161A] mb-2">
          Luces LED inteligentes
        </h3>
        <p class="text-gray-600">
          Iluminación adaptativa para máxima visibilidad.
        </p>
      </div>
      <div class="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
        <h3 class="text-xl font-semibold text-[#A4161A] mb-2">
          Modos de manejo
        </h3>
        <p class="text-gray-600">
          Normal, Sport y Track: elige tu nivel de adrenalina.
        </p>
      </div>
    </div>
  </section>

  <section class="bg-white py-20 px-6 text-center">
    <h2 class="text-3xl font-bold text-[#212121] mb-4">
      Lo que dicen nuestros clientes
    </h2>
    <p class="text-gray-600 mb-10 max-w-2xl mx-auto">
      Experiencias reales, emociones verdaderas.
    </p>
    <div class="flex flex-col md:flex-row gap-8 justify-center max-w-5xl mx-auto">
      <div class="bg-gray-100 p-6 rounded-xl shadow-md">
        <p class="italic text-gray-700">
          “Conducir el Mustang fue una experiencia única. Potencia y diseño sin
          igual.”
        </p>
        <span class="block mt-4 font-semibold text-[#A4161A]">— Carla Mendoza</span>
      </div>
      <div class="bg-gray-100 p-6 rounded-xl shadow-md">
        <p class="italic text-gray-700">
          “La tecnología y el confort me sorprendieron. Me enamoré al primer
          manejo.”
        </p>
        <span class="block mt-4 font-semibold text-[#A4161A]">— Ricardo León</span>
      </div>
    </div>
  </section>

  <section class="bg-[#F5F5F5] py-20 px-6">
    <h2 class="text-3xl font-bold text-center text-[#212121] mb-10">
      Galería Mustang 2025
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
      <img class="rounded-lg shadow-lg w-full object-cover aspect-[4/3]"
        src="https://www.ford.mx/content/ford/mx/es_mx/home/autos/mustang/2025/jcr:content/par/billboard_668607619/imageComponent/image.imgs.full.high.jpg"
        alt="Mustang exterior" />
      <img class="rounded-lg shadow-lg w-full object-cover aspect-[4/3]"
        src="https://www.ford.mx/content/ford/mx/es_mx/home/autos/mustang/2025/jcr:content/par/billboard_853974961/imageComponent/image.imgs.full.high.jpg"
        alt="Interior digital" />
      <img class="rounded-lg shadow-lg w-full object-cover aspect-[4/3]"
        src="https://www.ford.mx/content/ford/mx/es_mx/home/autos/mustang/2025/jcr:content/par/splitter/splitter0/image/image.imgs.full.high.jpg/1741967820813.jpg"
        alt="Perfil Mustang" />
    </div>
  </section>

  <section id="formulario" class="bg-[#212121] text-white py-24 px-6">
    <h2 class="text-3xl font-bold text-center mb-6">
      Solicita tu prueba de manejo
    </h2>
    <p class="text-lg text-center text-gray-400 mb-10 max-w-xl mx-auto">
      Completa el formulario y un asesor se pondrá en contacto contigo. ¡Haz rugir al Mustang 2025!
    </p>

    <Form :validation-schema="schema" @submit="enviarFormulario"
      class="max-w-2xl mx-auto bg-[#101010] p-8 rounded-xl shadow-2xl space-y-6">
      <div>
        <label class="block text-sm font-medium text-gray-300 mb-1">Nombre completo</label>
        <Field name="nombre" type="text" placeholder="Tu nombre"
          class="w-full p-3 rounded-lg bg-[#1e1e1e] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#A4161A]" />
        <ErrorMessage name="nombre" class="text-red-500 text-sm mt-1" />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-300 mb-1">Correo electrónico</label>
        <Field name="correo" type="email" placeholder="correo@example.com"
          class="w-full p-3 rounded-lg bg-[#1e1e1e] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#A4161A]" />
        <ErrorMessage name="correo" class="text-red-500 text-sm mt-1" />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-300 mb-1">Teléfono</label>
        <Field name="telefono" type="tel" placeholder="+52 1 234 567 8901"
          class="w-full p-3 rounded-lg bg-[#1e1e1e] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#A4161A]" />
        <ErrorMessage name="telefono" class="text-red-500 text-sm mt-1" />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-300 mb-1">Mensaje</label>
        <Field name="mensaje" as="textarea" rows="4" placeholder="Estoy interesado en una prueba de manejo..."
          class="w-full p-3 rounded-lg bg-[#1e1e1e] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#A4161A]" />
        <ErrorMessage name="mensaje" class="text-red-500 text-sm mt-1" />
      </div>

      <RecaptchaV2 @widget-id="handleWidgetId" @error-callback="handleErrorCallback"
        @expired-callback="handleExpiredCallback" @load-callback="handleLoadCallback" />

      <button type="submit"
        class="w-full py-3 bg-[#A4161A] hover:bg-[#821015] text-white font-bold rounded-lg transition">
        Enviar
      </button>
    </Form>
  </section>
  <footer class="bg-black text-gray-400 text-sm text-center py-6">
    &copy; 2025 Mustang Experience — Todos los derechos reservados.
  </footer>
</template>

<style scoped>
.hero {
  background: linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)),
    url("https://www.ford.mx/content/ford/mx/es_mx/home/autos/mustang/2025/jcr:content/par/billboard/imageComponent/image.imgs.full.high.jpg") center/cover no-repeat;
  min-height: 100vh;
}
</style>
