<template>
  <div class="flex items-center gap-3 py-3 border-b last:border-0">
    <img :src="item.image" :alt="item.name" class="w-16 h-16 object-cover rounded-lg">
    <div class="flex-1 min-w-0">
      <h3 class="font-medium text-gray-800 truncate">{{ item.name }}</h3>
      <p class="text-sm text-gray-500">{{ item.brand }} · {{ item.condition }}</p>
      <p class="text-sm text-gray-600">Talle: <span class="font-medium">{{ item.size || 'Único' }}</span></p>
      <p class="text-xs text-gray-400 mt-1">Cantidad: 1</p>
    </div>
    <div class="flex flex-col items-end gap-1">
      <span class="font-semibold text-[#a74792]">${{ item.price.toFixed(2) }}</span>
      <button @click="$emit('remove', item)" class="text-gray-400 hover:text-red-500 p-2">
        <span class="mdi mdi-delete text-xl"></span>
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  item: { type: Object, required: true }
})
defineEmits(['remove'])
</script>