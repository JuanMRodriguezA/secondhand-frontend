<template>
  <div
    class="group relative flex flex-col rounded-xl bg-white shadow-sm transition-all duration-300 hover:shadow-md border border-gray-100 cursor-pointer"
    :style="{ animationDelay: `${delay * 100}ms` }"
    @click="$emit('view-detail', product.id)"
  >
    <!-- Imagen -->
    <div class="relative aspect-square overflow-hidden rounded-t-xl bg-gray-50">
      <img
        :src="product.image"
        :alt="product.name"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />

      <!-- Badge de condición con colores -->
      <div class="absolute left-3 top-3">
        <span
          v-if="product.condition === 'Nuevo'"
          class="inline-block rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#a74792] shadow-sm backdrop-blur-sm border border-[#a74792]/20"
        >
          {{ product.condition }}
        </span>
        <span
          v-else-if="product.condition === 'Como nuevo'"
          class="inline-block rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#d973b8] shadow-sm backdrop-blur-sm border border-[#d973b8]/20"
        >
          {{ product.condition }}
        </span>
        <span
          v-else-if="product.condition === 'Muy buen estado'"
          class="inline-block rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-green-600 shadow-sm backdrop-blur-sm border border-green-600/20"
        >
          {{ product.condition }}
        </span>
        <span
          v-else-if="product.condition === 'Buen estado'"
          class="inline-block rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-blue-600 shadow-sm backdrop-blur-sm border border-blue-600/20"
        >
          {{ product.condition }}
        </span>
        <span
          v-else-if="product.condition === 'Aceptable'"
          class="inline-block rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-orange-600 shadow-sm backdrop-blur-sm border border-orange-600/20"
        >
          {{ product.condition }}
        </span>
        <span
          v-else
          class="inline-block rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-600 shadow-sm backdrop-blur-sm border border-gray-200"
        >
          {{ product.condition }}
        </span>
      </div>
    </div>

    <!-- Información del producto -->
    <div class="flex flex-1 flex-col p-4">
      <div class="flex items-start justify-between gap-2">
        <div class="min-w-0 flex-1">
          <h3 class="truncate text-base font-semibold text-gray-800">
            {{ product.name }}
          </h3>
          <p class="mt-0.5 text-sm text-gray-500">
            {{ product.brand }}
          </p>

          <!-- Precios -->
          <div class="mt-2 flex items-baseline gap-2">
            <span class="text-xl font-bold text-[#a74792]">${{ product.price.toFixed(2) }}</span>
            <span
              v-if="product.originalPrice"
              class="text-sm text-gray-400 line-through"
            >${{ product.originalPrice.toFixed(2) }}</span>
          </div>
        </div>

        <!-- Botón añadir al carrito (solo móvil) -->
        <button
          @click.stop="$emit('add-to-cart', product.id)"
          class="shrink-0 lg:hidden flex h-10 w-10 items-center justify-center rounded-full bg-[#a74792] text-white shadow-md transition-colors hover:bg-[#d973b8] active:scale-95"
          aria-label="Añadir al carrito"
        >
          <span class="mdi mdi-cart-plus text-lg"></span>
        </button>
      </div>

      <!-- Botón añadir al carrito (solo escritorio) -->
      <button
        @click.stop="$emit('add-to-cart', product.id)"
        class="mt-4 hidden w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#a74792] to-[#d973b8] px-4 py-2.5 text-sm font-semibold text-white transition-all hover:from-[#d973b8] hover:to-[#a74792] hover:shadow-md active:scale-[0.98] lg:flex"
      >
        <span class="mdi mdi-cart-plus"></span>
        Añadir al carrito
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  product: { type: Object, required: true },
  delay: { type: Number, default: 0 }
})

defineEmits(['add-to-cart', 'view-detail'])
</script>

<style scoped>
.group {
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.group:hover {
  transform: translateY(-2px);
}
@media (max-width: 1023px) {
  .group:active {
    background-color: #fafafa;
  }
}
</style>