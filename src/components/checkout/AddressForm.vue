<template>
  <div class="space-y-3">
    <div class="grid grid-cols-2 gap-2">
      <div>
        <label class="block text-sm font-medium text-gray-700">Calle</label>
        <input type="text" v-model="street" @input="updateAddress" class="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-[#a74792] focus:border-[#a74792]" placeholder="Av. 18 de Julio">
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Número</label>
        <input type="text" v-model="number" @input="updateAddress" class="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-[#a74792] focus:border-[#a74792]" placeholder="1234">
      </div>
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700">Esquina / Referencia</label>
      <input type="text" v-model="reference" @input="updateAddress" class="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-[#a74792] focus:border-[#a74792]" placeholder="Esq. Ejido, apto 201">
    </div>
    <div class="grid grid-cols-2 gap-2">
      <div>
        <label class="block text-sm font-medium text-gray-700">Ciudad</label>
        <input type="text" v-model="city" @input="updateAddress" class="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-[#a74792] focus:border-[#a74792]" value="Montevideo">
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">C.P.</label>
        <input type="text" v-model="zip" @input="updateAddress" class="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-[#a74792] focus:border-[#a74792]" placeholder="11200">
      </div>
    </div>
    <p class="text-xs text-gray-500">Recibirás el envío en 24-48hs hábiles.</p>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const street = ref('')
const number = ref('')
const reference = ref('')
const city = ref('Montevideo')
const zip = ref('')

const emit = defineEmits(['update:address'])

const updateAddress = () => {
  const full = `${street.value} ${number.value}${reference.value ? ', ' + reference.value : ''}, ${city.value} ${zip.value}`.trim()
  emit('update:address', full)
}

// Emitir cuando cambie cualquier campo
watch([street, number, reference, city, zip], updateAddress, { immediate: true })
</script>