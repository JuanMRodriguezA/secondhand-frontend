<template>
  <div class="min-h-screen relative">
    <!-- Fondo animado -->
    <AnimatedBackground />

    <!-- Modal de confirmación -->
    <AdminDeleteModal
      :show="modal.show"
      :title="modal.title"
      :message="modal.message"
      @confirm="modal.onConfirm"
      @cancel="closeModal"
    />

    <!-- Contenido principal -->
    <div class="relative z-10 container mx-auto px-4 py-8 md:py-12">
      <!-- Header -->
      <AdminHeader @new-product="goToNewProduct" />

      <!-- Barra de búsqueda y toggle filtros móvil -->
      <div class="flex flex-col sm:flex-row gap-4 mb-6">
        <AdminSearchBar v-model="searchQuery" />
        <button
          @click="showMobileFilters = !showMobileFilters"
          class="lg:hidden flex items-center justify-center gap-2 px-6 py-3 bg-white/90 backdrop-blur-sm rounded-full border border-[#a74792]/20 shadow-sm active:scale-95"
        >
          <i class="mdi mdi-filter-variant text-[#a74792]"></i>
          <span>Filtros</span>
          <i :class="['mdi', showMobileFilters ? 'mdi-chevron-up' : 'mdi-chevron-down', 'text-[#a74792]']"></i>
        </button>
      </div>

      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Panel de filtros -->
        <AdminFilters
          :filters="filters"
          :mobile="showMobileFilters"
          :categories="categories"
          :available-brands="availableBrands"
          @apply-filters="updateFilters"
          @reset-filters="resetFilters"
        />

        <!-- Listado de productos -->
        <main class="lg:w-3/4">
          <!-- Cabecera con resultados, orden y paginación -->
          <div class="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <p class="text-[#2D1E3E] opacity-70 text-sm">
              {{ paginatedProducts.length }} productos mostrados ({{ filteredProducts.length }} total)
            </p>
            <div class="flex items-center gap-4">
              <!-- Selector de orden -->
              <div class="relative w-full sm:w-auto">
                <select
                  v-model="sortBy"
                  class="appearance-none w-full sm:w-48 px-4 py-3 pr-10 border border-[#a74792]/20 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#a74792] bg-white"
                >
                  <option value="">Ordenar por</option>
                  <option value="nameAsc">Nombre A-Z</option>
                  <option value="nameDesc">Nombre Z-A</option>
                  <option value="priceAsc">Precio menor a mayor</option>
                  <option value="priceDesc">Precio mayor a menor</option>
                </select>
                <i class="mdi mdi-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>
              </div>
              <!-- Paginación simple -->
              <div class="flex items-center gap-2 text-sm">
                <button
                  @click="prevPage"
                  :disabled="currentPage === 1"
                  class="p-2 rounded-full bg-white/80 border border-[#a74792]/20 disabled:opacity-30"
                >
                  <i class="mdi mdi-chevron-left"></i>
                </button>
                <span class="text-[#2D1E3E]">Pág. {{ currentPage }} de {{ totalPages }}</span>
                <button
                  @click="nextPage"
                  :disabled="currentPage === totalPages || totalPages === 0"
                  class="p-2 rounded-full bg-white/80 border border-[#a74792]/20 disabled:opacity-30"
                >
                  <i class="mdi mdi-chevron-right"></i>
                </button>
              </div>
            </div>
          </div>

          <!-- Tabla escritorio -->
          <AdminProductTable
            :products="paginatedProducts"
            @edit="editProduct"
            @toggle-visibility="toggleVisibility"
            @mark-sold="openMarkSoldModal"
            @delete="openDeleteModal"
          />

          <!-- Tarjetas móvil -->
          <AdminProductCards
            :products="paginatedProducts"
            @edit="editProduct"
            @toggle-visibility="toggleVisibility"
            @mark-sold="openMarkSoldModal"
            @delete="openDeleteModal"
            class="lg:hidden"
          />
        </main>
      </div>
    </div>

    <!-- Onda inferior -->
    <BottomWave />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '@/stores/productStore'
import { storeToRefs } from 'pinia'

// Componentes UI
import AnimatedBackground from '@/components/ui/AnimatedBackground.vue'
import BottomWave from '@/components/ui/BottomWave.vue'

// Componentes admin
import AdminHeader from '@/components/admin/AdminHeader.vue'
import AdminSearchBar from '@/components/admin/AdminSearchBar.vue'
import AdminFilters from '@/components/admin/AdminFilters.vue'
import AdminProductTable from '@/components/admin/AdminProductTable.vue'
import AdminProductCards from '@/components/admin/AdminProductCards.vue'
import AdminDeleteModal from '@/components/admin/AdminDeleteModal.vue'

const router = useRouter()
const productStore = useProductStore()
const { products: storeProducts } = storeToRefs(productStore)

// Estado local de productos (con campos visibles/sold)
const products = ref([])

// Inicializar productos
onMounted(() => {
  products.value = storeProducts.value.map(p => ({
    ...p,
    visible: true,
    sold: false
  }))
})

// Filtros y orden
const searchQuery = ref('')
const filters = ref({
  categories: [],
  conditions: [],
  sizes: [],
  brand: '',
  minPrice: null,
  maxPrice: null,
  visibility: 'all',
  sold: 'all'
})
const sortBy = ref('')
const showMobileFilters = ref(false)

// Paginación
const currentPage = ref(1)
const pageSize = ref(10) // productos por página

// Modal
const modal = ref({ show: false, title: '', message: '', onConfirm: null })

// Computed para categorías y marcas disponibles
const categories = computed(() => {
  const cats = products.value.map(p => p.category).filter(Boolean)
  return [...new Set(cats)]
})

const availableBrands = computed(() => {
  let filtered = products.value
  if (filters.value.categories.length) {
    filtered = filtered.filter(p => filters.value.categories.includes(p.category))
  }
  const brands = filtered.map(p => p.brand).filter(Boolean)
  return [...new Set(brands)]
})

// Productos filtrados (misma lógica que antes)
const filteredProducts = computed(() => {
  let result = products.value

  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(p => p.name.toLowerCase().includes(q))
  }

  if (filters.value.categories.length) {
    result = result.filter(p => filters.value.categories.includes(p.category))
  }

  if (filters.value.conditions.length) {
    result = result.filter(p => filters.value.conditions.includes(p.condition))
  }

  if (filters.value.sizes.length) {
    result = result.filter(p => {
      if (p.size) return filters.value.sizes.includes(p.size)
      if (p.sizes) return p.sizes.some(s => filters.value.sizes.includes(s.toString()))
      return false
    })
  }

  if (filters.value.brand) {
    result = result.filter(p => p.brand === filters.value.brand)
  }

  if (filters.value.minPrice !== null) {
    result = result.filter(p => p.price >= filters.value.minPrice)
  }
  if (filters.value.maxPrice !== null) {
    result = result.filter(p => p.price <= filters.value.maxPrice)
  }

  if (filters.value.visibility === 'visible') {
    result = result.filter(p => p.visible)
  } else if (filters.value.visibility === 'hidden') {
    result = result.filter(p => !p.visible)
  }

  if (filters.value.sold === 'available') {
    result = result.filter(p => !p.sold)
  } else if (filters.value.sold === 'sold') {
    result = result.filter(p => p.sold)
  }

  // Ordenamiento
  if (sortBy.value === 'nameAsc') {
    result = [...result].sort((a, b) => a.name.localeCompare(b.name))
  } else if (sortBy.value === 'nameDesc') {
    result = [...result].sort((a, b) => b.name.localeCompare(a.name))
  } else if (sortBy.value === 'priceAsc') {
    result = [...result].sort((a, b) => a.price - b.price)
  } else if (sortBy.value === 'priceDesc') {
    result = [...result].sort((a, b) => b.price - a.price)
  }

  return result
})

