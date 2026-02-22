<template>
  <section class="relative overflow-hidden bg-transparent py-4 md:py-12 lg:min-h-[calc(100vh-80px)] lg:flex lg:items-center">
    <div class="container mx-auto px-4 md:px-6">
      <!-- Versión mobile: imagen arriba, texto abajo (por defecto) -->
      <!-- Versión escritorio: texto izquierda, imagen derecha con lg:flex-row y orden invertido -->
      <div class="flex flex-col lg:flex-row items-center gap-6 md:gap-8 lg:gap-12">
        <!-- Imagen hero (primero en mobile, segundo en escritorio) -->
        <div class="lg:w-1/2 w-full order-1 lg:order-2">
          <div class="relative">
            <!-- Badge flotante solo en mobile (opcional, para dar interés) -->
            <div class="absolute top-2 left-2 z-10 lg:hidden">
              <span class="inline-flex items-center gap-1 px-3 py-1 bg-warning text-white text-xs font-bold rounded-full shadow-lg">
                <i class="mdi mdi-tag"></i> Prendas únicas
              </span>
            </div>
            
            <!-- Imagen principal con altura aumentada en mobile -->
            <div class="relative rounded-xl md:rounded-2xl overflow-hidden shadow-xl md:shadow-2xl border-2 md:border-4 border-white">
              <img
                src="..\assets\hero.png"
                alt="Ropa y calzado seleccionado - Moda consciente" 
                class="w-full h-64 sm:h-80 md:h-96 lg:h-[28rem] object-cover" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
            </div>

            <!-- Tarjetas flotantes solo en desktop -->
            <div class="hidden lg:block">
              <div class="absolute -bottom-3 -left-3 bg-white/95 backdrop-blur-sm border border-warning/20 rounded-xl p-4 shadow-2xl max-w-[200px] animate-float z-20">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-warning/10 rounded-full flex items-center justify-center">
                    <i class="mdi mdi-star text-warning text-lg"></i>
                  </div>
                  <div>
                    <p class="font-bold text-sm text-warning">Prendas únicas</p>
                    <p class="text-xs text-warning opacity-90">Seleccionadas con cuidado</p>
                  </div>
                </div>
              </div>
              <div class="absolute -top-3 -right-3 bg-white/95 backdrop-blur-sm border border-warning/20 rounded-xl p-4 shadow-2xl max-w-[200px] animate-float animation-delay-1000 z-20">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-warning/10 rounded-full flex items-center justify-center">
                    <i class="mdi mdi-shield-check text-warning text-lg"></i>
                  </div>
                  <div>
                    <p class="font-bold text-sm text-warning">Calidad garantizada</p>
                    <p class="text-xs text-warning opacity-90">Nuevos y usados</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Contenido texto (segundo en mobile, primero en escritorio) -->
        <div class="lg:w-1/2 w-full order-2 lg:order-1">
          <div class="max-w-xl mx-auto lg:mx-0">
            <!-- Badge principal (más visible en mobile) -->
            <span class="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-white/90 border border-warning/30 text-warning rounded-full text-xs md:text-sm font-semibold mb-3 md:mb-4 shadow-sm">
              <i class="mdi mdi-recycle text-base"></i>
              Moda circular consciente
            </span>

            <!-- Título principal -->
            <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-textPrimary mb-3 md:mb-4 leading-tight">
              Encuentra prendas únicas
              <span class="text-highlight block sm:inline">a mejor precio</span>
            </h1>

            <!-- Subtítulo descriptivo -->
            <p class="text-sm sm:text-base text-textPrimary opacity-90 mb-4 md:mb-6 leading-relaxed">
              Ropa y calzado seleccionado con cuidado.
              <span class="font-semibold block sm:inline">Misma calidad, menos precio.</span>
              Productos nuevos y de segunda mano en excelente estado.
            </p>

            <!-- Beneficios con MDI icons -->
            <div class="space-y-3 mb-6 md:mb-8">
              <div class="flex items-start gap-2 md:gap-3">
                <div class="w-6 h-6 md:w-8 md:h-8 rounded-full bg-warning/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <i class="mdi mdi-heart text-warning text-sm md:text-lg"></i>
                </div>
                <div>
                  <p class="text-textPrimary font-medium text-sm md:text-base">Prendas cuidadas y seleccionadas una a una</p>
                  <p class="text-textPrimary opacity-70 text-xs md:text-sm">Calidad verificada para tu tranquilidad</p>
                </div>
              </div>
              <div class="flex items-start gap-2 md:gap-3">
                <div class="w-6 h-6 md:w-8 md:h-8 rounded-full bg-warning/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <i class="mdi mdi-check-circle text-warning text-sm md:text-lg"></i>
                </div>
                <div>
                  <p class="text-textPrimary font-medium text-sm md:text-base">Calidad garantizada, listo para usar</p>
                  <p class="text-textPrimary opacity-70 text-xs md:text-sm">Nuevos y usados en excelente estado</p>
                </div>
              </div>
              <div class="flex items-start gap-2 md:gap-3">
                <div class="w-6 h-6 md:w-8 md:h-8 rounded-full bg-warning/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <i class="mdi mdi-cash text-warning text-sm md:text-lg"></i>
                </div>
                <div>
                  <p class="text-textPrimary font-medium text-sm md:text-base">Ahorros significativos sin comprometer estilo</p>
                  <p class="text-textPrimary opacity-70 text-xs md:text-sm">Precios accesibles, calidad asegurada</p>
                </div>
              </div>
            </div>

            <!-- Botones de acción -->
            <div class="flex flex-col sm:flex-row gap-3 mb-6">
              <button @click="$emit('shop-now')"
                class="px-4 md:px-6 py-2.5 md:py-3 bg-warning text-white font-bold rounded-full hover:bg-highlight transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center group text-sm md:text-base">
                <span>Ver Catálogo</span>
                <i class="mdi mdi-arrow-right ml-1 md:ml-2 group-hover:translate-x-1 transition-transform"></i>
              </button>
            </div>

            <!-- Stats simples -->
            <div class="flex flex-wrap gap-4 md:gap-6">
              <div class="flex items-center gap-2">
                <div class="w-6 h-6 md:w-8 md:h-8 rounded-full bg-warning/20 flex items-center justify-center">
                  <i class="mdi mdi-package-variant text-warning text-sm md:text-base"></i>
                </div>
                <div>
                  <p class="text-textPrimary font-semibold text-sm md:text-base">Productos únicos</p>
                  <p class="text-textPrimary opacity-70 text-xs md:text-sm">Disponibles</p>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-6 h-6 md:w-8 md:h-8 rounded-full bg-warning/20 flex items-center justify-center">
                  <i class="mdi mdi-truck-fast text-warning text-sm md:text-base"></i>
                </div>
                <div>
                  <p class="text-textPrimary font-semibold text-sm md:text-base">Envío rápido</p>
                  <p class="text-textPrimary opacity-70 text-xs md:text-sm">A todo el país</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineEmits(['shop-now', 'scroll-to-products'])
</script>

<style scoped>
.animation-delay-1000 {
  animation-delay: 1s;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

/* Colores personalizados - si ya los tienes globalmente, puedes eliminar */
.text-warning { color: #a74792; }
.bg-warning { background-color: #a74792; }
.hover\:bg-highlight:hover { background-color: #d973b8; }
.bg-warning\/10 { background-color: rgba(167, 71, 146, 0.1); }
.bg-warning\/20 { background-color: rgba(167, 71, 146, 0.2); }
.border-warning\/20 { border-color: rgba(167, 71, 146, 0.2); }
.border-warning\/30 { border-color: rgba(167, 71, 146, 0.3); }
</style>