<template>
  <div class="min-h-screen relative overflow-hidden">
    <!-- Fondo animado -->
    <div class="absolute inset-0 z-0 overflow-hidden bg-animated">
      <div class="absolute inset-0 bg-gradient-to-br from-[#fdf2ff] via-[#f8e6ff] to-[#f3d9ff] gradient-animation">
      </div>
      <div class="absolute inset-0 bg-gradient-to-r from-transparent via-purple-50/40 to-transparent sweep-animation">
      </div>
      <div
        class="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-purple-300/10 rounded-full blur-3xl pulse-slow">
      </div>
      <div
        class="absolute bottom-1/4 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-pink-300/10 rounded-full blur-3xl pulse-slower">
      </div>
      <div class="absolute inset-0">
        <div v-for="(style, index) in particles" :key="index"
          class="absolute rounded-full bg-gradient-to-r from-purple-400/30 to-pink-400/30 particle-float"
          :style="style"></div>
      </div>
      <div class="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/30 to-transparent"></div>
    </div>

    <!-- Contenido principal -->
    <div class="relative z-10 flex flex-col items-center justify-start min-h-screen px-4 py-8 md:py-12">
      <div class="container mx-auto max-w-6xl">
        <!-- Header con logo y botón de salir -->
        <div class="flex justify-between items-center mb-6">
          <img src="/src/assets/logo.png" alt="Zoe Indumentaria" class="h-16 md:h-20 w-auto" />
          <button @click="logout"
            class="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-[#a74792]/20 shadow-sm hover:shadow-md transition-all hover:bg-white active:scale-95"
            title="Cerrar sesión">
            <i class="mdi mdi-logout text-[#a74792]"></i>
            <span class="text-sm font-medium text-textPrimary hidden sm:inline">Salir</span>
          </button>
        </div>

        <!-- Título y subtítulo -->
        <div class="text-center mb-8 md:mb-12">
          <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-textPrimary mb-2">
            Panel de Administración
          </h1>
          <p class="text-lg md:text-xl text-textPrimary opacity-70">
            Zoe Indumentaria
          </p>
          <div class="w-24 h-1 bg-warning mx-auto mt-4 rounded-full"></div>
        </div>

        <!-- Grid de botones: 2 columnas en móvil, 5 en desktop -->
        <div class="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
          <!-- Productos -->
          <button @click="goToProducts"
            class="group relative bg-white/90 backdrop-blur-sm rounded-2xl md:rounded-3xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-warning/20 hover:border-warning/40 flex flex-col items-center justify-center p-4 md:p-6 aspect-square">
            <div
              class="absolute inset-0 rounded-2xl md:rounded-3xl bg-gradient-to-br from-warning/5 to-pink-200/5 opacity-0 group-hover:opacity-100 transition-opacity">
            </div>
            <i
              class="mdi mdi-package-variant text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-warning mb-2 md:mb-4 group-hover:scale-110 transition-transform"></i>
            <span
              class="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-textPrimary text-center">Productos</span>
            <span class="text-xs md:text-sm text-textPrimary opacity-60 mt-1 hidden sm:block">Gestioná tu
              catálogo</span>
            <div
              class="absolute bottom-2 right-2 md:bottom-4 md:right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <i class="mdi mdi-arrow-right text-warning text-xl md:text-2xl"></i>
            </div>
          </button>

          <!-- Estadísticas -->
          <button @click="goToStatistics"
            class="group relative bg-white/90 backdrop-blur-sm rounded-2xl md:rounded-3xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-warning/20 hover:border-warning/40 flex flex-col items-center justify-center p-4 md:p-6 aspect-square">
            <div
              class="absolute inset-0 rounded-2xl md:rounded-3xl bg-gradient-to-br from-warning/5 to-pink-200/5 opacity-0 group-hover:opacity-100 transition-opacity">
            </div>
            <i
              class="mdi mdi-chart-bar text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-warning mb-2 md:mb-4 group-hover:scale-110 transition-transform"></i>
            <span
              class="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-textPrimary text-center">Estadísticas</span>
            <span class="text-xs md:text-sm text-textPrimary opacity-60 mt-1 hidden sm:block">Ventas y métricas</span>
            <div
              class="absolute bottom-2 right-2 md:bottom-4 md:right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <i class="mdi mdi-arrow-right text-warning text-xl md:text-2xl"></i>
            </div>
          </button>

          <!-- Puntos de entrega -->
          <button @click="goToDeliveryPoints"
            class="group relative bg-white/90 backdrop-blur-sm rounded-2xl md:rounded-3xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-warning/20 hover:border-warning/40 flex flex-col items-center justify-center p-4 md:p-6 aspect-square">
            <div
              class="absolute inset-0 rounded-2xl md:rounded-3xl bg-gradient-to-br from-warning/5 to-pink-200/5 opacity-0 group-hover:opacity-100 transition-opacity">
            </div>
            <i
              class="mdi mdi-map-marker text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-warning mb-2 md:mb-4 group-hover:scale-110 transition-transform"></i>
            <span class="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-textPrimary text-center">Puntos de
              entrega</span>
            <span class="text-xs md:text-sm text-textPrimary opacity-60 mt-1 hidden sm:block">Gestioná
              ubicaciones</span>
            <div
              class="absolute bottom-2 right-2 md:bottom-4 md:right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <i class="mdi mdi-arrow-right text-warning text-xl md:text-2xl"></i>
            </div>
          </button>

          <!-- Guía de talles -->
          <button @click="goToSizeGuide"
            class="group relative bg-white/90 backdrop-blur-sm rounded-2xl md:rounded-3xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-warning/20 hover:border-warning/40 flex flex-col items-center justify-center p-4 md:p-6 aspect-square">
            <div
              class="absolute inset-0 rounded-2xl md:rounded-3xl bg-gradient-to-br from-warning/5 to-pink-200/5 opacity-0 group-hover:opacity-100 transition-opacity">
            </div>
            <i
              class="mdi mdi-ruler text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-warning mb-2 md:mb-4 group-hover:scale-110 transition-transform"></i>
            <span class="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-textPrimary text-center">Guías de
              producto</span>
            <span class="text-xs md:text-sm text-textPrimary opacity-60 mt-1 hidden sm:block">Editá las tablas de talles
              y las condiciones</span>
            <div
              class="absolute bottom-2 right-2 md:bottom-4 md:right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <i class="mdi mdi-arrow-right text-warning text-xl md:text-2xl"></i>
            </div>
          </button>

          <!-- Gestión de entregas -->
          <button @click="goToDeliveries"
            class="group relative bg-white/90 backdrop-blur-sm rounded-2xl md:rounded-3xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-warning/20 hover:border-warning/40 flex flex-col items-center justify-center p-4 md:p-6 aspect-square">
            <div
              class="absolute inset-0 rounded-2xl md:rounded-3xl bg-gradient-to-br from-warning/5 to-pink-200/5 opacity-0 group-hover:opacity-100 transition-opacity">
            </div>
            <i
              class="mdi mdi-calendar-check text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-warning mb-2 md:mb-4 group-hover:scale-110 transition-transform"></i>
            <span
              class="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-textPrimary text-center">Entregas</span>
            <span class="text-xs md:text-sm text-textPrimary opacity-60 mt-1 hidden sm:block">Gestioná los envíos</span>
            <div
              class="absolute bottom-2 right-2 md:bottom-4 md:right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <i class="mdi mdi-arrow-right text-warning text-xl md:text-2xl"></i>
            </div>
          </button>

          <button @click="activarNotificaciones"
            class="group relative bg-white/90 backdrop-blur-sm rounded-2xl md:rounded-3xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-warning/20 hover:border-warning/40 flex flex-col items-center justify-center p-4 md:p-6 aspect-square">
            <div
              class="absolute inset-0 rounded-2xl md:rounded-3xl bg-gradient-to-br from-warning/5 to-pink-200/5 opacity-0 group-hover:opacity-100 transition-opacity">
            </div>
            <i
              class="mdi mdi-bell-ring text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-warning mb-2 md:mb-4 group-hover:scale-110 transition-transform"></i>
            <span class="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-textPrimary text-center">
              Notificaciones
            </span>
            <span class="text-xs md:text-sm text-textPrimary opacity-60 mt-1 hidden sm:block">
              Activar alertas push
            </span>
            <div
              class="absolute bottom-2 right-2 md:bottom-4 md:right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <i class="mdi mdi-arrow-right text-warning text-xl md:text-2xl"></i>
            </div>
          </button>
        </div>

        <!-- Footer opcional -->
        <div class="text-center mt-8 md:mt-12 text-textPrimary opacity-50 text-sm">
          © 2026 Zoe Indumentaria - Todos los derechos reservados
        </div>
      </div>
    </div>

    <!-- Ondas finales -->
    <div class="absolute bottom-0 w-full" style="z-index: 5;">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" class="w-full">
        <path fill="#f3e0ec" fill-opacity="0.8"
          d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,192C672,181,768,139,864,128C960,117,1056,139,1152,149.3C1248,160,1344,160,1392,160L1440,160L1440,320L0,320Z">
        </path>
      </svg>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { requestNotificationPermission } from '@/firebase'

