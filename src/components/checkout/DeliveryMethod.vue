<template>
  <div class="bg-white rounded-2xl shadow-lg p-5">
    <h2 class="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
      <span class="mdi mdi-truck-fast text-[#a74792]"></span>
      Método de entrega
    </h2>

    <div class="space-y-3">
      <!-- Opción Presencial -->
      <div class="border rounded-xl p-4" :class="{ 'border-[#a74792] bg-[#fcf5fa]': selected === 'presencial' }">
        <label class="flex items-start gap-3 cursor-pointer">
          <input type="radio" value="presencial" v-model="selected" class="mt-1 text-[#a74792] w-5 h-5">
          <div class="flex-1">
            <p class="font-medium">Entrega presencial <span class="text-sm text-gray-500">(Montevideo)</span></p>
            <p class="text-sm text-gray-600">Retiro en puntos de encuentro. 3 ubicaciones. Puedes probarte el calzado. Pago en efectivo disponible.</p>
          </div>
        </label>
        <div v-if="selected === 'presencial'" class="mt-3 pl-8">
          <PickupPointSelector :points="pickupPoints" @select="(p) => $emit('update:pickupPoint', p)" />
        </div>
      </div>

      <!-- Opción Cadetería -->
      <div class="border rounded-xl p-4" :class="{ 'border-[#a74792] bg-[#fcf5fa]': selected === 'cadeteria' }">
        <label class="flex items-start gap-3 cursor-pointer">
          <input type="radio" value="cadeteria" v-model="selected" class="mt-1 text-[#a74792] w-5 h-5">
          <div class="flex-1">
            <p class="font-medium">Cadetería <span class="text-sm text-gray-500">(Todo Uruguay)</span></p>
            <p class="text-sm text-gray-600">Envío a domicilio en 24-48hs hábiles. Seguimiento en tiempo real y seguro incluido.</p>
          </div>
        </label>
        <div v-if="selected === 'cadeteria'" class="mt-3 pl-8">
          <AddressForm @update:address="(a) => $emit('update:address', a)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import PickupPointSelector from './PickupPointSelector.vue'
import AddressForm from './AddressForm.vue'

const props = defineProps({
  modelValue: { type: String, required: true },
  pickupPoints: { type: Array, required: true }
})
const emit = defineEmits(['update:modelValue', 'update:address', 'update:pickupPoint'])

const selected = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})
</script>