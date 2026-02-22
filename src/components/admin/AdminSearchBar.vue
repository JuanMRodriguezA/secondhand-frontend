<template>
  <div class="relative flex-1">
    <i class="mdi mdi-magnify absolute left-4 top-1/2 -translate-y-1/2 text-[#a74792] text-xl z-10"></i>
    <input
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      placeholder="Buscar producto..."
      class="w-full pl-12 pr-4 py-3 rounded-full border border-[#a74792]/20 bg-white/90 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#a74792]/50 shadow-sm"
    />
  </div>
</template>

<script setup>
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>