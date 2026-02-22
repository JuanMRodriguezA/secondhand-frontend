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

    <!-- Contenido principal -->
    <div class="relative z-10 container mx-auto px-4 py-8 md:py-12 max-w-6xl">
      <!-- Header mejorado -->
      <div class="mb-8">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 class="text-3xl md:text-4xl font-bold text-[#2D1E3E] mb-1">Estadísticas</h1>
            <p class="text-[#2D1E3E] opacity-70">Resumen de actividad</p>
          </div>
          
          <!-- Selector de rango -->
          <div class="flex flex-wrap items-center gap-3">
            <!-- Predefined ranges -->
            <div class="flex bg-white/90 backdrop-blur-sm rounded-full p-1 border border-[#a74792]/20 shadow-sm">
              <button
                @click="setRange('7')"
                :class="[
                  'px-4 py-2 text-sm font-medium rounded-full transition-colors',
                  dateRange === '7' ? 'bg-[#a74792] text-white' : 'text-[#2D1E3E] hover:bg-gray-100'
                ]"
              >
                7 días
              </button>
              <button
                @click="setRange('30')"
                :class="[
                  'px-4 py-2 text-sm font-medium rounded-full transition-colors',
                  dateRange === '30' ? 'bg-[#a74792] text-white' : 'text-[#2D1E3E] hover:bg-gray-100'
                ]"
              >
                30 días
              </button>
              <button
                @click="toggleCustomRange"
                :class="[
                  'px-4 py-2 text-sm font-medium rounded-full transition-colors',
                  dateRange === 'custom' ? 'bg-[#a74792] text-white' : 'text-[#2D1E3E] hover:bg-gray-100'
                ]"
              >
                Personalizado
              </button>
            </div>
            
            <!-- Selector de fechas personalizado (visible solo cuando está activo) -->
            <div v-if="dateRange === 'custom'" class="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full p-1 border border-[#a74792]/20 shadow-sm">
              <input
                type="date"
                v-model="customStart"
                class="px-3 py-2 text-sm rounded-full border-0 bg-transparent focus:outline-none focus:ring-2 focus:ring-[#a74792]/20"
              />
              <span class="text-[#2D1E3E]">-</span>
              <input
                type="date"
                v-model="customEnd"
                class="px-3 py-2 text-sm rounded-full border-0 bg-transparent focus:outline-none focus:ring-2 focus:ring-[#a74792]/20"
              />
              <button
                @click="applyCustomRange"
                class="px-4 py-2 text-sm font-medium bg-[#a74792] text-white rounded-full hover:bg-[#d973b8] transition-colors"
              >
                Aplicar
              </button>
            </div>
            
            <!-- Última actualización -->
            <span class="text-xs text-[#2D1E3E] opacity-50 ml-2">
              Actualizado: {{ lastUpdated }}
            </span>
          </div>
        </div>
        
        <!-- Rango seleccionado (texto descriptivo) -->
        <p class="text-sm text-[#2D1E3E] opacity-60 mt-2">
          Mostrando datos del {{ rangeDescription }}
        </p>
      </div>

      <!-- KPI Cards (3 cards) -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <!-- Card: Total visitas -->
        <div class="bg-white/90 backdrop-blur-sm rounded-2xl border border-[#a74792]/20 shadow-lg p-6">
          <div class="flex items-start justify-between">
            <div>
              <p class="text-sm font-medium text-[#2D1E3E] opacity-60 mb-1">Total de visitas</p>
              <p class="text-3xl font-bold text-[#2D1E3E]">{{ formatNumber(metrics.totalVisits) }}</p>
            </div>
            <i class="mdi mdi-eye text-3xl text-[#a74792] opacity-80"></i>
          </div>
          <!-- Variación (mock) -->
          <div class="mt-2 flex items-center text-xs">
            <span class="text-green-600 flex items-center">
              <i class="mdi mdi-arrow-up text-sm"></i> +5.2%
            </span>
            <span class="text-[#2D1E3E] opacity-40 ml-2">vs periodo anterior</span>
          </div>
        </div>

        <!-- Card: Sesiones únicas -->
        <div class="bg-white/90 backdrop-blur-sm rounded-2xl border border-[#a74792]/20 shadow-lg p-6">
          <div class="flex items-start justify-between">
            <div>
              <p class="text-sm font-medium text-[#2D1E3E] opacity-60 mb-1">Sesiones únicas</p>
              <p class="text-3xl font-bold text-[#2D1E3E]">{{ formatNumber(metrics.uniqueSessions) }}</p>
            </div>
            <i class="mdi mdi-account-multiple text-3xl text-[#a74792] opacity-80"></i>
          </div>
          <div class="mt-2 flex items-center text-xs">
            <span class="text-green-600 flex items-center">
              <i class="mdi mdi-arrow-up text-sm"></i> +3.1%
            </span>
            <span class="text-[#2D1E3E] opacity-40 ml-2">vs periodo anterior</span>
          </div>
        </div>

        <!-- Card: Tiempo promedio -->
        <div class="bg-white/90 backdrop-blur-sm rounded-2xl border border-[#a74792]/20 shadow-lg p-6">
          <div class="flex items-start justify-between">
            <div>
              <p class="text-sm font-medium text-[#2D1E3E] opacity-60 mb-1">Tiempo promedio</p>
              <p class="text-3xl font-bold text-[#2D1E3E]">{{ metrics.avgTime }}</p>
            </div>
            <i class="mdi mdi-clock-outline text-3xl text-[#a74792] opacity-80"></i>
          </div>
          <div class="mt-2 flex items-center text-xs">
            <span class="text-red-600 flex items-center">
              <i class="mdi mdi-arrow-down text-sm"></i> -0.5%
            </span>
            <span class="text-[#2D1E3E] opacity-40 ml-2">vs periodo anterior</span>
          </div>
        </div>
      </div>

      <!-- Gráfico de líneas -->
      <div class="bg-white/90 backdrop-blur-sm rounded-2xl border border-[#a74792]/20 shadow-lg p-6 mb-8">
        <h2 class="text-lg font-semibold text-[#2D1E3E] mb-4 flex items-center gap-2">
          <i class="mdi mdi-chart-line text-[#a74792]"></i>
          Visitas por día
        </h2>
        <div class="h-64 w-full relative">
          <!-- Mock de gráfico de líneas (simple) -->
          <div class="absolute inset-0 flex items-end justify-between px-2">
            <div
              v-for="(point, i) in chartData"
              :key="i"
              class="relative group flex-1 flex justify-center"
            >
              <div
                class="w-0.5 bg-[#a74792] rounded-t transition-all duration-300"
                :style="{ height: point + '%' }"
              ></div>
              <!-- Punto en la punta -->
              <div
                class="absolute bottom-0 w-2 h-2 bg-[#a74792] rounded-full -mb-1 transform -translate-x-1/2 left-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                :style="{ bottom: point + '%' }"
              ></div>
              <!-- Tooltip simple -->
              <div
                class="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-[#2D1E3E] text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
                :style="{ bottom: point + '%' }"
              >
                {{ point }} visitas
              </div>
            </div>
          </div>
          <!-- Eje horizontal -->
          <div class="absolute bottom-6 left-0 right-0 h-px bg-gray-200"></div>
          <!-- Etiquetas de días -->
          <div class="absolute bottom-0 left-0 right-0 flex justify-between px-2 text-xs text-[#2D1E3E] opacity-60">
            <span v-for="day in days" :key="day">{{ day }}</span>
          </div>
        </div>
        <p class="text-xs text-[#2D1E3E] opacity-50 mt-4 text-center">
          Período: {{ rangeDescription }}
        </p>
      </div>

      <!-- Tabla: Páginas más visitadas -->
      <div class="bg-white/90 backdrop-blur-sm rounded-2xl border border-[#a74792]/20 shadow-lg p-6">
        <h2 class="text-lg font-semibold text-[#2D1E3E] mb-4 flex items-center gap-2">
          <i class="mdi mdi-table text-[#a74792]"></i>
          Páginas más visitadas
        </h2>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-[#a74792]/10">
                <th class="text-left py-3 px-2 font-medium text-[#2D1E3E]">Página</th>
                <th class="text-left py-3 px-2 font-medium text-[#2D1E3E]">Visitas</th>
                <th class="text-left py-3 px-2 font-medium text-[#2D1E3E]">Tiempo promedio</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(page, i) in topPages" :key="i" class="border-b border-[#a74792]/5 hover:bg-[#a74792]/5">
                <td class="py-3 px-2 text-[#2D1E3E]">{{ page.name }}</td>
                <td class="py-3 px-2 text-[#2D1E3E]">{{ page.visits }}</td>
                <td class="py-3 px-2 text-[#2D1E3E]">{{ page.avgTime }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Partículas decorativas
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

// Estado del rango
const dateRange = ref('7') // '7', '30', 'custom'
const customStart = ref('')
const customEnd = ref('')
const lastUpdated = ref('')

// Actualizar última actualización
onMounted(() => {
  const now = new Date()
  lastUpdated.value = now.toLocaleString('es-AR', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' })
})

// Métodos
const setRange = (range) => {
  dateRange.value = range
  // Aquí podrías disparar una carga de datos
}

const toggleCustomRange = () => {
  if (dateRange.value === 'custom') {
    // Si ya estaba en custom y se vuelve a tocar, podríamos cerrar o dejar abierto
    // Por simplicidad, lo dejamos igual
  } else {
    dateRange.value = 'custom'
    // Inicializar fechas si no están
    if (!customStart.value) {
      const end = new Date()
      const start = new Date()
      start.setDate(start.getDate() - 7)
      customStart.value = start.toISOString().split('T')[0]
      customEnd.value = end.toISOString().split('T')[0]
    }
  }
}

const applyCustomRange = () => {
  if (customStart.value && customEnd.value) {
    // Validar que start <= end
    if (customStart.value > customEnd.value) {
      alert('La fecha de inicio debe ser anterior a la fecha de fin')
      return
    }
    // Aquí disparar carga con fechas personalizadas
    console.log('Aplicar rango personalizado', customStart.value, customEnd.value)
  }
}

// Descripción del rango para mostrar
const rangeDescription = computed(() => {
  if (dateRange.value === '7') {
    const end = new Date()
    const start = new Date()
    start.setDate(start.getDate() - 7)
    return `${start.toLocaleDateString('es-AR')} - ${end.toLocaleDateString('es-AR')}`
  } else if (dateRange.value === '30') {
    const end = new Date()
    const start = new Date()
    start.setDate(start.getDate() - 30)
    return `${start.toLocaleDateString('es-AR')} - ${end.toLocaleDateString('es-AR')}`
  } else if (dateRange.value === 'custom') {
    if (customStart.value && customEnd.value) {
      return `${new Date(customStart.value).toLocaleDateString('es-AR')} - ${new Date(customEnd.value).toLocaleDateString('es-AR')}`
    } else {
      return 'rango personalizado'
    }
  }
  return ''
})

// Datos mock para KPIs
const metrics = ref({
  totalVisits: 12500,
  uniqueSessions: 8200,
  avgTime: '2m 34s'
})

// Datos mock para el gráfico (valores en porcentaje de altura)
const chartData = [40, 65, 80, 55, 70, 85, 60]
const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']

// Datos mock para la tabla
const topPages = [
  { name: '/productos/vestido-floral', visits: '1,234', avgTime: '2m 10s' },
  { name: '/catalogo/mujer', visits: '987', avgTime: '1m 45s' },
  { name: '/productos/zapatos-cuero', visits: '654', avgTime: '3m 20s' },
  { name: '/ofertas', visits: '432', avgTime: '1m 30s' },
  { name: '/contacto', visits: '321', avgTime: '0m 50s' },
]

// Formateador de números
const formatNumber = (num) => {
  return new Intl.NumberFormat('es-AR').format(num)
}
</script>

<style scoped>
/* Animaciones de fondo (igual que antes) */
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

/* Estilos para inputs date */
input[type="date"] {
  color-scheme: light;
}
</style>