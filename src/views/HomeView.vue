<template>
  <div class="min-h-screen relative overflow-hidden">
    <!-- Fondo animado moderno -->
    <div class="absolute inset-0 z-0 overflow-hidden bg-animated">
      
      <!-- Gradiente principal -->
      <div class="absolute inset-0 bg-gradient-to-br from-[#fdf2ff] via-[#f8e6ff] to-[#f3d9ff] gradient-animation"></div>

      <!-- Sweep overlay -->
      <div class="absolute inset-0 bg-gradient-to-r from-transparent via-purple-50/40 to-transparent sweep-animation"></div>

      <!-- Luces focales -->
      <div class="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-purple-300/10 rounded-full blur-3xl pulse-slow"></div>
      <div class="absolute bottom-1/4 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-pink-300/10 rounded-full blur-3xl pulse-slower"></div>

      <!-- Partículas generadas una sola vez -->
      <div class="absolute inset-0">
        <div
          v-for="(style, index) in particles"
          :key="index"
          class="absolute rounded-full bg-gradient-to-r from-purple-400/30 to-pink-400/30 particle-float"
          :style="style"
        ></div>
      </div>

      <!-- Brillo superior -->
      <div class="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/30 to-transparent"></div>
    </div>

    <!-- Contenido -->
    <div class="relative z-10">
      <HeroSection 
        @shop-now="handleShopNow" 
        @scroll-to-products="handleScrollToProducts" 
      />

      <div class="pt-0">
        <NovedadesSection
          id="novedades"
          :products="newProducts"
          @add-to-cart="addToCart"
          @view-detail="goToProductDetail"
        />

        <div class="container mx-auto px-4 py-8 md:py-12">
          <DeliveryMethodsSection class="mb-8 md:mb-16" />
          <MeetupPointsSection class="mb-8 md:mb-16" />
          <PaymentMethodsSection class="mb-8 md:mb-16" />
        </div>
      </div>
    </div>

    <!-- Ondas finales -->
    <div class="relative w-full -mt-16 md:-mt-24" style="z-index: 5;">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" class="w-full">
        <path fill="#f3e0ec" fill-opacity="0.8"
          d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,192C672,181,768,139,864,128C960,117,1056,139,1152,149.3C1248,160,1344,160,1392,160L1440,160L1440,320L0,320Z">
        </path>
      </svg>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

import { useProductStore } from '@/stores/productStore'
import { useCartStore } from '@/stores/cartStore'

import HeroSection from '../components/Hero.vue'
import NovedadesSection from '../components/PromoSection.vue'
import MeetupPointsSection from '../components/MeetupPointsSection.vue'
import DeliveryMethodsSection from '../components/DeliveryMethodsSection.vue'
import PaymentMethodsSection from '../components/PaymentMethodsSection.vue'

const router = useRouter()

// STORES
const productStore = useProductStore()
const cartStore = useCartStore()

const { newProducts } = storeToRefs(productStore)


/* =========================
   PARTICULAS (generadas 1 vez)
========================= */

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

/* =========================
   ACCIONES
========================= */

function addToCart(product) {
  cartStore.addToCart(product)
}

function goToProductDetail(product) {
  router.push(`/producto/${product}`)
}

function handleShopNow() {
  router.push('/catalogo')
}

function handleScrollToProducts() {
  const section = document.getElementById('novedades')
  section?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
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

/* Keyframes */

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
