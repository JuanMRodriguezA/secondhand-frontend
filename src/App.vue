<template>
  <div class="min-h-screen flex flex-col bg-primaryBg text-textPrimary">
    <NavBar v-if="!isAdminRoute" />
    <main class="flex-1">
      <router-view v-slot="{ Component }">
        <transition
          :name="transitionName"
          mode="out-in"
        >
          <component :is="Component" :key="$route.fullPath" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import NavBar from '@/components/NavBar.vue'

const route = useRoute()
const isAdminRoute = computed(() => route.path.startsWith('/admin'))

// Detectar si es móvil
const isMobile = ref(false)
const checkMobile = () => {
  isMobile.value = window.innerWidth < 768 // o cualquier breakpoint que uses
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})
onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})

// Detectar navegación hacia atrás
const isBack = ref(false)

const handlePopState = () => {
  isBack.value = true
  // Restablecer después de la duración de la animación
  setTimeout(() => {
    isBack.value = false
  }, 300)
}

onMounted(() => {
  window.addEventListener('popstate', handlePopState)
})
onUnmounted(() => {
  window.removeEventListener('popstate', handlePopState)
})

// Nombre de la transición según el contexto
const transitionName = computed(() => {
  // Si es móvil y es navegación hacia atrás, sin transición
  if (isMobile.value && isBack.value) {
    return '' // sin animación
  }
  // Si es móvil pero no es back, usamos una transición muy sutil
  if (isMobile.value) {
    return 'fade-quick'
  }
  // En desktop, usamos transición normal
  return 'fade'
})
</script>

<style>
/* Transición normal para desktop */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateX(20px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

/* Transición rápida solo con opacidad para móvil */
.fade-quick-enter-active,
.fade-quick-leave-active {
  transition: opacity 0.15s ease;
}
.fade-quick-enter-from,
.fade-quick-leave-to {
  opacity: 0;
}

/* Si no hay nombre de transición, no se aplica ninguna animación */
</style>