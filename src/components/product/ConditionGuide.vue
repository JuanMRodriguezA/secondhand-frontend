<template>
  <div class="bg-white rounded-2xl p-6 border border-[#a74792]/20 shadow-sm hover:shadow-md transition-shadow">
    <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
      <span class="mdi mdi-information-outline text-[#a74792]"></span>
      Guía de condiciones
    </h3>
    <div class="space-y-3">
      <div
        v-for="(item, idx) in conditions"
        :key="idx"
        class="border-b border-gray-100 last:border-0 pb-3 last:pb-0"
      >
        <button
          @click="toggle(idx)"
          class="flex justify-between items-center w-full text-left group"
        >
          <span class="font-semibold text-gray-800 group-hover:text-[#a74792] transition-colors">{{ item.name }}</span>
          <span
            class="mdi text-[#a74792]"
            :class="openIndex === idx ? 'mdi-chevron-up' : 'mdi-chevron-down'"
          ></span>
        </button>
        <p v-if="openIndex === idx" class="mt-2 text-sm text-gray-600 pr-6 bg-[#f8f0fa] p-3 rounded-lg">
          {{ item.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const openIndex = ref(0)

const conditions = [
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
]

const toggle = (idx) => {
  openIndex.value = openIndex.value === idx ? null : idx
}
</script>