<template>
    <aside v-show="mobile ? showMobile : true" :class="[
        'bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-[#a74792]/20 shadow-lg h-fit transition-all duration-300',
        mobile ? 'block' : 'lg:w-1/4'
    ]">
        <h2 class="text-xl font-bold text-[#2D1E3E] mb-4 flex items-center gap-2">
            <i class="mdi mdi-filter-outline text-[#a74792]"></i> Filtros
        </h2>

        <!-- Categoría -->
        <div class="mb-5">
            <h3 class="font-semibold text-[#2D1E3E] mb-2 flex items-center gap-1">
                <i class="mdi mdi-tag-outline text-[#a74792]"></i> Categoría
            </h3>
            <div class="space-y-2">
                <label v-for="cat in categories" :key="cat" class="flex items-center gap-2 cursor-pointer text-sm">
                    <input type="checkbox" :value="cat" v-model="localCategories"
                        class="rounded border-[#a74792]/30 text-[#a74792] focus:ring-[#a74792]/20" />
                    <span class="text-[#2D1E3E]">{{ cat }}</span>
                </label>
            </div>
        </div>

        <!-- Condición -->
        <div class="mb-5">
            <h3 class="font-semibold text-[#2D1E3E] mb-2 flex items-center gap-1">
                <i class="mdi mdi-check-circle-outline text-[#a74792]"></i> Condición
            </h3>
            <div class="space-y-2">
                <label v-for="cond in conditionOptions" :key="cond.value"
                    class="flex items-center gap-2 cursor-pointer text-sm">
                    <input type="checkbox" :value="cond.value" v-model="localConditions"
                        class="rounded border-[#a74792]/30 text-[#a74792] focus:ring-[#a74792]/20" />
                    <span class="text-[#2D1E3E]">{{ cond.label }}</span>
                </label>
            </div>
        </div>

        <!-- Talle (si corresponde) -->
        <div v-if="showSizeFilter" class="mb-5">
            <h3 class="font-semibold text-[#2D1E3E] mb-2 flex items-center gap-1">
                <i class="mdi mdi-human-male-height text-[#a74792]"></i> Talle
            </h3>
            <div class="flex flex-wrap gap-2">
                <button v-for="size in availableSizes" :key="size" @click="toggleSize(size)" :class="[
                    'px-3 py-1.5 rounded-full text-sm font-medium transition-all border active:scale-90',
                    localSizes.includes(size) ? 'bg-[#a74792] text-white border-[#a74792]' : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
                ]">
                    {{ size }}
                </button>
            </div>
        </div>

        <!-- Marca -->
        <div class="mb-5">
            <h3 class="font-semibold text-[#2D1E3E] mb-2 flex items-center gap-1">
                <i class="mdi mdi-store-outline text-[#a74792]"></i> Marca
            </h3>
            <select v-model="localBrand"
                class="w-full px-3 py-2 border border-[#a74792]/20 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#a74792] bg-white">
                <option value="">Todas las marcas</option>
                <option v-for="brand in availableBrands" :key="brand" :value="brand">{{ brand }}</option>
            </select>
        </div>

        <!-- Precio -->
        <div class="mb-5">
            <h3 class="font-semibold text-[#2D1E3E] mb-2 flex items-center gap-1">
                <i class="mdi mdi-currency-usd text-[#a74792]"></i> Precio
            </h3>
            <div class="flex items-center gap-2">
                <input type="number" v-model.number="localMinPrice" placeholder="Mín"
                    class="w-full px-3 py-2 border border-[#a74792]/20 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#a74792]" />
                <span class="text-gray-500">-</span>
                <input type="number" v-model.number="localMaxPrice" placeholder="Máx"
                    class="w-full px-3 py-2 border border-[#a74792]/20 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#a74792]" />
            </div>
        </div>

        <!-- Visibilidad -->
        <div class="mb-5">
            <h3 class="font-semibold text-[#2D1E3E] mb-2 flex items-center gap-1">
                <i class="mdi mdi-eye-outline text-[#a74792]"></i> Visibilidad
            </h3>
            <div class="space-y-2">
                <label class="flex items-center gap-2 cursor-pointer text-sm">
                    <input type="radio" value="all" v-model="localVisibility" class="text-[#a74792]" /> Todos
                </label>
                <label class="flex items-center gap-2 cursor-pointer text-sm">
                    <input type="radio" value="visible" v-model="localVisibility" class="text-[#a74792]" /> Visibles al
                    público
                </label>
                <label class="flex items-center gap-2 cursor-pointer text-sm">
                    <input type="radio" value="hidden" v-model="localVisibility" class="text-[#a74792]" /> Ocultos
                </label>
            </div>
        </div>

        <!-- Estado (vendido/disponible) -->
        <div class="mb-5">
            <h3 class="font-semibold text-[#2D1E3E] mb-2 flex items-center gap-1">
                <i class="mdi mdi-sale-outline text-[#a74792]"></i> Estado
            </h3>
            <div class="space-y-2">
                <label class="flex items-center gap-2 cursor-pointer text-sm">
                    <input type="radio" value="all" v-model="localSold" class="text-[#a74792]" /> Todos
                </label>
                <label class="flex items-center gap-2 cursor-pointer text-sm">
                    <input type="radio" value="available" v-model="localSold" class="text-[#a74792]" /> Disponibles
                </label>
                <label class="flex items-center gap-2 cursor-pointer text-sm">
                    <input type="radio" value="sold" v-model="localSold" class="text-[#a74792]" /> Vendidos
                </label>
            </div>
        </div>

        <!-- Botones -->
        <div class="flex gap-2 mt-4">
            <button @click="resetLocal"
                class="flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium active:scale-95">
                Limpiar
            </button>
            <button @click="applyLocal"
                class="flex-1 px-3 py-2 bg-gradient-to-r from-[#a74792] to-[#d973b8] text-white rounded-lg hover:from-[#d973b8] hover:to-[#a74792] transition-colors text-sm font-medium active:scale-95">
                Aplicar
            </button>
        </div>
    </aside>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
    filters: Object,
    mobile: Boolean,
    categories: Array,         // <-- nuevo
    availableBrands: Array     // <-- nuevo
})
const emit = defineEmits(['apply-filters', 'reset-filters'])

