<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

type Estatus = 'Pendiente' | 'Contactado' | 'Rechazado'

interface Lead {
  id: number
  nombre: string
  telefono: string
  correo: string
  mensaje: string
  estatus: Estatus
}

const leads = ref<Lead[]>([])

// Estadísticas
const totalLeads = computed(() => leads.value.length)
const pendientes = computed(() => leads.value.filter(l => l.estatus === 'Pendiente').length)
const contactados = computed(() => leads.value.filter(l => l.estatus === 'Contactado').length)
const rechazados = computed(() => leads.value.filter(l => l.estatus === 'Rechazado').length)
const ultimoLead = computed(() => {
  if (leads.value.length === 0) return null
  return leads.value[leads.value.length - 1]
})

// Paginación
const paginaActual = ref(1)
const porPagina = 5

const totalPaginas = computed(() =>
  Math.ceil(leads.value.length / porPagina)
)

const leadsPaginados = computed(() => {
  const inicio = (paginaActual.value - 1) * porPagina
  return leads.value.slice(inicio, inicio + porPagina)
})

function cambiarPagina(nuevaPagina: number) {
  if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas.value) {
    paginaActual.value = nuevaPagina
  }
}

// Función para cambiar estatus
async function cambiarEstatus(lead: Lead) {
  const estatusAnterior = lead.estatus

  // Cambia localmente primero
  if (lead.estatus === 'Pendiente') lead.estatus = 'Contactado'
  else if (lead.estatus === 'Contactado') lead.estatus = 'Rechazado'
  else lead.estatus = 'Pendiente'

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/leads`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idLead: lead.id,
        estatus: lead.estatus,
      }),
    });

    if (!response.ok) {
      throw new Error("Error al actualizar estatus");
    }
    const data = await response.json()
    console.log("Estatus actualizado:", data)

  } catch (error) {
    console.error("Error al actualizar el estatus del lead:", error);
    lead.estatus = estatusAnterior
  }
}

// Cargar leads desde API al montar
onMounted(async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/leads`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })

    const datos = await response.json()
    leads.value = datos

  } catch (error) {
    console.error("Error al obtener leads:", error)
  }
})
</script>

<template>
  <section class="min-h-screen bg-[#121212] text-white px-6 py-20">
    <h1 class="text-3xl font-bold text-[#A4161A] mb-8 text-center">Panel de Leads</h1>

    <!-- Cards resumen -->
    <div class="grid grid-cols-1 md:grid-cols-5 gap-6 mb-10">
      <div class="bg-[#1E1E1E] rounded-lg p-6 shadow-md text-center">
        <p class="text-gray-400">Total de Leads</p>
        <p class="text-4xl font-bold text-[#A4161A]">{{ totalLeads }}</p>
      </div>
      <div class="bg-[#1E1E1E] rounded-lg p-6 shadow-md text-center">
        <p class="text-gray-400">Pendientes</p>
        <p class="text-4xl font-bold text-yellow-400">{{ pendientes }}</p>
      </div>
      <div class="bg-[#1E1E1E] rounded-lg p-6 shadow-md text-center">
        <p class="text-gray-400">Contactados</p>
        <p class="text-4xl font-bold text-green-400">{{ contactados }}</p>
      </div>
      <div class="bg-[#1E1E1E] rounded-lg p-6 shadow-md text-center">
        <p class="text-gray-400">Rechazados</p>
        <p class="text-4xl font-bold text-red-400">{{ rechazados }}</p>
      </div>
      <div class="bg-[#1E1E1E] rounded-lg p-6 shadow-md text-center">
        <p class="text-gray-400">Último Lead</p>
        <p class="text-lg font-semibold">{{ ultimoLead?.nombre || '—' }}</p>
      </div>
    </div>

    <!-- Tabla -->
    <div class="overflow-x-auto">
      <table class="min-w-full text-left border border-[#2a2a2a] rounded-lg overflow-hidden">
        <thead class="bg-[#1E1E1E] text-gray-300 text-sm">
          <tr>
            <th class="px-4 py-3 border-b border-[#2a2a2a]">Nombre</th>
            <th class="px-4 py-3 border-b border-[#2a2a2a]">Teléfono</th>
            <th class="px-4 py-3 border-b border-[#2a2a2a]">Correo</th>
            <th class="px-4 py-3 border-b border-[#2a2a2a]">Mensaje</th>
            <th class="px-4 py-3 border-b border-[#2a2a2a]">Estatus</th>
            <th class="px-4 py-3 border-b border-[#2a2a2a]">Acción</th>
          </tr>
        </thead>
        <tbody class="text-sm">
          <tr v-for="(lead, index) in leadsPaginados" :key="index"
            class="bg-[#1A1A1A] hover:bg-[#222] border-b border-[#2a2a2a]">
            <td class="px-4 py-3">{{ lead.nombre }}</td>
            <td class="px-4 py-3">{{ lead.telefono }}</td>
            <td class="px-4 py-3">{{ lead.correo }}</td>
            <td class="px-4 py-3">{{ lead.mensaje }}</td>
            <td class="px-4 py-3">
              <span :class="{
                'text-yellow-400': lead.estatus === 'Pendiente',
                'text-green-400': lead.estatus === 'Contactado',
                'text-red-400': lead.estatus === 'Rechazado',
              }">
                {{ lead.estatus }}
              </span>
            </td>
            <td class="px-4 py-3">
              <button @click="cambiarEstatus(lead)"
                class="bg-[#A4161A] hover:bg-[#821015] text-white px-3 py-1 rounded transition">
                Cambiar Estatus
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Controles de paginación -->
    <div class="flex justify-center items-center mt-6 gap-3 text-sm text-gray-300">
      <button @click="cambiarPagina(paginaActual - 1)" :disabled="paginaActual === 1"
        class="px-3 py-1 bg-[#1E1E1E] rounded hover:bg-[#2A2A2A] disabled:opacity-50">
        Anterior
      </button>
      <span>Página {{ paginaActual }} de {{ totalPaginas }}</span>
      <button @click="cambiarPagina(paginaActual + 1)" :disabled="paginaActual === totalPaginas"
        class="px-3 py-1 bg-[#1E1E1E] rounded hover:bg-[#2A2A2A] disabled:opacity-50">
        Siguiente
      </button>
    </div>
  </section>
</template>
