<template>
  <nav class="sticky top-0 z-50
            bg-[#f8f6fa]
            border-b border-[#E4B4C2]
            shadow-sm">
    <div class="container mx-auto px-4 py-3">
      <!-- Vista móvil -->
      <div class="flex md:hidden justify-between items-center">
        <!-- Logo -->
        <router-link to="/" class="flex items-center group">
          <img src="../assets/logo.png" alt="ZOE Indumentaria"
            class="h-16 w-10 object-contain transition-all duration-500 group-hover:scale-105" />
        </router-link>

        <!-- Texto centrado -->
        <div class="flex flex-col items-center leading-none flex-1 text-center">
          <h1 class="text-3xl font-logo font-semibold text-textPrimary tracking-tight">
            Z O E
          </h1>
          <p class="text-[11px] font-sans text-textPrimary/70 tracking-[0.35em] uppercase mt-1">
            Indumentaria
          </p>
        </div>

        <!-- Botón Carrito móvil -->
        <router-link to="/carrito" class="relative flex items-center justify-center
                   w-10 h-10
                   rounded-full
                   bg-secondaryBg
                   text-[#f25081]
                   transition-all duration-300
                   shadow-sm
                   hover:bg-accent hover:text-white
                   hover:shadow-md
                   active:scale-95">
          <i class="mdi mdi-cart-outline text-xl"></i>
          <span v-if="cartStore.itemCount > 0" class="absolute -top-1 -right-1 
                 flex items-center justify-center
                 w-5 h-5 
                 rounded-full 
                 bg-[#FFb8d1] 
                 text-xs font-bold text-gray-800 
                 shadow-md">
            {{ cartStore.itemCount }}
          </span>
        </router-link>
      </div>

      <!-- Vista desktop: ambos botones exactamente iguales -->
      <div class="hidden md:flex justify-between items-center">
        <!-- Logo + texto -->
        <router-link to="/" class="flex items-center space-x-3 group">
          <img src="../assets/logo.png" alt="ZOE Indumentaria"
            class="h-16 w-auto object-contain transition-all duration-500 group-hover:scale-105" />
          <div class="flex flex-col items-start leading-none">
            <h1 class="text-3xl font-logo font-semibold text-textPrimary tracking-tight">
              Z O E
            </h1>
            <p class="text-[11px] font-sans text-textPrimary/70 tracking-[0.35em] uppercase mt-1">
              Indumentaria
            </p>
          </div>
        </router-link>

        <!-- Contenedor de acciones con botones idénticos -->
        <div class="flex items-center space-x-4">
          <!-- WhatsApp Desktop -->
          <a
            href="https://wa.me/59891234567"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center justify-center space-x-2 px-4 h-10 rounded-full
                   bg-accent text-textPrimary font-medium
                   transition-all duration-300
                   shadow-[0_4px_14px_rgba(192,132,252,0.3)]
                   hover:bg-highlight hover:text-white
                   hover:shadow-[0_6px_20px_rgba(168,85,247,0.4)]
                   hover:-translate-y-0.5
                   active:scale-95 group"
          >
            <img src="../assets/whatsappLogo.png" class="w-5 h-5 object-contain" />
            <span class="text-sm tracking-wide">WhatsApp</span>
          </a>

          <!-- Carrito Desktop - EXACTAMENTE IGUAL que WhatsApp (misma altura, mismo padding) -->
          <router-link
            to="/carrito"
            class="flex items-center justify-center space-x-2 px-4 h-10 rounded-full
                   bg-accent text-textPrimary font-medium
                   transition-all duration-300
                   shadow-[0_4px_14px_rgba(192,132,252,0.3)]
                   hover:bg-highlight hover:text-white
                   hover:shadow-[0_6px_20px_rgba(168,85,247,0.4)]
                   hover:-translate-y-0.5
                   active:scale-95 group
                   relative"
          >
            <i class="mdi mdi-cart-outline text-lg text-[#f25081] group-hover:text-white transition-colors"></i>
            <span class="text-sm tracking-wide">Carrito</span>
            <span
              v-if="cartStore.itemCount > 0"
              class="absolute -top-2 -right-2 
                     flex items-center justify-center
                     w-5 h-5 
                     rounded-full 
                     bg-[#FFb8d1] 
                     text-xs font-bold text-gray-800 
                     shadow-md"
            >
              {{ cartStore.itemCount }}
            </span>
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useCartStore } from '@/stores/cartStore'

const cartStore = useCartStore()
</script>