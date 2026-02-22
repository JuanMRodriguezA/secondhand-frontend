<template>
  <div class="min-h-screen relative">
    <!-- Fondo animado -->
    <AnimatedBackground />

    <!-- Contenido principal -->
    <div class="relative z-10 container mx-auto px-4 py-8 md:py-12 max-w-4xl">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 class="text-3xl md:text-4xl font-bold text-[#2D1E3E] mb-1">Guías de producto</h1>
          <p class="text-[#2D1E3E] opacity-70">Editá las tablas de talles y las condiciones</p>
        </div>
        <button
          @click="saveChanges"
          class="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#a74792] to-[#d973b8] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
          :disabled="isSaving"
        >
          <i class="mdi mdi-content-save"></i>
          <span>{{ isSaving ? 'Guardando...' : 'Guardar cambios' }}</span>
        </button>
      </div>

      <div class="space-y-8">
        <!-- Sección: Guía de talles - Calzado -->
        <div class="bg-white/90 backdrop-blur-sm rounded-2xl border border-[#a74792]/20 shadow-lg p-6">
          <h2 class="text-xl font-bold text-[#2D1E3E] mb-4 flex items-center gap-2">
            <i class="mdi mdi-human-male-height text-[#a74792]"></i>
            Guía de talles - Calzado
          </h2>
          <p class="text-sm text-[#2D1E3E] opacity-70 mb-4">
            Podés modificar los centímetros correspondientes a cada talle.
          </p>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead class="bg-gradient-to-r from-[#a74792] to-[#d973b8] text-white rounded-t-lg">
                <tr>
                  <th class="py-3 px-4 text-left font-semibold rounded-tl-lg">Talle</th>
                  <th class="py-3 px-4 text-left font-semibold rounded-tr-lg">Largo plantilla (cm)</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, idx) in sizeChart" :key="row.size" class="border-b border-[#a74792]/10 hover:bg-[#f8f0fa] transition-colors">
                  <td class="py-3 px-4 font-medium text-[#2D1E3E]">{{ row.size }}</td>
                  <td class="py-3 px-4">
                    <input
                      type="number"
                      step="0.1"
                      v-model.number="row.cm"
                      class="w-24 px-3 py-1 border border-[#a74792]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a74792]/50 bg-white/80"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p class="text-xs text-[#2D1E3E] opacity-50 mt-3 flex items-center gap-1">
            <i class="mdi mdi-information text-[#a74792]"></i>
            * Valores en centímetros. Los talles son fijos.
          </p>
        </div>

        <!-- Sección: Guía de condiciones -->
        <div class="bg-white/90 backdrop-blur-sm rounded-2xl border border-[#a74792]/20 shadow-lg p-6">
          <h2 class="text-xl font-bold text-[#2D1E3E] mb-4 flex items-center gap-2">
            <i class="mdi mdi-information-outline text-[#a74792]"></i>
            Guía de condiciones
          </h2>
          <p class="text-sm text-[#2D1E3E] opacity-70 mb-4">
            Editá las descripciones para cada condición.
          </p>
          <div class="space-y-3">
            <div
              v-for="(item, idx) in conditions"
              :key="idx"
              class="border border-[#a74792]/10 rounded-lg overflow-hidden"
            >
              <button
                @click="toggleCondition(idx)"
                class="flex justify-between items-center w-full text-left p-4 bg-[#f8f0fa] hover:bg-[#f0e0f5] transition-colors"
              >
                <span class="font-semibold text-[#2D1E3E]">{{ item.name }}</span>
                <i
                  class="mdi text-[#a74792] text-xl"
                  :class="openCondition === idx ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                ></i>
              </button>
              <div v-if="openCondition === idx" class="p-4 bg-white">
                <label class="block text-sm font-medium text-[#2D1E3E] mb-2">Descripción</label>
                <textarea
                  v-model="item.description"
                  rows="3"
                  class="w-full px-4 py-2 border border-[#a74792]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a74792]/50"
                  placeholder="Escribí la descripción..."
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Toast de éxito (simple) -->
      <transition name="fade">
        <div v-if="showToast" class="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 z-50">
          <i class="mdi mdi-check-circle"></i>
          <span>Cambios guardados</span>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AnimatedBackground from '@/components/ui/AnimatedBackground.vue'

// Datos de talles (editables los cm)
const sizeChart = ref([
  { size: 35, cm: 22.5 },
  { size: 36, cm: 23.0 },
  { size: 37, cm: 23.5 },
  { size: 38, cm: 24.0 },
  { size: 39, cm: 24.5 },
  { size: 40, cm: 25.0 },
  { size: 41, cm: 25.5 },
  { size: 42, cm: 26.0 },
  { size: 43, cm: 26.5 },
  { size: 44, cm: 27.0 },
  { size: 45, cm: 27.5 }
])

// Datos de condiciones (editables las descripciones)
const conditions = ref([
  {
    name: 'Nuevo',
    description: 'Producto sin uso, con etiquetas originales y en su empaque original.'
  },
  {
    name: 'Como nuevo',
    description: 'Producto en perfecto estado, sin marcas de uso, pero puede no tener etiquetas.'
  },
  {
    name: 'Muy buen estado',
    description: 'Producto usado con mínimo cuidado, sin defectos visibles.'
  },
  {
    name: 'Buen estado',
    description: 'Producto con señales de uso normal, pero totalmente funcional y estéticamente aceptable.'
  },
  {
    name: 'Aceptable',
    description: 'Producto con detalles visibles (pequeñas manchas, desgaste), pero conserva su utilidad.'
  }
])

// Estado del acordeón de condiciones
const openCondition = ref(0)

// Guardado
const isSaving = ref(false)
const showToast = ref(false)

const toggleCondition = (idx) => {
  openCondition.value = openCondition.value === idx ? null : idx
}

const saveChanges = () => {
  isSaving.value = true
  // Simular guardado (podrías enviar a una API)
  setTimeout(() => {
    isSaving.value = false
    showToast.value = true
    setTimeout(() => {
      showToast.value = false
    }, 3000)
  }, 800)
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>