const router = useRouter()

// Partículas flotantes
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

// 🔔 Activar notificaciones
async function activarNotificaciones() {
  try {
    const token = await requestNotificationPermission()
    if (token) {
      console.log("Token FCM obtenido:", token)
      alert("Notificaciones activadas correctamente")
    }
  } catch (error) {
    console.error("Error activando notificaciones:", error)
  }
}

// Navegación
function goToProducts() {
  router.push('/admin/products')
}

function goToStatistics() {
  router.push('/admin/estadisticas')
}

function goToDeliveryPoints() {
  router.push('/admin/puntos-de-entrega')
}

function goToSizeGuide() {
  router.push('/admin/guias')
}

function goToDeliveries() {
  router.push('/admin/entregas')
}

function logout() {
  router.push('/')
}
</script>

<style scoped>
/* Mismos estilos de animación que en tu vista original */
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
  0% {
    background-position: 0% 0%;
  }

  50% {
    background-position: 100% 100%;
  }

  100% {
    background-position: 0% 0%;
  }
}

@keyframes gradientMove {
  0% {
    background-position: 0% 50%;
  }

  25% {
    background-position: 50% 100%;
  }

  50% {
    background-position: 100% 50%;
  }

  75% {
    background-position: 50% 0%;
  }

  100% {
    background-position: 0% 50%;
  }
}

@keyframes lightSweep {
  0% {
    background-position: -100% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: -100% 50%;
  }
}

@keyframes pulseEffect {

  0%,
  100% {
    opacity: 0.1;
    transform: scale(1);
  }

  50% {
    opacity: 0.3;
    transform: scale(1.1);
  }
}

@keyframes floatParticle {
  0% {
    transform: translate(0, 0) rotate(0deg);
    opacity: 0.3;
  }

  25% {
    transform: translate(50px, -30px) rotate(90deg);
    opacity: 0.5;
  }

  50% {
    transform: translate(20px, -60px) rotate(180deg);
    opacity: 0.2;
  }

  75% {
    transform: translate(-30px, -30px) rotate(270deg);
    opacity: 0.4;
  }

  100% {
    transform: translate(0, 0) rotate(360deg);
    opacity: 0.3;
  }
}

/* Colores personalizados */
.text-warning {
  color: #a74792;
}

.bg-warning {
  background-color: #a74792;
}

.border-warning\/20 {
  border-color: rgba(167, 71, 146, 0.2);
}

.border-warning\/40 {
  border-color: rgba(167, 71, 146, 0.4);
}

.text-textPrimary {
  color: #2d1b2d;
}
</style>