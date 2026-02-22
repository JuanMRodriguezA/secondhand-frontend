<template>
  <section class="relative bg-transparent py-8 md:py-12">
    <div class="container mx-auto px-4 md:px-6">
      <!-- Encabezado -->
      <div class="flex flex-col items-center mb-8 md:mb-12">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 bg-white/80 border border-warning/30 text-warning rounded-full text-sm font-semibold mb-3 md:mb-4">
          <i class="mdi mdi-truck text-base"></i>
          Entrega rápida y segura
        </div>
        
        <h2 class="text-3xl md:text-4xl font-bold text-textPrimary mb-2 md:mb-3 text-center">
          Métodos de Entrega
        </h2>
        <p class="text-textPrimary opacity-80 text-center max-w-2xl text-sm md:text-base">
          Llevamos Zoe a todo Uruguay. Elige la opción que mejor se adapte a ti.
        </p>
      </div>

      <!-- Tarjetas de métodos -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <!-- Entrega Presencial -->
        <div class="bg-white/95 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-warning/20 shadow-lg hover:shadow-xl transition-all duration-300">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-14 h-14 md:w-16 md:h-16 rounded-full bg-warning/10 flex items-center justify-center flex-shrink-0">
              <i class="mdi mdi-handshake text-warning text-2xl md:text-3xl"></i>
            </div>
            <div>
              <h3 class="text-xl md:text-2xl font-bold text-textPrimary">Entrega Presencial</h3>
              <p class="text-textPrimary opacity-70 text-sm md:text-base">Solo Montevideo</p>
            </div>
          </div>
          
          <div class="space-y-4">
            <div class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-warning/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <i class="mdi mdi-check text-warning text-xs"></i>
              </div>
              <div>
                <p class="text-textPrimary font-medium text-sm md:text-base">Retiro en puntos de encuentro</p>
                <p class="text-textPrimary opacity-70 text-xs md:text-sm">3 ubicaciones en Montevideo</p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-warning/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <i class="mdi mdi-check text-warning text-xs"></i>
              </div>
              <div>
                <p class="text-textPrimary font-medium text-sm md:text-base">Puedes probarte el calzado</p>
                <p class="text-textPrimary opacity-70 text-xs md:text-sm">Esto asegura que sea tu talle</p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-warning/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <i class="mdi mdi-check text-warning text-xs"></i>
              </div>
              <div>
                <p class="text-textPrimary font-medium text-sm md:text-base">Pago en efectivo disponible</p>
                <p class="text-textPrimary opacity-70 text-xs md:text-sm">Solo en esta modalidad</p>
              </div>
            </div>
          </div>

          <div class="bg-warning/10 rounded-xl p-4 border border-warning/20 mt-6">
            <div class="flex items-start gap-3">
              <i class="mdi mdi-information text-warning text-lg mt-0.5 flex-shrink-0"></i>
              <p class="text-textPrimary text-sm">
                Ideal si vives en Montevideo y prefieres ver las prendas antes de llevártelas.
              </p>
            </div>
          </div>
        </div>

        <!-- Cadetería -->
        <div class="bg-white/95 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-warning/20 shadow-lg hover:shadow-xl transition-all duration-300">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-14 h-14 md:w-16 md:h-16 rounded-full bg-warning/10 flex items-center justify-center flex-shrink-0">
              <i class="mdi mdi-truck-fast text-warning text-2xl md:text-3xl"></i>
            </div>
            <div>
              <h3 class="text-xl md:text-2xl font-bold text-textPrimary">Cadetería</h3>
              <p class="text-textPrimary opacity-70 text-sm md:text-base">Todo Uruguay</p>
            </div>
          </div>
          
          <div class="space-y-4 mb-6">
            <div class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-warning/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <i class="mdi mdi-check text-warning text-xs"></i>
              </div>
              <div>
                <p class="text-textPrimary font-medium text-sm md:text-base">Envío a domicilio</p>
                <p class="text-textPrimary opacity-70 text-xs md:text-sm">En 24-48hs hábiles</p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-warning/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <i class="mdi mdi-check text-warning text-xs"></i>
              </div>
              <div>
                <p class="text-textPrimary font-medium text-sm md:text-base">Seguimiento en tiempo real</p>
                <p class="text-textPrimary opacity-70 text-xs md:text-sm">Te enviamos el código de seguimiento</p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-warning/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <i class="mdi mdi-check text-warning text-xs"></i>
              </div>
              <div>
                <p class="text-textPrimary font-medium text-sm md:text-base">Seguro incluido</p>
                <p class="text-textPrimary opacity-70 text-xs md:text-sm">Tu compra protegida durante el envío</p>
              </div>
            </div>
          </div>

          <!-- Nota informativa para Cadetería -->
          <div class="bg-warning/10 rounded-xl p-4 border border-warning/20">
            <div class="flex items-start gap-3">
              <i class="mdi mdi-shield-check text-warning text-lg mt-0.5 flex-shrink-0"></i>
              <p class="text-textPrimary text-sm">
                Trabajamos con varias empresas de cadeteria.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// No necesita props por ahora
</script>

<style scoped>
.text-warning {
  color: #a74792;
}

.bg-warning\/10 {
  background-color: rgba(167, 71, 146, 0.1);
}

.bg-warning\/20 {
  background-color: rgba(167, 71, 146, 0.2);
}

.border-warning\/20 {
  border-color: rgba(167, 71, 146, 0.2);
}

.border-warning\/30 {
  border-color: rgba(167, 71, 146, 0.3);
}

.backdrop-blur-sm {
  backdrop-filter: blur(8px);
}

/* Animación sutil para la sección */
section {
  animation: fadeIn 0.6s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>