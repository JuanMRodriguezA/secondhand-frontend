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

    <!-- Contenido del login -->
    <div class="relative z-10 flex items-center justify-center min-h-screen px-4">
      <div class="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-[#a74792]/20 p-8 w-full max-w-md">
        <div class="text-center mb-8">
          <img src="/src/assets/logo.png" alt="Zoe Indumentaria" class="h-16 mx-auto mb-4" />
          <h2 class="text-2xl font-bold text-[#2D1E3E]">Acceso Administrador</h2>
          <p class="text-sm text-[#2D1E3E] opacity-60">Ingresá tus credenciales</p>
        </div>

        <form @submit.prevent="handleLogin">
          <div class="mb-4">
            <label class="block text-sm font-medium text-[#2D1E3E] mb-1">Usuario</label>
            <input
              v-model="form.username"
              type="text"
              required
              class="w-full px-4 py-2 border border-[#a74792]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a74792]/50"
              placeholder="admin"
            />
          </div>
          <div class="mb-6">
            <label class="block text-sm font-medium text-[#2D1E3E] mb-1">Contraseña</label>
            <input
              v-model="form.password"
              type="password"
              required
              class="w-full px-4 py-2 border border-[#a74792]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a74792]/50"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            class="w-full py-3 bg-gradient-to-r from-[#a74792] to-[#d973b8] text-white font-semibold rounded-lg hover:from-[#d973b8] hover:to-[#a74792] transition-colors shadow-md"
          >
            Ingresar
          </button>
          <p v-if="error" class="text-sm text-red-500 mt-2 text-center">{{ error }}</p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const form = ref({ username: '', password: '' })
const error = ref('')

// Partículas (copiar de otras vistas)
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

function handleLogin() {
  // Credenciales fijas para demo (podrías validar con backend)
  if (form.value.username === 'admin' && form.value.password === 'admin123') {
    // Guardar token en localStorage
    localStorage.setItem('adminAuth', 'true')
    // Redirigir al panel
    router.push('/admin')
  } else {
    error.value = 'Usuario o contraseña incorrectos'
  }
}
</script>

<style scoped>
/* Animaciones de fondo (copiar de las otras vistas) */
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
</style>