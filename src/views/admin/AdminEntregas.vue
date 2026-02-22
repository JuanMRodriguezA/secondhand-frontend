<template>
  <div class="min-h-screen relative">
    <!-- Fondo animado -->
    <AnimatedBackground />

    <!-- Modal para nueva/editar entrega -->
    <Teleport to="body">
      <div v-if="formModal.show" class="fixed inset-0 z-50 flex items-center justify-center p-4" @click.self="closeFormModal">
        <div class="absolute inset-0 bg-black/30 backdrop-blur-sm" @click="closeFormModal"></div>
        <div class="relative bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl max-w-md w-full p-6 border border-[#a74792]/20 transform transition-all duration-300 scale-100 opacity-100">
          <h3 class="text-xl font-bold text-[#2D1E3E] mb-4 flex items-center gap-2">
            <i class="mdi mdi-calendar-plus text-[#a74792]"></i>
            {{ formModal.isEdit ? 'Editar entrega' : 'Nueva entrega' }}
          </h3>
          <form @submit.prevent="saveDelivery">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-[#2D1E3E] mb-1">Cliente</label>
                <input
                  v-model="form.client"
                  type="text"
                  required
                  class="w-full px-4 py-2 border border-[#a74792]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a74792]/50"
                  placeholder="Nombre del cliente"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-[#2D1E3E] mb-1">Tipo de entrega</label>
                <div class="flex gap-4">
                  <label class="flex items-center gap-2">
                    <input type="radio" v-model="form.type" value="presencial" class="text-[#a74792]" />
                    <span>Presencial</span>
                  </label>
                  <label class="flex items-center gap-2">
                    <input type="radio" v-model="form.type" value="envio" class="text-[#a74792]" />
                    <span>Envío</span>
                  </label>
                </div>
              </div>
              <div v-if="form.type === 'presencial'">
                <label class="block text-sm font-medium text-[#2D1E3E] mb-1">Punto de entrega</label>
                <select
                  v-model="form.pickupPointId"
                  required
                  class="w-full px-4 py-2 border border-[#a74792]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a74792]/50"
                >
                  <option value="" disabled>Seleccionar punto</option>
                  <option v-for="point in pickupStore.getAllPoints" :key="point.id" :value="point.id">
                    {{ point.zone }} - {{ point.location }}
                  </option>
                </select>
              </div>
              <div v-else>
                <label class="block text-sm font-medium text-[#2D1E3E] mb-1">Dirección de envío</label>
                <input
                  v-model="form.address"
                  type="text"
                  required
                  class="w-full px-4 py-2 border border-[#a74792]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a74792]/50"
                  placeholder="Calle, número, ciudad, etc."
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-[#2D1E3E] mb-1">Fecha</label>
                <input
                  v-model="form.date"
                  type="date"
                  required
                  class="w-full px-4 py-2 border border-[#a74792]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a74792]/50"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-[#2D1E3E] mb-1">Hora</label>
                <input
                  v-model="form.time"
                  type="time"
                  required
                  class="w-full px-4 py-2 border border-[#a74792]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a74792]/50"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-[#2D1E3E] mb-1">Observaciones</label>
                <textarea
                  v-model="form.notes"
                  rows="2"
                  class="w-full px-4 py-2 border border-[#a74792]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a74792]/50"
                  placeholder="Ej: Llamar antes de ir"
                ></textarea>
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
                {{ formModal.isEdit ? 'Actualizar' : 'Guardar' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>

    <!-- Modal de confirmación para eliminar -->
    <AdminDeleteModal
      :show="deleteModal.show"
      :title="deleteModal.title"
      :message="deleteModal.message"
      @confirm="confirmDelete"
      @cancel="closeDeleteModal"
    />

    <!-- Contenido principal -->
    <div class="relative z-10 container mx-auto px-4 py-8 md:py-12 max-w-6xl">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 class="text-3xl md:text-4xl font-bold text-[#2D1E3E] mb-1">Gestión de Entregas</h1>
          <p class="text-[#2D1E3E] opacity-70">Agendá y administrá las entregas a clientes</p>
        </div>
        <button
          @click="openCreateModal"
          class="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#a74792] to-[#d973b8] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
        >
          <i class="mdi mdi-plus-circle"></i>
          <span>Nueva entrega</span>
        </button>
      </div>

      <!-- Pestañas: Pendientes / Completadas -->
      <div class="flex gap-2 mb-6 border-b border-[#a74792]/20">
        <button
          v-for="tab in tabs"
          :key="tab.value"
          @click="activeTab = tab.value"
          :class="[
            'px-4 py-2 text-sm font-medium transition-colors relative',
            activeTab === tab.value
              ? 'text-[#a74792] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#a74792]'
              : 'text-[#2D1E3E] opacity-60 hover:opacity-100'
          ]"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- Listado de entregas -->
      <div class="space-y-4">
        <!-- Vista escritorio: tabla -->
        <div class="hidden lg:block bg-white/90 backdrop-blur-sm rounded-2xl border border-[#a74792]/20 shadow-lg overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="bg-[#a74792]/5 border-b border-[#a74792]/20">
              <tr>
                <th class="px-4 py-3 text-left font-semibold text-[#2D1E3E]"><i class="mdi mdi-account mr-1"></i>Cliente</th>
                <th class="px-4 py-3 text-left font-semibold text-[#2D1E3E]"><i class="mdi mdi-tag mr-1"></i>Tipo</th>
                <th class="px-4 py-3 text-left font-semibold text-[#2D1E3E]"><i class="mdi mdi-map-marker mr-1"></i>Lugar</th>
                <th class="px-4 py-3 text-left font-semibold text-[#2D1E3E]"><i class="mdi mdi-calendar mr-1"></i>Fecha</th>
                <th class="px-4 py-3 text-left font-semibold text-[#2D1E3E]"><i class="mdi mdi-clock mr-1"></i>Hora</th>
                <th class="px-4 py-3 text-left font-semibold text-[#2D1E3E]"><i class="mdi mdi-cog mr-1"></i>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="delivery in filteredDeliveries"
                :key="delivery.id"
                class="border-b border-[#a74792]/10 hover:bg-[#a74792]/5"
                :class="{ 'opacity-60': delivery.completed }"
              >
                <td class="px-4 py-3 font-medium text-[#2D1E3E]">{{ delivery.client }}</td>
                <td class="px-4 py-3">
                  <span
                    class="px-2 py-1 rounded-full text-xs font-medium"
                    :class="delivery.type === 'presencial' ? 'bg-highlight text-[#2D1E3E]' : 'bg-neutral text-[#2D1E3E]'"
                  >
                    {{ delivery.type === 'presencial' ? 'Presencial' : 'Envío' }}
                  </span>
                </td>
                <td class="px-4 py-3 text-[#2D1E3E]">
                  {{ delivery.type === 'presencial' ? getPickupPointName(delivery.pickupPointId) : delivery.address }}
                </td>
                <td class="px-4 py-3 text-[#2D1E3E]">{{ formatDate(delivery.date) }}</td>
                <td class="px-4 py-3 text-[#2D1E3E]">{{ delivery.time }}</td>
                <td class="px-4 py-3">
                  <div class="flex items-center gap-2">
                    <button
                      v-if="!delivery.completed"
                      @click="markAsCompleted(delivery.id)"
                      class="p-2 bg-green-100 text-green-700 rounded-full hover:opacity-80 transition-all active:scale-90 hover:shadow-md"
                      title="Marcar como entregada"
                    >
                      <i class="mdi mdi-check"></i>
                    </button>
                    <button
                      @click="openEditModal(delivery)"
                      class="p-2 bg-highlight text-[#2D1E3E] rounded-full hover:opacity-80 transition-all active:scale-90 hover:shadow-md"
                      title="Editar"
                    >
                      <i class="mdi mdi-pencil"></i>
                    </button>
                    <button
                      @click="openDeleteModal(delivery.id)"
                      class="p-2 bg-nude text-[#2D1E3E] rounded-full hover:opacity-80 transition-all active:scale-90 hover:shadow-md"
                      title="Eliminar"
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
            v-for="delivery in filteredDeliveries"
            :key="delivery.id"
            class="bg-white/90 backdrop-blur-sm rounded-2xl border border-[#a74792]/20 shadow-lg p-4"
            :class="{ 'opacity-60': delivery.completed }"
          >
            <div class="flex justify-between items-start mb-2">
              <h3 class="font-semibold text-[#2D1E3E] text-lg">{{ delivery.client }}</h3>
              <span
                class="px-2 py-0.5 rounded-full text-xs font-medium"
                :class="delivery.type === 'presencial' ? 'bg-highlight text-[#2D1E3E]' : 'bg-neutral text-[#2D1E3E]'"
              >
                {{ delivery.type === 'presencial' ? 'Presencial' : 'Envío' }}
              </span>
            </div>
            <p class="text-sm text-[#2D1E3E] opacity-70 mb-1">
              <i class="mdi mdi-map-marker mr-1 text-[#a74792]"></i>
              {{ delivery.type === 'presencial' ? getPickupPointName(delivery.pickupPointId) : delivery.address }}
            </p>
            <p class="text-sm text-[#2D1E3E] opacity-70 mb-1">
              <i class="mdi mdi-calendar mr-1 text-[#a74792]"></i>
              {{ formatDate(delivery.date) }} a las {{ delivery.time }}
            </p>
            <p v-if="delivery.notes" class="text-sm text-[#2D1E3E] opacity-70 mt-2 p-2 bg-gray-50 rounded-lg">
              <i class="mdi mdi-note mr-1"></i>{{ delivery.notes }}
            </p>
            <div class="flex justify-end gap-3 mt-4 pt-3 border-t border-[#a74792]/10">
              <button
                v-if="!delivery.completed"
                @click="markAsCompleted(delivery.id)"
                class="p-2 bg-green-100 text-green-700 rounded-full hover:opacity-80 active:scale-90"
                title="Marcar como entregada"
              >
                <i class="mdi mdi-check"></i>
              </button>
              <button @click="openEditModal(delivery)" class="p-2 bg-highlight text-[#2D1E3E] rounded-full hover:opacity-80 active:scale-90" title="Editar">
                <i class="mdi mdi-pencil"></i>
              </button>
              <button @click="openDeleteModal(delivery.id)" class="p-2 bg-nude text-[#2D1E3E] rounded-full hover:opacity-80 active:scale-90" title="Eliminar">
                <i class="mdi mdi-delete"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- Mensaje si no hay entregas -->
        <div v-if="filteredDeliveries.length === 0" class="text-center py-12">
          <i class="mdi mdi-calendar-remove text-5xl text-[#a74792] opacity-30"></i>
          <p class="text-[#2D1E3E] opacity-50 mt-2">No hay entregas {{ activeTab === 'pending' ? 'pendientes' : 'completadas' }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { usePickupStore } from '@/stores/pickupPoints'
import AnimatedBackground from '@/components/ui/AnimatedBackground.vue'
import AdminDeleteModal from '@/components/admin/AdminDeleteModal.vue'

// Stores
const pickupStore = usePickupStore()

// Datos mock de entregas (idealmente vendrían de un store)
const deliveries = ref([
  {
    id: 1,
    client: 'María González',
    type: 'presencial',
    pickupPointId: 1,
    date: '2026-03-15',
    time: '15:30',
    notes: 'Llamar al llegar',
    completed: false
  },
  {
    id: 2,
    client: 'Juan Pérez',
    type: 'envio',
    address: 'Av. 18 de Julio 1234, Montevideo',
    date: '2026-03-16',
    time: '10:00',
    notes: 'Dejar en portería',
    completed: false
  },
  {
    id: 3,
    client: 'Ana López',
    type: 'presencial',
    pickupPointId: 2,
    date: '2026-03-14',
    time: '18:00',
    notes: '',
    completed: true
  }
])

// Pestañas
const tabs = [
  { value: 'pending', label: 'Pendientes' },
  { value: 'completed', label: 'Completadas' }
]
const activeTab = ref('pending')

// Filtrado
const filteredDeliveries = computed(() => {
  if (activeTab.value === 'pending') {
    return deliveries.value.filter(d => !d.completed)
  } else {
    return deliveries.value.filter(d => d.completed)
  }
})

// Formulario modal
const formModal = reactive({
  show: false,
  isEdit: false,
  id: null
})

const form = reactive({
  client: '',
  type: 'presencial',
  pickupPointId: '',
  address: '',
  date: '',
  time: '',
  notes: ''
})

// Abrir modal para crear
const openCreateModal = () => {
  resetForm()
  formModal.isEdit = false
  formModal.show = true
}

// Abrir modal para editar
const openEditModal = (delivery) => {
  form.client = delivery.client
  form.type = delivery.type
  form.pickupPointId = delivery.pickupPointId || ''
  form.address = delivery.address || ''
  form.date = delivery.date
  form.time = delivery.time
  form.notes = delivery.notes || ''
  formModal.isEdit = true
  formModal.id = delivery.id
  formModal.show = true
}

const resetForm = () => {
  form.client = ''
  form.type = 'presencial'
  form.pickupPointId = ''
  form.address = ''
  form.date = ''
  form.time = ''
  form.notes = ''
}

const closeFormModal = () => {
  formModal.show = false
  resetForm()
}

// Guardar entrega
const saveDelivery = () => {
  if (formModal.isEdit) {
    const index = deliveries.value.findIndex(d => d.id === formModal.id)
    if (index !== -1) {
      deliveries.value[index] = {
        id: formModal.id,
        client: form.client,
        type: form.type,
        pickupPointId: form.type === 'presencial' ? form.pickupPointId : null,
        address: form.type === 'envio' ? form.address : null,
        date: form.date,
        time: form.time,
        notes: form.notes,
        completed: deliveries.value[index].completed // mantener estado
      }
    }
  } else {
    const newId = Math.max(...deliveries.value.map(d => d.id), 0) + 1
    deliveries.value.push({
      id: newId,
      client: form.client,
      type: form.type,
      pickupPointId: form.type === 'presencial' ? form.pickupPointId : null,
      address: form.type === 'envio' ? form.address : null,
      date: form.date,
      time: form.time,
      notes: form.notes,
      completed: false
    })
  }
  closeFormModal()
}

// Marcar como completada
const markAsCompleted = (id) => {
  const delivery = deliveries.value.find(d => d.id === id)
  if (delivery) delivery.completed = true
}

// Eliminar
const deleteModal = ref({ show: false, title: '', message: '', id: null })

const openDeleteModal = (id) => {
  deleteModal.value = {
    show: true,
    title: 'Eliminar entrega',
    message: '¿Estás seguro de eliminar esta entrega?',
    id
  }
}

const confirmDelete = () => {
  deliveries.value = deliveries.value.filter(d => d.id !== deleteModal.value.id)
  closeDeleteModal()
}

const closeDeleteModal = () => {
  deleteModal.value.show = false
  deleteModal.value.id = null
}

// Utilidades
const getPickupPointName = (id) => {
  const point = pickupStore.getAllPoints.find(p => p.id === id)
  return point ? `${point.zone} - ${point.location}` : 'Punto no encontrado'
}

const formatDate = (dateStr) => {
  const [year, month, day] = dateStr.split('-')
  return `${day}/${month}/${year}`
}
</script>

<style scoped>
/* Colores de la paleta (si no están globales) */
.bg-highlight { background-color: #E7CEE3; }
.bg-neutral { background-color: #E9D5FF; }
.bg-nude { background-color: #E4B4C2; }
</style>