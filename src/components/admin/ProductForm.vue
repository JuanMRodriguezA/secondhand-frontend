<template>
  <div class="min-h-screen relative overflow-hidden">
    <!-- Fondo animado -->
    <div class="absolute inset-0 z-0 overflow-hidden bg-animated">
      <div class="absolute inset-0 bg-gradient-to-br from-[#fdf2ff] via-[#f8e6ff] to-[#f3d9ff] gradient-animation"></div>
      <div class="absolute inset-0 bg-gradient-to-r from-transparent via-purple-50/40 to-transparent sweep-animation"></div>
      <div class="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-purple-300/10 rounded-full blur-3xl pulse-slow"></div>
      <div class="absolute bottom-1/4 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-pink-300/10 rounded-full blur-3xl pulse-slower"></div>
      <div class="absolute inset-0">
        <div
          v-for="(style, index) in particles"
          :key="index"
          class="absolute rounded-full bg-gradient-to-r from-purple-400/30 to-pink-400/30 particle-float"
          :style="style"
        ></div>
      </div>
      <div class="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/30 to-transparent"></div>
    </div>

    <!-- Overlay de carga/éxito -->
    <transition name="fade">
      <div v-if="showLoadingOverlay" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div class="bg-white rounded-2xl p-8 shadow-2xl flex flex-col items-center">
          <div v-if="isSubmitting" class="animate-spin rounded-full h-12 w-12 border-4 border-[#a74792] border-t-transparent"></div>
          <div v-else-if="showSuccess" class="text-center">
            <div class="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <i class="mdi mdi-check text-white text-3xl"></i>
            </div>
            <p class="text-lg font-semibold text-[#2D1E3E]">{{ successMessage }}</p>
          </div>
        </div>
      </div>
    </transition>

    <div class="relative z-10 container mx-auto px-4 py-8 md:py-12 max-w-4xl">
      <!-- Encabezado con icono -->
      <div class="mb-8 flex items-center gap-3">
        <i class="mdi mdi-package-variant text-5xl text-[#a74792]"></i>
        <div>
          <h1 class="text-3xl md:text-4xl font-bold text-[#2D1E3E] mb-1">
            {{ isEdit ? 'Editar Producto' : 'Nuevo Producto' }}
          </h1>
          <p class="text-[#2D1E3E] opacity-70">
            Completá los datos del producto. Los campos con <span class="text-[#f25081]">*</span> son obligatorios.
          </p>
        </div>
      </div>

      <!-- Formulario con secciones -->
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Tarjeta: Información básica -->
        <div class="bg-white/90 backdrop-blur-sm rounded-2xl border border-[#a74792]/20 shadow-lg p-6 transition-all hover:shadow-xl">
          <h2 class="text-xl font-bold text-[#2D1E3E] mb-4 flex items-center gap-2 border-b border-[#a74792]/10 pb-3">
            <i class="mdi mdi-information-outline text-[#a74792]"></i>
            Información básica
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <!-- Nombre -->
            <div class="col-span-1">
              <label class="block text-sm font-semibold text-[#2D1E3E] mb-1 flex items-center gap-1">
                <i class="mdi mdi-tag text-[#a74792]"></i>
                Nombre <span class="text-[#f25081]">*</span>
              </label>
              <input
                type="text"
                v-model="form.name"
                required
                class="w-full px-4 py-3 border border-[#a74792]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#a74792]/50 focus:border-transparent transition-all"
                :class="{ 'border-[#f25081] ring-1 ring-[#f25081]/20': !form.name && showValidation }"
              />
            </div>

            <!-- Marca -->
            <div class="col-span-1">
              <label class="block text-sm font-semibold text-[#2D1E3E] mb-1 flex items-center gap-1">
                <i class="mdi mdi-store text-[#a74792]"></i>
                Marca <span class="text-[#f25081]">*</span>
              </label>
              <div class="flex gap-2">
                <div class="relative flex-1">
                  <select
                    v-model="form.brand"
                    required
                    class="w-full px-4 py-3 border border-[#a74792]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#a74792]/50 appearance-none bg-white"
                  >
                    <option value="" disabled>Seleccionar marca</option>
                    <option v-for="brand in brands" :key="brand" :value="brand">{{ brand }}</option>
                    <option value="__new__">+ Crear nueva marca</option>
                  </select>
                  <i class="mdi mdi-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-[#a74792] pointer-events-none"></i>
                </div>
                <button
                  v-if="form.brand === '__new__'"
                  type="button"
                  @click="showNewBrandInput = true"
                  class="px-4 py-3 bg-[#a74792] text-white rounded-xl hover:bg-[#d973b8] transition-colors"
                >
                  <i class="mdi mdi-plus"></i>
                </button>
              </div>
              <transition name="fade">
                <div v-if="showNewBrandInput" class="mt-2 flex gap-2">
                  <input
                    type="text"
                    v-model="newBrand"
                    placeholder="Nueva marca"
                    class="flex-1 px-4 py-2 border border-[#a74792]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#a74792]/50"
                  />
                  <button
                    type="button"
                    @click="addNewBrand"
                    class="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
                    title="Confirmar"
                  >
                    <i class="mdi mdi-check"></i>
                  </button>
                  <button
                    type="button"
                    @click="cancelNewBrand"
                    class="px-4 py-2 bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-400 transition-colors"
                    title="Cancelar"
                  >
                    <i class="mdi mdi-close"></i>
                  </button>
                </div>
              </transition>
            </div>

            <!-- Precio -->
            <div class="col-span-1">
              <label class="block text-sm font-semibold text-[#2D1E3E] mb-1 flex items-center gap-1">
                <i class="mdi mdi-currency-usd text-[#a74792]"></i>
                Precio ($) <span class="text-[#f25081]">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                v-model.number="form.price"
                required
                class="w-full px-4 py-3 border border-[#a74792]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#a74792]/50 transition-all"
              />
            </div>

            <!-- Condición -->
            <div class="col-span-1">
              <label class="block text-sm font-semibold text-[#2D1E3E] mb-1 flex items-center gap-1">
                <i class="mdi mdi-check-circle-outline text-[#a74792]"></i>
                Condición <span class="text-[#f25081]">*</span>
              </label>
              <div class="relative">
                <select
                  v-model="form.condition"
                  required
                  class="w-full px-4 py-3 border border-[#a74792]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#a74792]/50 appearance-none bg-white"
                >
                  <option value="" disabled>Seleccionar</option>
                  <option value="Nuevo">Nuevo</option>
                  <option value="Como nuevo">Como nuevo</option>
                  <option value="Ligeramente usado">Ligeramente usado</option>
                  <option value="Buen estado">Buen estado</option>
                  <option value="Aceptable">Aceptable</option>
                </select>
                <i class="mdi mdi-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-[#a74792] pointer-events-none"></i>
              </div>
            </div>
          </div>
        </div>

        <!-- Tarjeta: Categoría y talles -->
        <div class="bg-white/90 backdrop-blur-sm rounded-2xl border border-[#a74792]/20 shadow-lg p-6 transition-all hover:shadow-xl">
          <h2 class="text-xl font-bold text-[#2D1E3E] mb-4 flex items-center gap-2 border-b border-[#a74792]/10 pb-3">
            <i class="mdi mdi-shape-outline text-[#a74792]"></i>
            Categoría y talles
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <!-- Categoría -->
            <div>
              <label class="block text-sm font-semibold text-[#2D1E3E] mb-1 flex items-center gap-1">
                <i class="mdi mdi-tag-outline text-[#a74792]"></i>
                Categoría <span class="text-[#f25081]">*</span>
              </label>
              <div class="relative">
                <select
                  v-model="form.category"
                  required
                  @change="handleCategoryChange"
                  class="w-full px-4 py-3 border border-[#a74792]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#a74792]/50 appearance-none bg-white"
                >
                  <option value="" disabled>Seleccionar</option>
                  <option value="Ropa">Ropa</option>
                  <option value="Calzado">Calzado</option>
                  <option value="Accesorios">Accesorios</option>
                </select>
                <i class="mdi mdi-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-[#a74792] pointer-events-none"></i>
              </div>
            </div>

            <!-- Talles (dinámico) -->
            <div v-if="showSizes">
              <label class="block text-sm font-semibold text-[#2D1E3E] mb-2 flex items-center gap-1">
                <i class="mdi mdi-human-male-height text-[#a74792]"></i>
                Talles disponibles <span class="text-[#f25081]">*</span>
              </label>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="size in sizeOptions"
                  :key="size"
                  type="button"
                  @click="toggleSize(size)"
                  :class="[
                    'px-4 py-2 rounded-xl text-sm font-medium transition-all border',
                    selectedSizes.includes(size)
                      ? 'bg-[#a74792] text-white border-[#a74792] shadow-md'
                      : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200 hover:border-gray-300'
                  ]"
                >
                  {{ size }}
                </button>
              </div>
              <p v-if="selectedSizes.length === 0 && form.category && showValidation" class="text-xs text-[#f25081] mt-1 flex items-center gap-1">
                <i class="mdi mdi-alert-circle"></i> Seleccioná al menos un talle
              </p>
            </div>
          </div>
        </div>

        <!-- Tarjeta: Descripción -->
        <div class="bg-white/90 backdrop-blur-sm rounded-2xl border border-[#a74792]/20 shadow-lg p-6 transition-all hover:shadow-xl">
          <h2 class="text-xl font-bold text-[#2D1E3E] mb-4 flex items-center gap-2 border-b border-[#a74792]/10 pb-3">
            <i class="mdi mdi-text-box-outline text-[#a74792]"></i>
            Descripción
          </h2>
          <label class="block text-sm font-semibold text-[#2D1E3E] mb-1 flex items-center gap-1">
            <i class="mdi mdi-text-box text-[#a74792]"></i>
            Descripción <span class="text-[#f25081]">*</span>
          </label>
          <textarea
            v-model="form.description"
            required
            rows="5"
            class="w-full px-4 py-3 border border-[#a74792]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#a74792]/50 transition-all resize-none"
            placeholder="Describí el producto, sus características, estado, etc."
          ></textarea>
        </div>

        <!-- Tarjeta: Imágenes -->
        <div class="bg-white/90 backdrop-blur-sm rounded-2xl border border-[#a74792]/20 shadow-lg p-6 transition-all hover:shadow-xl">
          <h2 class="text-xl font-bold text-[#2D1E3E] mb-4 flex items-center gap-2 border-b border-[#a74792]/10 pb-3">
            <i class="mdi mdi-image-multiple text-[#a74792]"></i>
            Imágenes
          </h2>
          <div>
            <input
              type="file"
              ref="fileInput"
              multiple
              accept="image/*"
              @change="handleFileUpload"
              class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#a74792] file:text-white hover:file:bg-[#d973b8] cursor-pointer transition-all"
            />
            <p class="text-xs text-gray-500 mt-1 flex items-center gap-1">
              <i class="mdi mdi-information-outline"></i>
              Podés seleccionar varias imágenes. La primera será la principal.
              <span class="hidden md:inline">Arrastrá para reordenar.</span>
              <span class="md:hidden">Tocá una imagen para hacerla principal.</span>
            </p>

            <!-- Previsualización -->
            <div
              v-if="imagePreviews.length"
              class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 mt-4"
              @dragover.prevent
              @drop.prevent="handleDrop"
            >
              <div
                v-for="(img, idx) in imagePreviews"
                :key="idx"
                class="relative group aspect-square rounded-xl overflow-hidden border-2 transition-all hover:shadow-lg"
                :class="[
                  idx === 0 ? 'border-[#a74792] ring-2 ring-[#a74792]/30' : 'border-gray-200',
                  { 'cursor-grab active:cursor-grabbing': !isMobile, 'cursor-pointer': isMobile }
                ]"
                :draggable="!isMobile"
                @dragstart="!isMobile && handleDragStart(idx)"
                @dragend="!isMobile && handleDragEnd"
                @dragover.prevent
                @drop.prevent="!isMobile && handleDropOn(idx)"
                @click="isMobile && setAsMain(idx)"
              >
                <img :src="img" class="w-full h-full object-cover" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-2">
                  <button
                    type="button"
                    @click.stop="removeImage(idx)"
                    class="p-1.5 bg-white rounded-full text-red-600 hover:bg-red-50 shadow-lg transform transition-transform hover:scale-110"
                    title="Eliminar imagen"
                  >
                    <i class="mdi mdi-delete text-sm"></i>
                  </button>
                  <span class="text-white text-xs bg-black/50 px-2 py-1 rounded-full">
                    {{ !isMobile ? 'Arrastrar' : 'Tocar principal' }}
                  </span>
                </div>
                <div v-if="idx === 0" class="absolute top-1 left-1 bg-[#a74792] text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md">
                  <i class="mdi mdi-crown text-xs"></i> Principal
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tarjeta: Opciones administrativas (solo edición) -->
        <div v-if="isEdit" class="bg-white/90 backdrop-blur-sm rounded-2xl border border-[#a74792]/20 shadow-lg p-6 transition-all hover:shadow-xl">
          <h2 class="text-xl font-bold text-[#2D1E3E] mb-4 flex items-center gap-2 border-b border-[#a74792]/10 pb-3">
            <i class="mdi mdi-cog-outline text-[#a74792]"></i>
            Administración
          </h2>
          <div class="flex flex-wrap gap-6">
            <label class="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" v-model="form.visible" class="rounded text-[#a74792] focus:ring-[#a74792]/20 w-5 h-5" />
              <span class="text-sm text-[#2D1E3E] group-hover:text-[#a74792] transition-colors">Visible al público</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" v-model="form.sold" class="rounded text-[#a74792] focus:ring-[#a74792]/20 w-5 h-5" />
              <span class="text-sm text-[#2D1E3E] group-hover:text-[#a74792] transition-colors">Marcar como vendido</span>
            </label>
          </div>
        </div>

        <!-- Botones de acción -->
        <div class="flex flex-col sm:flex-row gap-3 justify-end pt-4">
          <button
            type="button"
            @click="cancel"
            class="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
          >
            <i class="mdi mdi-close"></i> Cancelar
          </button>
          <button
            type="submit"
            :disabled="isSubmitting || (isEdit && !hasChanges)"
            class="px-6 py-3 bg-gradient-to-r from-[#a74792] to-[#d973b8] text-white rounded-xl hover:from-[#d973b8] hover:to-[#a74792] transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <i :class="['mdi', isEdit ? 'mdi-pencil' : 'mdi-plus']"></i>
            {{ isSubmitting ? 'Guardando...' : (isEdit ? 'Actualizar' : 'Crear Producto') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useProductStore } from '@/stores/productStore'

const router = useRouter()
const route = useRoute()
const productStore = useProductStore()

const isEdit = computed(() => route.name === 'product-edit')
const productId = computed(() => route.params.id)

// Detectar móvil
const isMobile = ref(window.innerWidth < 768)
const handleResize = () => {
  isMobile.value = window.innerWidth < 768
}
onMounted(() => {
  window.addEventListener('resize', handleResize)
})
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

// Partículas para el fondo
const particles = ref([])
function generateParticles() {
  const temp = []
  for (let i = 0; i < 15; i++) {
    const size = Math.random() * 4 + 1
    const top = Math.random() * 100
    const left = Math.random() * 100
    const delay = Math.random() * 15
    const duration = Math.random() * 20 + 20
    temp.push({
      width: `${size}px`,
      height: `${size}px`,
      top: `${top}%`,
      left: `${left}%`,
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
    })
  }
  particles.value = temp
}
generateParticles()

// Estado del formulario
const form = ref({
  name: '',
  brand: '',
  price: null,
  condition: '',
  category: '',
  description: '',
  image: '',
  images: [],
  visible: true,
  sold: false,
})

const originalForm = ref(null)
const selectedSizes = ref([])
const imagePreviews = ref([])
const fileInput = ref(null)
const isSubmitting = ref(false)
const showSuccess = ref(false)
const showLoadingOverlay = ref(false)
const successMessage = ref('')
const showValidation = ref(false)

// Marcas
const brands = computed(() => productStore.getAllBrands)
const showNewBrandInput = ref(false)
const newBrand = ref('')

// Opciones de talles
const clothingSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
const shoeSizes = Array.from({ length: 11 }, (_, i) => (35 + i).toString())

const showSizes = computed(() => form.value.category === 'Ropa' || form.value.category === 'Calzado')
const sizeOptions = computed(() => {
  if (form.value.category === 'Ropa') return clothingSizes
  if (form.value.category === 'Calzado') return shoeSizes
  return []
})

// Detección de cambios
const hasChanges = computed(() => {
  if (!isEdit.value || !originalForm.value) return true
  if (form.value.name !== originalForm.value.name) return true
  if (form.value.brand !== originalForm.value.brand) return true
  if (form.value.price !== originalForm.value.price) return true
  if (form.value.condition !== originalForm.value.condition) return true
  if (form.value.category !== originalForm.value.category) return true
  if (form.value.description !== originalForm.value.description) return true
  if (form.value.visible !== originalForm.value.visible) return true
  if (form.value.sold !== originalForm.value.sold) return true
  if (JSON.stringify(selectedSizes.value) !== JSON.stringify(originalForm.value.sizes)) return true
  if (JSON.stringify(imagePreviews.value) !== JSON.stringify(originalForm.value.images)) return true
  return false
})

// Cargar datos si es edición
onMounted(() => {
  if (isEdit.value && productId.value) {
    const product = productStore.getProductById(parseInt(productId.value))
    if (product) {
      form.value = { ...product, visible: true, sold: false }
      if (product.sizes) {
        selectedSizes.value = product.sizes.map(s => s.toString())
      } else if (product.size) {
        selectedSizes.value = [product.size]
      }
      if (product.images && product.images.length) {
        imagePreviews.value = product.images
      } else if (product.image) {
        imagePreviews.value = [product.image]
      }
      // Guardar copia original
      originalForm.value = {
        ...form.value,
        sizes: [...selectedSizes.value],
        images: [...imagePreviews.value]
      }
    } else {
      router.push({ name: 'products-admin' })
    }
  }
})

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

const handleFileUpload = (event) => {
  const files = Array.from(event.target.files)
  files.forEach(file => {
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreviews.value.push(e.target.result)
    }
    reader.readAsDataURL(file)
  })
}

const removeImage = (index) => {
  if (confirm('¿Eliminar esta imagen?')) {
    imagePreviews.value.splice(index, 1)
  }
}

// Drag & drop
let dragIndex = null
const handleDragStart = (index) => { dragIndex = index }
const handleDragEnd = () => { dragIndex = null }
const handleDropOn = (targetIndex) => {
  if (dragIndex === null || dragIndex === targetIndex) return
  const newPreviews = [...imagePreviews.value]
  const [moved] = newPreviews.splice(dragIndex, 1)
  newPreviews.splice(targetIndex, 0, moved)
  imagePreviews.value = newPreviews
  dragIndex = null
}
const handleDrop = () => {}
const setAsMain = (index) => {
  if (index === 0) return
  const newPreviews = [...imagePreviews.value]
  const [selected] = newPreviews.splice(index, 1)
  newPreviews.unshift(selected)
  imagePreviews.value = newPreviews
}

// Marcas
const addNewBrand = () => {
  if (newBrand.value.trim()) {
    productStore.addBrand(newBrand.value.trim())
    form.value.brand = newBrand.value.trim()
    showNewBrandInput.value = false
    newBrand.value = ''
  }
}
const cancelNewBrand = () => {
  showNewBrandInput.value = false
  newBrand.value = ''
  if (form.value.brand === '__new__') form.value.brand = ''
}

// Submit
const handleSubmit = async () => {
  showValidation.value = true

  // Validaciones
  if (showSizes.value && selectedSizes.value.length === 0) {
    alert('Debés seleccionar al menos un talle')
    return
  }
  if (!form.value.brand || form.value.brand === '__new__') {
    alert('Debés seleccionar o crear una marca')
    return
  }
  if (imagePreviews.value.length === 0) {
    alert('Debés subir al menos una imagen')
    return
  }

  isSubmitting.value = true
  showLoadingOverlay.value = true

  const productData = {
    name: form.value.name,
    brand: form.value.brand,
    price: parseFloat(form.value.price),
    condition: form.value.condition,
    category: form.value.category,
    description: form.value.description,
    images: imagePreviews.value,
    image: imagePreviews.value[0] || 'https://via.placeholder.com/300',
    featured: false,
    visible: form.value.visible,
    sold: form.value.sold,
  }

  if (showSizes.value) {
    productData.sizes = selectedSizes.value.map(s => isNaN(s) ? s : parseInt(s))
  } else {
    productData.size = null
  }

  setTimeout(() => {
    try {
      if (isEdit.value) {
        productStore.updateProduct(parseInt(productId.value), productData)
        successMessage.value = 'Producto actualizado con éxito'
      } else {
        productStore.addProduct(productData)
        successMessage.value = 'Producto creado con éxito'
      }
      showSuccess.value = true
      isSubmitting.value = false
      setTimeout(() => {
        showLoadingOverlay.value = false
        router.push({ name: 'products-admin' })
      }, 1500)
    } catch (error) {
      console.error(error)
      alert('Ocurrió un error al guardar el producto')
      showLoadingOverlay.value = false
      isSubmitting.value = false
    }
  }, 800)
}

const cancel = () => {
  router.push({ name: 'products-admin' })
}
</script>

<style scoped>
/* Animaciones de fondo */
.bg-animated {
  animation: gradientBackground 20s ease infinite;
  background-size: 200% 200%;
}
.gradient-animation {
  background-size: 400% 400%;
  animation: gradientMove 20s ease infinite;
}
.sweep-animation {
  background-size: 200% 200%;
  animation: lightSweep 15s ease-in-out infinite;
}
.pulse-slow {
  animation: pulseEffect 8s ease-in-out infinite;
}
.pulse-slower {
  animation: pulseEffect 12s ease-in-out infinite;
}
.particle-float {
  animation: floatParticle 25s ease-in-out infinite;
}
@keyframes gradientBackground {
  0% { background-position: 0% 0%; }
  50% { background-position: 100% 100%; }
  100% { background-position: 0% 0%; }
}
@keyframes gradientMove {
  0% { background-position: 0% 50%; }
  25% { background-position: 50% 100%; }
  50% { background-position: 100% 50%; }
  75% { background-position: 50% 0%; }
  100% { background-position: 0% 50%; }
}
@keyframes lightSweep {
  0% { background-position: -100% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: -100% 50%; }
}
@keyframes pulseEffect {
  0%,100% { opacity: 0.1; transform: scale(1); }
  50% { opacity: 0.3; transform: scale(1.1); }
}
@keyframes floatParticle {
  0% { transform: translate(0,0) rotate(0deg); opacity:0.3; }
  25% { transform: translate(50px,-30px) rotate(90deg); opacity:0.5; }
  50% { transform: translate(20px,-60px) rotate(180deg); opacity:0.2; }
  75% { transform: translate(-30px,-30px) rotate(270deg); opacity:0.4; }
  100% { transform: translate(0,0) rotate(360deg); opacity:0.3; }
}

/* Transiciones */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.cursor-grab {
  cursor: grab;
}
.cursor-grab:active {
  cursor: grabbing;
}
</style>