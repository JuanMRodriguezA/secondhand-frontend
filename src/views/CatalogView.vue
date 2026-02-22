<template>
  <section class="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4 md:py-12 md:px-8">
    <div class="max-w-7xl mx-auto">
      <!-- Encabezado -->
      <div class="flex flex-col items-center mb-8 text-center">
        <h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-2 relative inline-block">
          Catálogo
          <span class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-[#a74792] to-[#d973b8] rounded-full"></span>
        </h1>
        <p class="text-gray-600 max-w-2xl text-sm md:text-base mt-5">
          Descubrí todas nuestras prendas seleccionadas con cuidado.
        </p>
      </div>

      <!-- Botón para abrir filtros en móvil -->
      <div class="lg:hidden mb-6">
        <button
          @click="showMobileFilters = !showMobileFilters"
          class="w-full flex items-center justify-between px-4 py-3 bg-white rounded-xl border border-[#a74792]/20 shadow-md text-gray-700 font-medium"
        >
          <span class="flex items-center gap-2">
            <span class="mdi mdi-filter-variant text-[#a74792] text-xl"></span>
            Filtros
          </span>
          <span
            :class="['mdi', showMobileFilters ? 'mdi-chevron-up' : 'mdi-chevron-down', 'text-xl text-[#a74792]']"
          ></span>
        </button>
      </div>

      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Sidebar de filtros -->
        <aside
          :class="[
            'lg:w-1/4 bg-white rounded-2xl p-6 border border-[#a74792]/20 shadow-lg h-fit transition-all duration-300',
            showMobileFilters ? 'block' : 'hidden lg:block'
          ]"
        >
          <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span class="mdi mdi-filter-outline text-[#a74792]"></span>
            Filtros
          </h2>

          <!-- Categorías -->
          <div class="mb-6">
            <h3 class="font-semibold text-gray-700 mb-2 flex items-center gap-1">
              <span class="mdi mdi-tag-outline text-[#a74792]"></span> Categoría
            </h3>
            <div class="space-y-2">
              <label v-for="cat in categories" :key="cat" class="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="checkbox"
                  :value="cat"
                  v-model="selectedCategories"
                  class="rounded border-[#a74792]/30 text-[#a74792] focus:ring-[#a74792]/20"
                  @change="handleCategoryChange"
                />
                <span class="text-gray-700">{{ cat }}</span>
              </label>
            </div>
          </div>

          <!-- Condición -->
          <div class="mb-6">
            <h3 class="font-semibold text-gray-700 mb-2 flex items-center gap-1">
              <span class="mdi mdi-check-circle-outline text-[#a74792]"></span> Condición
            </h3>
            <div class="space-y-2">
              <label
                v-for="cond in conditionOptions"
                :key="cond.value"
                class="flex items-center gap-2 cursor-pointer text-sm"
              >
                <input
                  type="checkbox"
                  :value="cond.value"
                  v-model="selectedConditions"
                  class="rounded border-[#a74792]/30 text-[#a74792] focus:ring-[#a74792]/20"
                />
                <span class="text-gray-700">{{ cond.label }}</span>
              </label>
            </div>
          </div>

          <!-- Filtros dinámicos según categoría -->
          <div v-if="showSizeFilter" class="mb-6">
            <h3 class="font-semibold text-gray-700 mb-2 flex items-center gap-1">
              <span class="mdi mdi-human-male-height text-[#a74792]"></span> Talle
            </h3>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="size in availableSizes"
                :key="size"
                @click="toggleSize(size)"
                :class="[
                  'px-3 py-1.5 rounded-full text-sm font-medium transition-all border',
                  selectedSizes.includes(size)
                    ? 'bg-[#a74792] text-white border-[#a74792]'
                    : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
                ]"
              >
                {{ size }}
              </button>
            </div>
          </div>

          <!-- Filtro de marca dinámico -->
          <div class="mb-6">
            <h3 class="font-semibold text-gray-700 mb-2 flex items-center gap-1">
              <span class="mdi mdi-store-outline text-[#a74792]"></span> Marca
            </h3>
            <select
              v-model="selectedBrand"
              class="w-full px-3 py-2 border border-[#a74792]/20 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#a74792] bg-white"
            >
              <option value="">Todas las marcas</option>
              <option v-for="brand in availableBrands" :key="brand" :value="brand">
                {{ brand }}
              </option>
            </select>
          </div>

          <!-- Precio -->
          <div class="mb-6">
            <h3 class="font-semibold text-gray-700 mb-2 flex items-center gap-1">
              <span class="mdi mdi-currency-usd text-[#a74792]"></span> Precio
            </h3>
            <div class="flex items-center gap-2">
              <input
                type="number"
                v-model.number="minPrice"
                placeholder="Mín"
                class="w-full px-3 py-2 border border-[#a74792]/20 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#a74792]"
              />
              <span class="text-gray-500">-</span>
              <input
                type="number"
                v-model.number="maxPrice"
                placeholder="Máx"
                class="w-full px-3 py-2 border border-[#a74792]/20 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#a74792]"
              />
            </div>
          </div>

          <!-- Botones de acción -->
          <div class="flex gap-2">
            <button
              @click="resetFilters"
              class="flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
            >
              Limpiar
            </button>
            <button
              @click="applyFilters"
              class="flex-1 px-3 py-2 bg-gradient-to-r from-[#a74792] to-[#d973b8] text-white rounded-lg hover:from-[#d973b8] hover:to-[#a74792] transition-colors text-sm font-medium"
            >
              Aplicar
            </button>
          </div>
        </aside>

        <!-- Grid de productos -->
        <main class="lg:w-3/4">
          <!-- Cabecera con resultados y orden -->
          <div class="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <p class="text-gray-600 text-sm">
              {{ filteredProducts.length }} productos encontrados
            </p>
            <select
              v-model="sortBy"
              class="px-3 py-2 border border-[#a74792]/20 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#a74792] bg-white"
            >
              <option value="">Ordenar por</option>
              <option value="priceAsc">Precio: menor a mayor</option>
              <option value="priceDesc">Precio: mayor a menor</option>
              <option value="nameAsc">Nombre: A-Z</option>
            </select>
          </div>

          <!-- Grid de productos -->
          <div v-if="filteredProducts.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProductCard
              v-for="(product, index) in filteredProducts"
              :key="product.id"
              :product="product"
              :delay="index"
              @add-to-cart="$emit('add-to-cart', product.id)"
              @view-detail="goToDetail"
            />
          </div>

          <!-- Mensaje vacío -->
          <div v-else class="text-center py-16">
            <span class="mdi mdi-close-circle-outline text-5xl text-[#a74792]/50 mb-4 inline-block"></span>
            <h3 class="text-xl font-bold text-gray-800 mb-2">No hay productos</h3>
            <p class="text-gray-600">Probá con otros filtros.</p>
          </div>
        </main>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import ProductCard from '@/components/ProductCard.vue'
