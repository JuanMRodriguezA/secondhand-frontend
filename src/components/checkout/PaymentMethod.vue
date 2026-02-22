<template>
  <div class="bg-white rounded-2xl shadow-lg p-5">
    <h2 class="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
      <span class="mdi mdi-credit-card text-[#a74792]"></span>
      Método de pago
    </h2>

    <div class="grid grid-cols-2 gap-3">
      <label class="border rounded-xl p-3 flex flex-col items-center gap-1 cursor-pointer text-center" :class="{ 'border-[#a74792] bg-[#fcf5fa]': selected === 'tarjeta' }">
        <input type="radio" value="tarjeta" v-model="selected" class="sr-only">
        <span class="mdi mdi-credit-card text-2xl text-[#a74792]"></span>
        <span class="text-sm font-medium">Tarjetas</span>
      </label>

      <label class="border rounded-xl p-3 flex flex-col items-center gap-1 cursor-pointer text-center" :class="{ 'border-[#a74792] bg-[#fcf5fa]': selected === 'transferencia' }">
        <input type="radio" value="transferencia" v-model="selected" class="sr-only">
        <span class="mdi mdi-bank text-2xl text-[#a74792]"></span>
        <span class="text-sm font-medium">Transferencia</span>
      </label>

      <label class="border rounded-xl p-3 flex flex-col items-center gap-1 cursor-pointer text-center" :class="{ 'border-[#a74792] bg-[#fcf5fa]': selected === 'mercadopago' }">
        <input type="radio" value="mercadopago" v-model="selected" class="sr-only">
        <span class="mdi mdi-currency-usd text-2xl text-[#a74792]"></span>
        <span class="text-sm font-medium">Mercado Pago</span>
      </label>

      <label class="border rounded-xl p-3 flex flex-col items-center gap-1 cursor-pointer text-center" :class="{ 'border-[#a74792] bg-[#fcf5fa]': selected === 'efectivo' }">
        <input type="radio" value="efectivo" v-model="selected" class="sr-only">
        <span class="mdi mdi-cash text-2xl text-[#a74792]"></span>
        <span class="text-sm font-medium">Efectivo</span>
      </label>
    </div>

    <p class="text-xs text-gray-500 mt-3 text-center">
      * No realizamos cobros en línea. La vendedora te contactará para coordinar.
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: { type: String, required: true }
})
const emit = defineEmits(['update:modelValue'])

const selected = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})
</script>