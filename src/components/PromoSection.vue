<template>
  <section class="relative bg-transparent">
    <div class="container mx-auto px-4 md:px-6 pt-12 md:pt-16 pb-8 md:pb-10">
      <!-- Encabezado responsive -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-6 md:mb-8 gap-4">
        <div class="text-center sm:text-left">
          <h2 class="text-3xl md:text-4xl font-bold text-textPrimary mb-1 md:mb-2">
            Novedades
          </h2>
          <p class="text-textPrimary opacity-80 text-sm md:text-base font-bold">
            Los últimos ingresos seleccionados especialmente para ti.
          </p>
        </div>
        
        <!-- Botón ver todos - Opcional si tienes página de catálogo -->
        <RouterLink 
          to="/catalogo"
          class="px-4 py-2 md:px-5 md:py-2.5 bg-warning text-white font-bold rounded-full hover:bg-highlight transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 self-center sm:self-auto text-sm md:text-base"
        >
          <span>Ver todo</span>
          <i class="mdi mdi-arrow-right text-base"></i>
        </RouterLink>
      </div>

      <!-- Grid de productos -->
      <div v-if="products && products.length" class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <ProductCard 
          v-for="(p, i) in products.slice(0, 4)" 
          :key="p.id" 
          :product="p" 
          :delay="i"
          @add-to-cart="$emit('add-to-cart', $event)"
          @view-detail="$emit('view-detail', $event)"
        />
      </div>
      <div v-else class="text-center py-8 md:py-12">
        <div class="flex flex-col items-center justify-center gap-4">
          <div class="w-16 h-16 md:w-20 md:h-20 rounded-full bg-warning/10 flex items-center justify-center">
            <i class="mdi mdi-package-variant text-warning text-2xl md:text-3xl"></i>
          </div>
          <p class="text-textPrimary opacity-80 text-base md:text-lg">No hay novedades en este momento.</p>
          <p class="text-textPrimary opacity-60 text-sm md:text-base">Pronto añadiremos nuevos productos.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import ProductCard from './ProductCard.vue'

defineProps({
  products: {
    type: Array,
    default: () => [
  { id: 1, name: 'Zapato Cool', price: 1200, brand: 'Nike', condition: 'Nuevo', image: 'https://via.placeholder.com/200' },
  { id: 2, name: 'Remera Vintage', price: 800, brand: 'Adidas', condition: 'Usado', image: 'https://via.placeholder.com/200' }
]
  }
})

defineEmits(['add-to-cart', 'view-detail'])
</script>

<style scoped>
.text-warning {
  color: #a74792;
}

.bg-warning {
  background-color: #a74792;
}

.hover\:bg-highlight:hover {
  background-color: #d973b8;
}

.bg-warning\/10 {
  background-color: rgba(167, 71, 146, 0.1);
}

/* Asegurar que los enlaces se vean bien */
a {
  text-decoration: none;
}

/* Animación sutil para la sección */
section {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>