<template>
  <section class="payment-methods-section">
    <div class="mt-12 md:mt-16">
      <div class="flex flex-col items-center mb-8 md:mb-12">
        <div
          class="inline-flex items-center gap-2 px-4 py-1.5 bg-white/80 border border-warning/30 text-warning rounded-full text-sm font-semibold mb-3 md:mb-4">
          <i class="mdi mdi-credit-card-outline text-base"></i>
          Pagos seguros
        </div>

        <h2 class="text-3xl md:text-4xl font-bold text-textPrimary mb-2 md:mb-3 text-center">
          Métodos de Pago
        </h2>
        <p class="text-textPrimary opacity-80 text-center max-w-2xl text-sm md:text-base">
          Diversas opciones para que elijas la que más te convenga.
        </p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <!-- Tarjeta de crédito/débito (a través de Mercado Pago) -->
        <div class="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-warning/20 shadow-lg text-center">
          <div class="w-16 h-16 rounded-full bg-warning/10 flex items-center justify-center mx-auto mb-4">
            <i class="mdi mdi-credit-card text-warning text-2xl"></i>
          </div>
          <h3 class="text-lg font-bold text-textPrimary mb-2">Tarjetas</h3>
          <p class="text-textPrimary opacity-70 text-sm">Crédito y débito vía Mercado Pago</p>
        </div>

        <!-- Transferencia bancaria -->
        <div class="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-warning/20 shadow-lg text-center">
          <div class="w-16 h-16 rounded-full bg-warning/10 flex items-center justify-center mx-auto mb-4">
            <i class="mdi mdi-bank text-warning text-2xl"></i>
          </div>
          <h3 class="text-lg font-bold text-textPrimary mb-2">Transferencia</h3>
          <p class="text-textPrimary opacity-70 text-sm">Bancaria o BROU</p>
        </div>

        <!-- Mercado Pago (saldo) -->
        <div class="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-warning/20 shadow-lg text-center">
          <div class="w-16 h-16 rounded-full bg-warning/10 flex items-center justify-center mx-auto mb-4">
            <i class="mdi mdi-wallet text-warning text-2xl"></i>
          </div>
          <h3 class="text-lg font-bold text-textPrimary mb-2">Mercado Pago</h3>
          <p class="text-textPrimary opacity-70 text-sm">Saldo en cuenta</p>
        </div>

        <!-- Efectivo (presencial) -->
        <div class="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-warning/20 shadow-lg text-center">
          <div class="w-16 h-16 rounded-full bg-warning/10 flex items-center justify-center mx-auto mb-4">
            <i class="mdi mdi-cash text-warning text-2xl"></i>
          </div>
          <h3 class="text-lg font-bold text-textPrimary mb-2">Efectivo</h3>
          <p class="text-textPrimary opacity-70 text-sm">Solo al retirar</p>
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