// Estado local copia de props.filters
const localCategories = ref([...props.filters.categories])
const localConditions = ref([...props.filters.conditions])
const localSizes = ref([...props.filters.sizes])
const localBrand = ref(props.filters.brand)
const localMinPrice = ref(props.filters.minPrice)
const localMaxPrice = ref(props.filters.maxPrice)
const localVisibility = ref(props.filters.visibility)
const localSold = ref(props.filters.sold)

// Actualizar si cambian los filtros desde afuera (ej. reset)
watch(() => props.filters, (newVal) => {
    localCategories.value = [...newVal.categories]
    localConditions.value = [...newVal.conditions]
    localSizes.value = [...newVal.sizes]
    localBrand.value = newVal.brand
    localMinPrice.value = newVal.minPrice
    localMaxPrice.value = newVal.maxPrice
    localVisibility.value = newVal.visibility
    localSold.value = newVal.sold
}, { deep: true })

// Opciones fijas
const conditionOptions = [
    { value: 'Nuevo', label: 'Nuevo' },
    { value: 'Como nuevo', label: 'Como nuevo' },
    { value: 'Ligeramente usado', label: 'Ligeramente usado' },
    { value: 'Buen estado', label: 'Buen estado' },
    { value: 'Aceptable', label: 'Aceptable' }
]


// Lógica de talles (similar)
const clothingSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
const shoeSizes = Array.from({ length: 11 }, (_, i) => (35 + i).toString())
const showSizeFilter = computed(() => {
    if (localCategories.value.length === 1) {
        const cat = localCategories.value[0]
        return cat === 'Ropa' || cat === 'Calzado'
    }
    return false
})
const availableSizes = computed(() => {
    if (localCategories.value.length === 1) {
        const cat = localCategories.value[0]
        if (cat === 'Ropa') return clothingSizes
        if (cat === 'Calzado') return shoeSizes
    }
    return []
})
const toggleSize = (size) => {
    if (localSizes.value.includes(size)) {
        localSizes.value = localSizes.value.filter(s => s !== size)
    } else {
        localSizes.value.push(size)
    }
}

// Métodos locales
const applyLocal = () => {
    emit('apply-filters', {
        categories: localCategories.value,
        conditions: localConditions.value,
        sizes: localSizes.value,
        brand: localBrand.value,
        minPrice: localMinPrice.value,
        maxPrice: localMaxPrice.value,
        visibility: localVisibility.value,
        sold: localSold.value
    })
}
const resetLocal = () => {
    localCategories.value = []
    localConditions.value = []
    localSizes.value = []
    localBrand.value = ''
    localMinPrice.value = null
    localMaxPrice.value = null
    localVisibility.value = 'all'
    localSold.value = 'all'
    emit('reset-filters')
}
</script>