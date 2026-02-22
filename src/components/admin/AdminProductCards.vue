<template>
  <div class="lg:hidden space-y-4">
    <div
      v-for="product in products"
      :key="product.id"
      class="bg-white/90 backdrop-blur-sm rounded-2xl border border-[#a74792]/20 shadow-lg p-4"
    >
      <div class="flex gap-4">
        <img :src="product.image" :alt="product.name" class="w-20 h-20 object-cover rounded-xl" />
        <div class="flex-1">
          <h3 class="font-semibold text-[#2D1E3E]">{{ product.name }}</h3>
          <p class="text-sm text-[#2D1E3E] opacity-70">{{ product.brand }}</p>
          <div class="mt-2 flex items-baseline gap-2">
            <span class="text-lg font-bold text-[#a74792]">${{ product.price.toFixed(2) }}</span>
            <span v-if="product.originalPrice" class="text-sm text-gray-400 line-through">${{ product.originalPrice.toFixed(2) }}</span>
          </div>
          <div class="flex gap-2 mt-2">
            <span
              :class="[
                'px-2 py-0.5 rounded-full text-xs font-medium',
                product.visible ? 'bg-highlight text-[#2D1E3E]' : 'bg-neutral text-[#2D1E3E]'
              ]"
            >
              {{ product.visible ? 'Visible' : 'Oculto' }}
            </span>
            <span
              v-if="product.sold"
              class="px-2 py-0.5 rounded-full text-xs font-medium bg-warning text-white"
            >
              Vendido
            </span>
            <span v-else class="px-2 py-0.5 rounded-full text-xs font-medium bg-accent text-[#2D1E3E]">
              Disponible
            </span>
          </div>
        </div>
      </div>
      <div class="flex justify-end gap-3 mt-4 pt-3 border-t border-[#a74792]/10">
        <button
          @click="$emit('edit', product.id)"
          class="p-2 bg-highlight text-[#2D1E3E] rounded-full hover:opacity-80 active:scale-90 hover:shadow-md"
          title="Editar producto"
        >
          <i class="mdi mdi-pencil"></i>
        </button>

        <button
          @click="$emit('toggle-visibility', product.id)"
          class="p-2 bg-neutral text-[#2D1E3E] rounded-full hover:opacity-80 active:scale-90 hover:shadow-md"
          :title="product.visible ? 'Ocultar producto' : 'Mostrar producto'"
        >
          <i :class="['mdi', product.visible ? 'mdi-eye-off' : 'mdi-eye']"></i>
        </button>

        <button
          @click="$emit('mark-sold', product.id)"
          class="p-2 rounded-full active:scale-90 hover:shadow-md"
          :class="product.sold ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-warning text-white hover:opacity-80'"
          :disabled="product.sold"
          :title="product.sold ? 'Producto ya vendido' : 'Marcar como vendido'"
        >
          <i :class="['mdi', product.sold ? 'mdi-check-circle-outline' : 'mdi-check-circle']"></i>
        </button>

        <button
          @click="$emit('delete', product.id)"
          class="p-2 bg-nude text-[#2D1E3E] rounded-full hover:opacity-80 active:scale-90 hover:shadow-md"
          title="Eliminar producto"
        >
          <i class="mdi mdi-delete"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(['products'])
defineEmits(['edit', 'toggle-visibility', 'mark-sold', 'delete'])
</script>