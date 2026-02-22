<template>
  <div class="min-h-screen bg-gradient-to-b from-[#f8f6fa] to-white py-8 px-4 md:py-12 md:px-8">
    <div class="max-w-7xl mx-auto">
      <!-- Breadcrumb -->
      <div class="mb-6">
        <router-link to="/catalogo" class="text-[#a74792] hover:text-[#d973b8] transition-colors flex items-center gap-1">
          <span class="mdi mdi-arrow-left text-[#a74792]"></span> Volver al catálogo
        </router-link>
      </div>

      <div v-if="product" class="grid lg:grid-cols-2 gap-8 lg:gap-12">
        <!-- Galería -->
        <ProductGallery :images="productImages" :product-name="product.name" />

        <!-- Información principal -->
        <div class="space-y-6">
          <!-- Componente que muestra nombre, precio, condición, marca -->
          <ProductInfo :product="productForInfo" />

          <!-- Badge informativo para talla de ropa (única) -->
          <div v-if="product.category === 'Ropa' && product.size" class="flex items-center gap-2">
            <span class="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm flex items-center gap-2">
              <span class="mdi mdi-ruler text-[#a74792]"></span>
              Talla única: <span class="font-semibold">{{ product.size }}</span>
            </span>
          </div>

          <!-- Selector de tallas para calzado (interactivo) -->
          <div v-if="product.category === 'Calzado'" class="space-y-3">
            <p class="font-medium text-gray-700">Selecciona tu talla:</p>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="size in product.sizes"
                :key="size"
                @click="selectedSize = size"
                class="w-14 h-14 rounded-lg border-2 flex items-center justify-center font-semibold transition-all duration-200"
                :class="[
                  selectedSize === size
                    ? 'border-[#a74792] bg-gradient-to-br from-[#a74792] to-[#d973b8] text-white shadow-md'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-[#d973b8] hover:bg-[#fcf5fa]'
                ]"
              >
                {{ size }}
              </button>
            </div>
            <p v-if="sizeError" class="text-sm text-red-500 mt-1">{{ sizeError }}</p>
          </div>

          <!-- Botón añadir al carrito con feedback visual -->
          <button
            @click="handleAddToCart"
            :disabled="isAdding"
            class="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-[#a74792] to-[#d973b8] text-white font-bold rounded-full hover:from-[#d973b8] hover:to-[#a74792] transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-lg transform hover:scale-105 disabled:opacity-75 disabled:cursor-not-allowed"
            :class="{ 'scale-105': isAdding }"
          >
            <span v-if="!isAdding" class="flex items-center gap-2">
              <span class="mdi mdi-cart-plus"></span>
              Añadir al carrito
            </span>
            <span v-else class="flex items-center gap-2">
              <span class="mdi mdi-check-circle animate-pulse"></span>
              ¡Agregado!
            </span>
          </button>
        </div>
      </div>

      <!-- Guías -->
      <div class="mt-12 grid md:grid-cols-2 gap-6">
        <ConditionGuide />
        <SizeGuide v-if="product?.category === 'Calzado'" />
      </div>
    </div>

    <!-- Modal de primera compra -->
    <transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="showFirstTimeModal"
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        @click.self="continueShopping"
      >
        <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
          <button
            @click="continueShopping"
            class="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <span class="mdi mdi-close text-2xl"></span>
          </button>
          <div class="text-center">
            <div class="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-[#a74792] to-[#d973b8] flex items-center justify-center text-white mb-4">
              <span class="mdi mdi-cart-check text-3xl"></span>
            </div>
            <h3 class="text-2xl font-bold text-[#a74792] mb-2">¡Producto añadido!</h3>
            <p class="text-gray-600 mb-6">
              El producto se ha agregado a tu carrito. ¿Qué deseas hacer?
            </p>
            <div class="flex flex-col sm:flex-row gap-3">
              <button
                @click="goToCheckout"
                class="flex-1 py-3 px-4 bg-gradient-to-r from-[#a74792] to-[#d973b8] text-white font-semibold rounded-full hover:from-[#d973b8] hover:to-[#a74792] transition shadow-md flex items-center justify-center gap-2"
              >
                <span class="mdi mdi-cart"></span>
                Finalizar compra
              </button>
              <button
                @click="continueShopping"
                class="flex-1 py-3 px-4 bg-gray-100 text-gray-700 font-semibold rounded-full hover:bg-gray-200 transition border border-gray-200 flex items-center justify-center gap-2"
              >
                <span class="mdi mdi-shopping"></span>
                Seguir comprando
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductStore } from '@/stores/productStore'
import { useCartStore } from '@/stores/cartStore'
import ProductGallery from '@/components/product/ProductGallery.vue'
import ProductInfo from '@/components/product/ProductInfo.vue'
import ConditionGuide from '@/components/product/ConditionGuide.vue'
import SizeGuide from '@/components/product/SizeGuide.vue'

const route = useRoute()
const router = useRouter()
const productStore = useProductStore()
const cartStore = useCartStore()

const product = computed(() => {
  const id = parseInt(route.params.id)
  return productStore.products.find(p => p.id === id)
})

const productImages = computed(() => {
  if (!product.value) return []
  return product.value.images || [product.value.image]
})

// Eliminamos originalPrice para que no se muestre (solo precio actual)
const productForInfo = computed(() => {
  if (!product.value) return null
  const { originalPrice, ...rest } = product.value
  return rest
})

const selectedSize = ref(null)
const sizeError = ref('')
const showFirstTimeModal = ref(false)

// Feedback visual del botón
const isAdding = ref(false)
let addTimeout = null

const handleAddToCart = () => {
  if (!product.value) return

  // Validación para calzado
  if (product.value.category === 'Calzado') {
    if (!selectedSize.value) {
      sizeError.value = 'Por favor selecciona una talla'
      return
    } else {
      sizeError.value = ''
    }
  }

  const wasEmpty = cartStore.itemCount === 0

  // Preparar item para el carrito (sin originalPrice)
  const { originalPrice, ...productWithoutOriginal } = product.value
  const cartItem = {
    ...productWithoutOriginal,
    quantity: 1,
    size: product.value.category === 'Calzado' ? selectedSize.value : (product.value.size || null)
  }

  cartStore.addItem(cartItem)

  // Feedback visual en el botón
  if (addTimeout) clearTimeout(addTimeout)
  isAdding.value = true
  addTimeout = setTimeout(() => {
    isAdding.value = false
    addTimeout = null
  }, 1500)

  // Modal solo si el carrito estaba vacío
  if (wasEmpty) {
    showFirstTimeModal.value = true
  }
}

const goToCheckout = () => {
  showFirstTimeModal.value = false
  router.push('/carrito')
}

const continueShopping = () => {
  showFirstTimeModal.value = false
}

onUnmounted(() => {
  if (addTimeout) clearTimeout(addTimeout)
})
</script>