<template>
  <div class="min-h-screen relative">
    <!-- Fondo animado -->
    <AnimatedBackground />

    <!-- Modal de confirmación para eliminar -->
    <AdminDeleteModal
      :show="deleteModal.show"
      :title="deleteModal.title"
      :message="deleteModal.message"
      @confirm="confirmDelete"
      @cancel="closeDeleteModal"
    />

    <!-- Modal para crear/editar punto -->
    <Teleport to="body">
      <div v-if="formModal.show" class="fixed inset-0 z-50 flex items-center justify-center p-4" @click.self="closeFormModal">
        <div class="absolute inset-0 bg-black/30 backdrop-blur-sm" @click="closeFormModal"></div>
        <div class="relative bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl max-w-md w-full p-6 border border-[#a74792]/20 transform transition-all duration-300 scale-100 opacity-100">
          <h3 class="text-xl font-bold text-[#2D1E3E] mb-4 flex items-center gap-2">
            <i class="mdi mdi-map-marker text-[#a74792]"></i>
            {{ formModal.isEdit ? 'Editar punto' : 'Nuevo punto de entrega' }}
          </h3>
          <form @submit.prevent="savePoint">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-[#2D1E3E] mb-1">Zona</label>
                <input
                  v-model="form.zone"
                  type="text"
                  required
                  class="w-full px-4 py-2 border border-[#a74792]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a74792]/50"
                  placeholder="Ej: Centro"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-[#2D1E3E] mb-1">Ubicación</label>
                <input
                  v-model="form.location"
                  type="text"
                  required
                  class="w-full px-4 py-2 border border-[#a74792]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a74792]/50"
                  placeholder="Ej: Café La Farmacia"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-[#2D1E3E] mb-1">Dirección</label>
                <input
                  v-model="form.address"
                  type="text"
                  required
                  class="w-full px-4 py-2 border border-[#a74792]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a74792]/50"
                  placeholder="Ej: Ciudad Vieja 1234"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-[#2D1E3E] mb-1">Horario</label>
                <input
                  v-model="form.schedule"
                  type="text"
                  required
                  class="w-full px-4 py-2 border border-[#a74792]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a74792]/50"
                  placeholder="Ej: Lunes a viernes 10-19"
                />
              </div>
            </div>
            <div class="flex gap-3 justify-end mt-6">
              <button
                type="button"
                @click="closeFormModal"
                class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                class="px-4 py-2 bg-gradient-to-r from-[#a74792] to-[#d973b8] text-white rounded-lg hover:from-[#d973b8] hover:to-[#a74792] transition-colors"
              >
                {{ formModal.isEdit ? 'Actualizar' : 'Crear' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>

    <!-- Contenido principal -->
    <div class="relative z-10 container mx-auto px-4 py-8 md:py-12 max-w-6xl">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 class="text-3xl md:text-4xl font-bold text-[#2D1E3E] mb-1">Puntos de entrega</h1>
          <p class="text-[#2D1E3E] opacity-70">Gestioná los lugares de retiro presencial</p>
        </div>
        <button
          @click="openCreateModal"
          class="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#a74792] to-[#d973b8] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
        >
          <i class="mdi mdi-plus-circle"></i>
          <span>Nuevo punto</span>
        </button>
      </div>

      <!-- Vista escritorio: tabla -->
      <div class="hidden lg:block bg-white/90 backdrop-blur-sm rounded-2xl border border-[#a74792]/20 shadow-lg overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-[#a74792]/5 border-b border-[#a74792]/20">
            <tr>
              <th class="px-4 py-3 text-left font-semibold text-[#2D1E3E]"><i class="mdi mdi-map-marker-outline mr-1"></i>Zona</th>
              <th class="px-4 py-3 text-left font-semibold text-[#2D1E3E]"><i class="mdi mdi-store-outline mr-1"></i>Ubicación</th>
              <th class="px-4 py-3 text-left font-semibold text-[#2D1E3E]"><i class="mdi mdi-map mr-1"></i>Dirección</th>
              <th class="px-4 py-3 text-left font-semibold text-[#2D1E3E]"><i class="mdi mdi-clock-outline mr-1"></i>Horario</th>
              <th class="px-4 py-3 text-left font-semibold text-[#2D1E3E]"><i class="mdi mdi-cog mr-1"></i>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="point in pickupStore.getAllPoints" :key="point.id" class="border-b border-[#a74792]/10 hover:bg-[#a74792]/5">
              <td class="px-4 py-3 font-medium text-[#2D1E3E]">{{ point.zone }}</td>
              <td class="px-4 py-3 text-[#2D1E3E]">{{ point.location }}</td>
              <td class="px-4 py-3 text-[#2D1E3E]">{{ point.address }}</td>
              <td class="px-4 py-3 text-[#2D1E3E]">{{ point.schedule }}</td>
              <td class="px-4 py-3">
                <div class="flex items-center gap-2">
                  <button
                    @click="openEditModal(point)"
                    class="p-2 bg-highlight text-[#2D1E3E] rounded-full hover:opacity-80 transition-all active:scale-90 hover:shadow-md"
                    title="Editar punto"
                  >
                    <i class="mdi mdi-pencil"></i>
                  </button>
                  <button
                    @click="openDeleteModal(point.id)"
                    class="p-2 bg-nude text-[#2D1E3E] rounded-full hover:opacity-80 transition-all active:scale-90 hover:shadow-md"
                    title="Eliminar punto"
                  >
                    <i class="mdi mdi-delete"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Vista móvil: tarjetas -->
      <div class="lg:hidden space-y-4">
        <div
          v-for="point in pickupStore.getAllPoints"
          :key="point.id"
          class="bg-white/90 backdrop-blur-sm rounded-2xl border border-[#a74792]/20 shadow-lg p-4"
        >
          <div class="mb-2">
            <span class="text-xs font-medium bg-highlight text-[#2D1E3E] px-2 py-0.5 rounded-full">{{ point.zone }}</span>
          </div>
          <h3 class="font-semibold text-[#2D1E3E] text-lg">{{ point.location }}</h3>
          <p class="text-sm text-[#2D1E3E] opacity-70 mt-1">{{ point.address }}</p>
          <p class="text-sm text-[#2D1E3E] opacity-70 mt-1">
            <i class="mdi mdi-clock-outline mr-1 text-[#a74792]"></i>{{ point.schedule }}
          </p>
          <div class="flex justify-end gap-3 mt-4 pt-3 border-t border-[#a74792]/10">
            <button @click="openEditModal(point)" class="p-2 bg-highlight text-[#2D1E3E] rounded-full hover:opacity-80 active:scale-90" title="Editar punto">
              <i class="mdi mdi-pencil"></i>
            </button>
            <button @click="openDeleteModal(point.id)" class="p-2 bg-nude text-[#2D1E3E] rounded-full hover:opacity-80 active:scale-90" title="Eliminar punto">
              <i class="mdi mdi-delete"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { usePickupStore } from '@/stores/pickupPoints'
import AnimatedBackground from '@/components/ui/AnimatedBackground.vue'
import AdminDeleteModal from '@/components/admin/AdminDeleteModal.vue'

const pickupStore = usePickupStore()

// Estado del modal de formulario
const formModal = reactive({
  show: false,
  isEdit: false,
  id: null
})

// Formulario reactivo
const form = reactive({
  zone: '',
  location: '',
  address: '',
  schedule: ''
})

// Estado del modal de eliminación
const deleteModal = ref({
  show: false,
  title: '',
  message: '',
  id: null
})

// Abrir modal para crear
const openCreateModal = () => {
  form.zone = ''
  form.location = ''
  form.address = ''
  form.schedule = ''
  formModal.isEdit = false
  formModal.show = true
}

// Abrir modal para editar
const openEditModal = (point) => {
  form.zone = point.zone
  form.location = point.location
  form.address = point.address
  form.schedule = point.schedule
  formModal.isEdit = true
  formModal.id = point.id
  formModal.show = true
}

// Cerrar modal de formulario
const closeFormModal = () => {
  formModal.show = false
}

// Guardar (crear o actualizar)
const savePoint = () => {
  if (formModal.isEdit) {
    // Actualizar
    const index = pickupStore.points.findIndex(p => p.id === formModal.id)
    if (index !== -1) {
      pickupStore.points[index] = {
        id: formModal.id,
        ...form
      }
    }
  } else {
    // Crear nuevo id
    const newId = Math.max(...pickupStore.points.map(p => p.id), 0) + 1
    pickupStore.points.push({
      id: newId,
      ...form
    })
  }
  closeFormModal()
}

// Abrir modal de confirmación para eliminar
const openDeleteModal = (id) => {
  deleteModal.value = {
    show: true,
    title: 'Eliminar punto de entrega',
    message: '¿Estás seguro de eliminar este punto? Esta acción no se puede deshacer.',
    id
  }
}

// Confirmar eliminación
const confirmDelete = () => {
  pickupStore.points = pickupStore.points.filter(p => p.id !== deleteModal.value.id)
  closeDeleteModal()
}

// Cerrar modal de eliminación
const closeDeleteModal = () => {
  deleteModal.value.show = false
  deleteModal.value.id = null
}
</script>

<style scoped>
/* Colores locales por si no están globales */
.bg-highlight { background-color: #E7CEE3; }
.bg-nude { background-color: #E4B4C2; }
</style>