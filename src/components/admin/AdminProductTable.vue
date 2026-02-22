<template>
  <div class="hidden lg:block bg-white/90 backdrop-blur-sm rounded-2xl border border-[#a74792]/20 shadow-lg overflow-x-auto">
    <table class="w-full text-sm">
      <thead class="bg-[#a74792]/5 border-b border-[#a74792]/20">
        <tr>
          <th class="px-4 py-3 text-left font-semibold text-[#2D1E3E]">
            <i class="mdi mdi-image mr-1"></i> Imagen
          </th>
          <th class="px-4 py-3 text-left font-semibold text-[#2D1E3E]">
            <i class="mdi mdi-tag mr-1"></i> Nombre
          </th>
          <th class="px-4 py-3 text-left font-semibold text-[#2D1E3E]">
            <i class="mdi mdi-currency-usd mr-1"></i> Precio
          </th>
          <th class="px-4 py-3 text-left font-semibold text-[#2D1E3E]">
            <i class="mdi mdi-eye-outline mr-1"></i> Visibilidad
          </th>
          <th class="px-4 py-3 text-left font-semibold text-[#2D1E3E]">
            <i class="mdi mdi-check-circle-outline mr-1"></i> Estado
          </th>
          <th class="px-4 py-3 text-left font-semibold text-[#2D1E3E]">
            <i class="mdi mdi-cog mr-1"></i> Acciones
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id" class="border-b border-[#a74792]/10 hover:bg-[#a74792]/5">
          <td class="px-4 py-3">
            <img :src="product.image" :alt="product.name" class="w-12 h-12 object-cover rounded-lg" />
          </td>
          <td class="px-4 py-3 font-medium text-[#2D1E3E]">{{ product.name }}</td>
          <td class="px-4 py-3 text-[#a74792] font-semibold">${{ product.price.toFixed(2) }}</td>
          <td class="px-4 py-3">
            <span
              :class="[
                'px-2 py-1 rounded-full text-xs font-medium',
                product.visible ? 'bg-highlight text-[#2D1E3E]' : 'bg-neutral text-[#2D1E3E]'
              ]"
            >
              {{ product.visible ? 'Visible' : 'Oculto' }}
            </span>
          </td>
          <td class="px-4 py-3">
            <span
              v-if="product.sold"
              class="px-2 py-1 rounded-full text-xs font-medium bg-warning text-white"
            >
              Vendido
            </span>
            <span v-else class="px-2 py-1 rounded-full text-xs font-medium bg-accent text-[#2D1E3E]">
              Disponible
            </span>
          </td>
          <td class="px-4 py-3">
            <div class="flex items-center gap-2">
              <!-- Editar -->
              <button
                @click="$emit('edit', product.id)"
                class="p-2 bg-highlight text-[#2D1E3E] rounded-full hover:opacity-80 transition-all active:scale-90 hover:shadow-md"
                title="Editar producto"
              >
                <i class="mdi mdi-pencil"></i>
              </button>

              <!-- Ocultar/Mostrar: cambia icono según visibilidad -->
              <button
                @click="$emit('toggle-visibility', product.id)"
                class="p-2 bg-neutral text-[#2D1E3E] rounded-full hover:opacity-80 transition-all active:scale-90 hover:shadow-md"
                :title="product.visible ? 'Ocultar producto' : 'Mostrar producto'"
              >
                <i :class="['mdi', product.visible ? 'mdi-eye-off' : 'mdi-eye']"></i>
              </button>

              <!-- Marcar vendido: cambia icono si ya está vendido -->
              <button
                @click="$emit('mark-sold', product.id)"
                class="p-2 rounded-full transition-all active:scale-90 hover:shadow-md"
                :class="product.sold ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-warning text-white hover:opacity-80'"
                :disabled="product.sold"
                :title="product.sold ? 'Producto ya vendido' : 'Marcar como vendido'"
              >
                <i :class="['mdi', product.sold ? 'mdi-check-circle-outline' : 'mdi-check-circle']"></i>
              </button>

              <!-- Eliminar -->
              <button
                @click="$emit('delete', product.id)"
                class="p-2 bg-nude text-[#2D1E3E] rounded-full hover:opacity-80 transition-all active:scale-90 hover:shadow-md"
                title="Eliminar producto"
              >
                <i class="mdi mdi-delete"></i>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps(['products'])
defineEmits(['edit', 'toggle-visibility', 'mark-sold', 'delete'])
</script>