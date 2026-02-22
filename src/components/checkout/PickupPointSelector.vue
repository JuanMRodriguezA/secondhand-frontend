<template>
  <div class="space-y-3">
    <p class="text-sm font-medium text-gray-700">Selecciona punto de encuentro:</p>
    <div class="space-y-2">
      <div
        v-for="point in points"
        :key="point.id"
        @click="selectPoint(point)"
        class="relative border rounded-lg p-3 cursor-pointer transition"
        :class="[
          selectedPoint?.id === point.id 
            ? 'border-[#a74792] border-2 bg-[#fcf5fa] shadow-md' 
            : 'border border-gray-200 hover:border-[#d973b8]'
        ]"
      >
        <div class="flex justify-between items-start">
          <div>
            <p class="font-medium">{{ point.zone }} - {{ point.location }}</p>
            <p class="text-sm text-gray-600">{{ point.address }}</p>
            <p class="text-xs text-gray-500 mt-1">{{ point.description }}</p>
          </div>
          <!-- Indicador de selección visible -->
          <div v-if="selectedPoint?.id === point.id" class="ml-2 flex-shrink-0">
            <span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#a74792] text-white">
              <span class="mdi mdi-check text-sm"></span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  points: { type: Array, required: true }
})
const emit = defineEmits(['select'])

const selectedPoint = ref(null)

const selectPoint = (point) => {
  selectedPoint.value = point
  emit('select', point)
}
</script>