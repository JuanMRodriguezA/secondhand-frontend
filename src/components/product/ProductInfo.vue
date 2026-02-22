<template>
  <div class="space-y-6">
    <!-- Título y marca -->
    <div>
      <h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
        {{ product.name }}
      </h1>
      <p class="text-lg text-gray-600">{{ product.brand }}</p>
    </div>

    <!-- Badge de condición -->
    <div class="flex flex-wrap items-center gap-3">
      <span
        class="inline-block rounded-full px-4 py-1.5 text-sm font-semibold shadow-sm"
        :class="conditionBadgeClass"
      >
        {{ product.condition }}
      </span>
    </div>

    <!-- Precio -->
    <div class="flex items-baseline gap-3">
      <span class="text-3xl font-extrabold text-[#a74792] drop-shadow-sm">${{ product.price.toFixed(2) }}</span>
      <span v-if="product.originalPrice" class="text-lg text-gray-400 line-through">
        ${{ product.originalPrice.toFixed(2) }}
      </span>
    </div>

    <!-- Descripción con fondo suave -->
    <div class="prose prose-gray max-w-none bg-white/50 p-4 rounded-xl border border-gray-100">
      <p class="text-gray-700 leading-relaxed">{{ product.description }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  product: { type: Object, required: true }
})

const conditionBadgeClass = computed(() => {
  const map = {
    'Nuevo': 'bg-white text-[#a74792] border border-[#a74792]/20',
    'Como nuevo': 'bg-white text-[#d973b8] border border-[#d973b8]/20',
    'Muy buen estado': 'bg-white text-green-600 border border-green-600/20',
    'Buen estado': 'bg-white text-blue-600 border border-blue-600/20',
    'Aceptable': 'bg-white text-orange-600 border border-orange-600/20'
  }
  return map[props.product.condition] || 'bg-gray-100 text-gray-600 border border-gray-300'
})
</script>