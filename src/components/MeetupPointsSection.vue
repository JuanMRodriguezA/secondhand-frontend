<template>
  <section class="relative bg-transparent py-8 md:py-12">
    <div class="container mx-auto px-4 md:px-6">
      <!-- Encabezado -->
      <div class="flex flex-col items-center mb-8 md:mb-12">
        <div
          class="inline-flex items-center gap-2 px-4 py-1.5 bg-white/80 border border-warning/30 text-warning rounded-full text-sm font-semibold mb-3 md:mb-4">
          <i class="mdi mdi-map-marker text-base"></i>
          Retiro personal
        </div>

        <h2 class="text-3xl md:text-4xl font-bold text-textPrimary mb-2 md:mb-3 text-center">
          Puntos de Entrega Presencial
        </h2>
        <p class="text-textPrimary opacity-80 text-center max-w-2xl text-sm md:text-base">
          Retira tu compra personalmente en estos puntos dentro de Montevideo.
          Coordinamos día y horario por WhatsApp después de tu compra.
        </p>
      </div>

      <!-- Grid de puntos de entrega -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 md:mb-12">
        <!-- Punto 1 - Centro -->
        <div
          class="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-warning/20 shadow-lg hover:shadow-xl transition-all duration-300">
          <div class="flex items-start gap-4 mb-4">
            <div class="w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center flex-shrink-0">
              <i class="mdi mdi-map-marker text-warning text-xl"></i>
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-bold text-textPrimary">Centro</h3>
              <p class="text-textPrimary opacity-70 text-sm">Zona Ciudad Vieja</p>
            </div>
          </div>

          <!-- Dirección -->
          <div class="mb-4">
            <div class="flex items-start gap-2 mb-2">
              <i class="mdi mdi-map-marker-radius text-warning text-sm mt-0.5 flex-shrink-0"></i>
              <p class="text-textPrimary text-sm font-medium">
                Café La Farmacia, Ciudad Vieja 1234
              </p>
            </div>
          </div>

          <p class="text-textPrimary opacity-90 mb-4 text-sm">
            Punto de encuentro en café céntrico. Ideal para quienes trabajan o estudian en la zona.
          </p>
        </div>

        <!-- Punto 2 - Cordón -->
        <div
          class="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-warning/20 shadow-lg hover:shadow-xl transition-all duration-300">
          <div class="flex items-start gap-4 mb-4">
            <div class="w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center flex-shrink-0">
              <i class="mdi mdi-store text-warning text-xl"></i>
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-bold text-textPrimary">Cordón</h3>
              <p class="text-textPrimary opacity-70 text-sm">Showroom por cita</p>
            </div>
          </div>

          <!-- Dirección -->
          <div class="mb-4">
            <div class="flex items-start gap-2 mb-2">
              <i class="mdi mdi-map-marker-radius text-warning text-sm mt-0.5 flex-shrink-0"></i>
              <p class="text-textPrimary text-sm font-medium">
                Av. 18 de Julio 5678, Cordón
              </p>
            </div>
          </div>

          <p class="text-textPrimary opacity-90 mb-4 text-sm">
            Espacio exclusivo para probarte las prendas. Se coordina con 24hs de anticipación.
          </p>
        </div>

        <!-- Punto 3 - Pocitos -->
        <div
          class="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-warning/20 shadow-lg hover:shadow-xl transition-all duration-300">
          <div class="flex items-start gap-4 mb-4">
            <div class="w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center flex-shrink-0">
              <i class="mdi mdi-home text-warning text-xl"></i>
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-bold text-textPrimary">Pocitos</h3>
              <p class="text-textPrimary opacity-70 text-sm">Domicilio particular</p>
            </div>
          </div>

          <!-- Dirección -->
          <div class="mb-4">
            <div class="flex items-start gap-2 mb-2">
              <i class="mdi mdi-map-marker-radius text-warning text-sm mt-0.5 flex-shrink-0"></i>
              <p class="text-textPrimary text-sm font-medium">
                Calle Solís 9012, Pocitos
              </p>
            </div>
          </div>

          <p class="text-textPrimary opacity-90 mb-4 text-sm">
            Retiro en domicilio de la vendedora. Ambiente familiar y cómodo para probarte.
          </p>
        </div>
      </div>

      <!-- Sección de coordinación -->
      <div class="bg-warning/5 rounded-2xl p-6 md:p-8 border border-warning/20">
        <div class="flex flex-col lg:flex-row items-center gap-6 md:gap-8">
          <!-- QR en escritorio, espacio reservado en móvil -->
          <div class="lg:w-1/4 text-center">
            <!-- QR solo visible en escritorio -->
            <div class="hidden lg:block w-48 h-48 mx-auto bg-white rounded-xl border border-warning/20 p-3 shadow-lg">
              <!-- QR placeholder - reemplazar con QR real -->
              <div class="w-full h-full bg-warning/10 rounded flex items-center justify-center">
                <img src="..\assets\qrwpp.png" alt="QR">
              </div>
            </div>
            <!-- Texto para móvil -->
            <div class="lg:hidden mb-4">
              <div class="w-16 h-16 rounded-full bg-warning/10 flex items-center justify-center mx-auto">
                <i class="mdi mdi-whatsapp text-warning text-2xl"></i>
              </div>
            </div>
          </div>

          <div class="lg:w-3/4 text-center lg:text-left">
            <h4 class="text-lg md:text-xl font-bold text-textPrimary mb-3">¿Cómo comprar?</h4>
            <p class="text-textPrimary opacity-90 mb-6 text-sm md:text-base max-w-2xl mx-auto lg:mx-0">
              Elegí tus productos en nuestra tienda online, luego comunicate por WhatsApp 
              para concretar la compra y coordinar el método de entrega que te quede más cómodo.
            </p>
            <div class="flex flex-col items-center lg:items-start gap-3">
              <a href="https://wa.me/59899969774?text=Hola,%20quiero%20consultar%20sobre%20los%20productos%20y%20cómo%20comprar"
                target="_blank"
                class="px-6 py-3 bg-warning text-white font-bold rounded-full hover:bg-highlight transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center gap-2 text-sm md:text-base">
                <i class="mdi mdi-whatsapp text-lg"></i>
                Consultar por WhatsApp
              </a>
              <p class="text-textPrimary opacity-70 text-xs">
                Respondemos todas tus dudas antes de que decidas comprar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Se puede agregar props si los puntos vienen de una API
</script>

<style scoped>
.text-warning {
  color: #a74792;
}

.bg-warning {
  background-color: #a74792;
}

.hover\:bg-highlight:hover {
  background-color: #d973b8;
}

.bg-warning\/5 {
  background-color: rgba(167, 71, 146, 0.05);
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