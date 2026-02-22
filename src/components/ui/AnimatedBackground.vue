<template>
  <div class="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-animated">
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
</template>

<script setup>
import { ref, onMounted } from 'vue'

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

onMounted(generateParticles)
</script>

<style scoped>
/* Copiar aquí todos los keyframes y clases de animación desde el original */
.bg-animated { /* ... */ }
.gradient-animation { /* ... */ }
.sweep-animation { /* ... */ }
.pulse-slow { /* ... */ }
.pulse-slower { /* ... */ }
.particle-float { /* ... */ }
@keyframes gradientBackground { /* ... */ }
@keyframes gradientMove { /* ... */ }
@keyframes lightSweep { /* ... */ }
@keyframes pulseEffect { /* ... */ }
@keyframes floatParticle { /* ... */ }
</style>