<template>
  <div class="space-y-4">
    <!-- Imagen principal con borde hover -->
    <div class="aspect-square rounded-2xl overflow-hidden bg-gray-100 border-2 border-transparent hover:border-[#a74792] transition-all duration-300">
      <img
        :src="currentImage"
        :alt="productName"
        class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
      />
    </div>

    <!-- Miniaturas -->
    <div v-if="images.length > 1" class="grid grid-cols-4 gap-2">
      <button
        v-for="(img, idx) in images"
        :key="idx"
        @click="currentImage = img"
        class="aspect-square rounded-lg overflow-hidden border-2 transition-all"
        :class="currentImage === img ? 'border-[#a74792]' : 'border-transparent hover:border-[#d973b8]'"
      >
        <img :src="img" :alt="`${productName} - vista ${idx + 1}`" class="w-full h-full object-cover" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  images: {
    type: Array,
    required: true
  },
  productName: {
    type: String,
    required: true
  }
})

const currentImage = ref(props.images[0] || '')
</script>