import { useProductStore } from '@/stores/productStore'
import { storeToRefs } from 'pinia'

const router = useRouter()
const productStore = useProductStore()
const { products } = storeToRefs(productStore)

// Emits
defineEmits(['add-to-cart'])

// -------------------- Filtros estáticos --------------------
const conditionOptions = [
  { value: 'Nuevo', label: 'Nuevo' },
  { value: 'Como nuevo', label: 'Como nuevo' },
  { value: 'Muy buen estado', label: 'Muy buen estado' },
  { value: 'Buen estado', label: 'Buen estado' },
  { value: 'Aceptable', label: 'Aceptable' }
]

const clothingSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
const shoeSizes = Array.from({ length: 11 }, (_, i) => (35 + i).toString())

// -------------------- Estado de filtros --------------------
const showMobileFilters = ref(false)
const selectedCategories = ref([])
const selectedConditions = ref([])
const selectedSizes = ref([])
const selectedBrand = ref('')
const minPrice = ref(null)
const maxPrice = ref(null)
const sortBy = ref('')

// -------------------- Computed: categorías disponibles --------------------
const categories = computed(() => {
  const cats = products.value.map(p => p.category).filter(Boolean)
  return [...new Set(cats)]
})

// -------------------- Computed: marcas disponibles (según filtros actuales) --------------------
const availableBrands = computed(() => {
  let filtered = products.value
  if (selectedCategories.value.length) {
    filtered = filtered.filter(p => selectedCategories.value.includes(p.category))
  }
  const brands = filtered.map(p => p.brand).filter(Boolean)
  return [...new Set(brands)]
})

// -------------------- Computed: mostrar filtro de talle? --------------------
const showSizeFilter = computed(() => {
  if (selectedCategories.value.length === 1) {
    const cat = selectedCategories.value[0]
    return cat === 'Ropa' || cat === 'Calzado'
  }
  return false
})

// -------------------- Computed: talles disponibles --------------------
const availableSizes = computed(() => {
  if (selectedCategories.value.length === 1) {
    const cat = selectedCategories.value[0]
    if (cat === 'Ropa') return clothingSizes
    if (cat === 'Calzado') return shoeSizes
  }
  return []
})

// -------------------- Computed: productos filtrados --------------------
const filteredProducts = computed(() => {
  let result = products.value

  if (selectedCategories.value.length) {
    result = result.filter(p => selectedCategories.value.includes(p.category))
  }

  if (selectedConditions.value.length) {
    result = result.filter(p => selectedConditions.value.includes(p.condition))
  }

  if (selectedSizes.value.length && showSizeFilter.value) {
    result = result.filter(p => {
      if (p.size) {
        return selectedSizes.value.includes(p.size)
      }
      if (p.sizes) {
        return p.sizes.some(s => selectedSizes.value.includes(s))
      }
      return false
    })
  }

  if (selectedBrand.value) {
    result = result.filter(p => p.brand === selectedBrand.value)
  }

  if (minPrice.value !== null && !isNaN(minPrice.value)) {
    result = result.filter(p => p.price >= minPrice.value)
  }

  if (maxPrice.value !== null && !isNaN(maxPrice.value)) {
    result = result.filter(p => p.price <= maxPrice.value)
  }

  if (sortBy.value === 'priceAsc') {
    result = [...result].sort((a, b) => a.price - b.price)
  } else if (sortBy.value === 'priceDesc') {
    result = [...result].sort((a, b) => b.price - a.price)
  } else if (sortBy.value === 'nameAsc') {
    result = [...result].sort((a, b) => a.name.localeCompare(b.name))
  }

  return result
})

// -------------------- Métodos --------------------
const handleCategoryChange = () => {
  selectedSizes.value = []
}

const toggleSize = (size) => {
  if (selectedSizes.value.includes(size)) {
    selectedSizes.value = selectedSizes.value.filter(s => s !== size)
  } else {
    selectedSizes.value.push(size)
  }
}

const applyFilters = () => {
  showMobileFilters.value = false
}

const resetFilters = () => {
  selectedCategories.value = []
  selectedConditions.value = []
  selectedSizes.value = []
  selectedBrand.value = ''
  minPrice.value = null
  maxPrice.value = null
  sortBy.value = ''
  showMobileFilters.value = false
}

const goToDetail = (productId) => {
  router.push({ name: 'product-detail', params: { id: productId } })
}
</script>