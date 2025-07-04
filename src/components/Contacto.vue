<script setup lang="ts">
import { ref } from "vue";
import { Field, Form, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import Swal from "sweetalert2";
import TerminosYCondiciones from "./TerminosYCondiciones.vue";
import AvisoDePrivacidad from "./AvisoDePrivacidad.vue";
import { RecaptchaV2, useRecaptcha } from "vue3-recaptcha-v2";
import emailjs, { init } from "emailjs-com";

const { handleGetResponse } = useRecaptcha();
const widgetId = ref<number | null>(null);
init(import.meta.env.VITE_MAILJS_USER_ID);  // Aquí va tu User ID de EmailJS

const schema = yup.object({
  nombre: yup.string().trim().required("El nombre es obligatorio"),
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
  mensaje: yup.string().trim().required("El mensaje es obligatorio"),
  aceptaTerminos: yup
    .mixed()
    .oneOf([true], "Debes aceptar los términos y condiciones"),
  aceptaPrivacidad: yup
    .mixed()
    .oneOf([true], "Debes aceptar el aviso de privacidad"),
});

const enviarFormulario = async (values: any, { resetForm }: any) => {
  let token = handleGetResponse(widgetId.value);
  if (!token) {
    await Swal.fire({
      icon: "warning",
      title: "reCAPTCHA requerido",
      text: "Por favor completa el reCAPTCHA.",
      confirmButtonColor: "#A4161A",
    });
    return;
  }

  values.recaptcha_token = token;

  try {
    const respuesta = await fetch(
      `${import.meta.env.VITE_API_URL}/api/contacto`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    );

    const resultado = await respuesta.json();

    if (!respuesta.ok) {
      if (resultado.errores && Array.isArray(resultado.errores)) {
        await Swal.fire({
          icon: "error",
          title: "Errores de validación",
          html: resultado.errores.map((e: string) => `<p>${e}</p>`).join(""),
          confirmButtonColor: "#A4161A",
        });
      } else if (resultado.mensaje) {
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: resultado.mensaje,
          confirmButtonColor: "#A4161A",
        });
      } else {
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ocurrió un error al enviar tu mensaje.",
          confirmButtonColor: "#A4161A",
        });
      }
      return;
    }
    
    await Swal.fire({
      icon: "success",
      title: "¡Mensaje enviado!",
      text: resultado.mensaje || "Gracias por contactarnos. Te responderemos pronto.",
      confirmButtonColor: "#A4161A",
    });

    await emailjs.send(
      import.meta.env.VITE_MAILJS_SERVICE_ID,
      import.meta.env.VITE_MAILJS_TEMPLATE_ID,
      {
        nombre: values.nombre,
        correo: values.correo,
        telefono: values.telefono,
        mensaje: values.mensaje
      }
    ).then(() => {
      console.log("Notificación enviada por EmailJS");
    }).catch(err => {
      console.error("Error al enviar notificación con EmailJS:", err);
    });

    resetForm();
  } catch (error) {
    console.error("Error al enviar el formulario:", error);
    await Swal.fire({
      icon: "error",
      title: "Error inesperado",
      text: "Ocurrió un error al enviar tu mensaje. Inténtalo más tarde.",
      confirmButtonColor: "#A4161A",
    });
  }
};

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
  <section id="formulario" class="bg-[#212121] text-white py-24 px-6">
    <h2 class="text-3xl font-bold text-center mb-6">
      Solicita tu prueba de manejo
    </h2>
    <p class="text-lg text-center text-gray-400 mb-10 max-w-xl mx-auto">
      Completa el formulario y un asesor se pondrá en contacto contigo. ¡Haz
      rugir al Mustang 2025!
    </p>

    <Form
      :validation-schema="schema"
      @submit="enviarFormulario"
      class="max-w-2xl mx-auto bg-[#101010] p-8 rounded-xl shadow-2xl space-y-6"
    >
      <div>
        <label class="block text-sm font-medium text-gray-300 mb-1"
          >Nombre completo</label
        >
        <Field
          name="nombre"
          type="text"
          placeholder="Tu nombre"
          class="w-full p-3 rounded-lg bg-[#1e1e1e] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#A4161A]"
        />
        <ErrorMessage name="nombre" class="text-red-500 text-sm mt-1" />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-300 mb-1"
          >Correo electrónico</label
        >
        <Field
          name="correo"
          type="email"
          placeholder="correo@example.com"
          class="w-full p-3 rounded-lg bg-[#1e1e1e] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#A4161A]"
        />
        <ErrorMessage name="correo" class="text-red-500 text-sm mt-1" />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-300 mb-1"
          >Teléfono</label
        >
        <Field
          name="telefono"
          type="tel"
          placeholder="+52 1 234 567 8901"
          class="w-full p-3 rounded-lg bg-[#1e1e1e] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#A4161A]"
        />
        <ErrorMessage name="telefono" class="text-red-500 text-sm mt-1" />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-300 mb-1"
          >Mensaje</label
        >
        <Field
          name="mensaje"
          as="textarea"
          rows="4"
          placeholder="Estoy interesado en una prueba de manejo..."
          class="w-full p-3 rounded-lg bg-[#1e1e1e] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#A4161A]"
        />
        <ErrorMessage name="mensaje" class="text-red-500 text-sm mt-1" />
      </div>

      <div class="flex items-center space-x-2">
        <Field
          name="aceptaTerminos"
          type="checkbox"
          id="aceptaTerminos"
          class="w-4 h-4 text-[#A4161A] bg-gray-700 border-gray-600 rounded focus:ring-[#A4161A]"
        />
        <label for="aceptaTerminos" class="text-gray-300 text-sm select-none">
           <p> Acepto los<TerminosYCondiciones></TerminosYCondiciones></p>
        </label>
      </div>
      <ErrorMessage
        name="aceptaTerminos"
        class="text-red-500 text-sm mt-1 block"
      />

      <div class="flex items-center space-x-2">
        <Field
          name="aceptaPrivacidad"
          type="checkbox"
          id="aceptaPrivacidad"
          class="w-4 h-4 text-[#A4161A] bg-gray-700 border-gray-600 rounded focus:ring-[#A4161A]"
        />
        <label for="aceptaPrivacidad" class="text-gray-300 text-sm select-none">
          Acepto el
          <AvisoDePrivacidad/>
        </label>
      </div>
      <ErrorMessage
        name="aceptaPrivacidad"
        class="text-red-500 text-sm mt-1 block"
      />

            <RecaptchaV2 @widget-id="handleWidgetId" @error-callback="handleErrorCallback"
        @expired-callback="handleExpiredCallback" @load-callback="handleLoadCallback" />

      <button
        type="submit"
        class="w-full py-3 bg-[#A4161A] hover:bg-[#821015] text-white font-bold rounded-lg transition disabled:opacity-50"
      >
        Enviar
      </button>
    </Form>
  </section>
</template>