// Productos paginados
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filteredProducts.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filteredProducts.value.length / pageSize.value)
})

// Cambiar página
const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}
const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}

// Acciones
const goToNewProduct = () => router.push({ name: 'product-new' })
const editProduct = (id) => router.push({ name: 'product-edit', params: { id } })

const toggleVisibility = (id) => {
  const prod = products.value.find(p => p.id === id)
  if (prod) prod.visible = !prod.visible
}

const openMarkSoldModal = (id) => {
  const prod = products.value.find(p => p.id === id)
  if (!prod || prod.sold) return
  modal.value = {
    show: true,
    title: 'Marcar como vendido',
    message: '¿Estás seguro de marcar este producto como vendido?',
    onConfirm: () => {
      prod.sold = true
      closeModal()
    }
  }
}

const openDeleteModal = (id) => {
  modal.value = {
    show: true,
    title: 'Eliminar producto',
    message: '¿Estás seguro de eliminar este producto? Esta acción no se puede deshacer.',
    onConfirm: () => {
      products.value = products.value.filter(p => p.id !== id)
      // También deberías eliminar del store si es necesario
      closeModal()
    }
  }
}

const closeModal = () => {
  modal.value.show = false
  modal.value.onConfirm = null
}

// Actualizar filtros
const updateFilters = (newFilters) => {
  filters.value = newFilters
  currentPage.value = 1 // volver a primera página al filtrar
  showMobileFilters.value = false
}

const resetFilters = () => {
  filters.value = {
    categories: [],
    conditions: [],
    sizes: [],
    brand: '',
    minPrice: null,
    maxPrice: null,
    visibility: 'all',
    sold: 'all'
  }
  sortBy.value = ''
  currentPage.value = 1
  showMobileFilters.value = false
}
</script>

<style scoped>
/* Estas clases deben estar globales, pero las dejamos aquí para que funcionen */
.bg-accent { background-color: #FFb8d1; }
.bg-highlight { background-color: #E7CEE3; }
.bg-warning { background-color: #f25081; }
.bg-neutral { background-color: #E9D5FF; }
.bg-nude { background-color: #E4B4C2; }
</style>