<template>
  <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
    <div class="flex items-center gap-3">
      <i class="mdi mdi-tag-multiple text-4xl text-[#a74792]"></i>
      <div>
        <h1 class="text-3xl md:text-4xl font-bold text-[#2D1E3E] mb-1">Administrar Productos</h1>
        <p class="text-[#2D1E3E] opacity-70">Gestioná el catálogo, stock y visibilidad</p>
      </div>
    </div>
    <button
      @click="$emit('new-product')"
      class="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#a74792] to-[#d973b8] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
    >
      <i class="mdi mdi-plus-circle"></i>
      <span>Nuevo Producto</span>
    </button>
  </div>
</template>

<script setup>
defineEmits(['new-product'])
</script>