<template>
  <div class="min-h-screen bg-gradient-to-b from-[#f8f6fa] to-white py-6 px-4">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-2xl md:text-3xl font-bold text-[#a74792] mb-6">Finalizar compra</h1>

      <!-- Estado vacío mejorado -->
      <div v-if="cartStore.itemCount === 0" class="flex flex-col items-center justify-center py-12 px-4">
        <div class="w-32 h-32 mb-6 rounded-full bg-[#f3e0ec] flex items-center justify-center">
          <span class="mdi mdi-cart-off text-5xl text-[#a74792] opacity-60"></span>
        </div>
        <h2 class="text-2xl font-semibold text-gray-700 mb-2">Tu carrito está vacío</h2>
        <p class="text-gray-500 text-center max-w-md mb-8">
          Parece que aún no has agregado nada. ¡Explora nuestro catálogo y encuentra las prendas que te encantan!
        </p>
        <router-link 
          to="/catalogo"
          class="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#a74792] to-[#d973b8] text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
        >
          <span class="mdi mdi-store"></span>
          Explorar productos
        </router-link>
      </div>

      <!-- Checkout con productos -->
      <div v-else class="space-y-6">
        <!-- Productos -->
        <div class="bg-white rounded-2xl shadow-lg p-5">
          <h2 class="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <span class="mdi mdi-cart text-[#a74792]"></span>
            Productos ({{ cartStore.itemCount }})
          </h2>
          <div class="divide-y">
            <CartItem
              v-for="item in cartStore.items"
              :key="item.id + (item.size || '')"
              :item="item"
              @remove="removeItem"
            />
          </div>
        </div>

        <!-- Método de entrega -->
        <DeliveryMethod
          v-model="deliveryMethod"
          :pickupPoints="pickupPoints"
          @update:address="deliveryAddress = $event"
          @update:pickupPoint="selectedPickupPoint = $event"
        />

        <!-- Método de pago -->
        <PaymentMethod v-model="paymentMethod" />

        <!-- Resumen y botón WhatsApp -->
        <div class="bg-white rounded-2xl shadow-lg p-5 sticky bottom-4">
          <div class="flex justify-between items-center mb-4">
            <span class="text-lg font-semibold text-gray-800">Total</span>
            <span class="text-2xl font-bold text-[#a74792]">${{ cartStore.subtotal.toFixed(2) }}</span>
          </div>

          <!-- Información adicional según método de entrega (solo en móvil se muestra aquí) -->
          <div v-if="deliveryMethod === 'presencial' && selectedPickupPoint" class="mb-4 p-3 bg-gray-50 rounded-xl text-sm">
            <p class="font-medium text-gray-700">Punto de encuentro:</p>
            <p class="text-gray-600">{{ selectedPickupPoint.address }}</p>
          </div>
          <div v-if="deliveryMethod === 'cadeteria' && deliveryAddress" class="mb-4 p-3 bg-gray-50 rounded-xl text-sm">
            <p class="font-medium text-gray-700">Dirección de envío:</p>
            <p class="text-gray-600 break-words">{{ deliveryAddress }}</p>
          </div>

          <button
            @click="sendWhatsApp"
            :disabled="!canSend"
            class="w-full py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full flex items-center justify-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed text-lg shadow-md hover:shadow-lg"
          >
            <span class="mdi mdi-whatsapp text-xl"></span>
            Enviar pedido por WhatsApp
          </button>
          <p class="text-xs text-gray-500 text-center mt-2">
            La vendedora te contactará para coordinar pago y entrega.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCartStore } from '@/stores/cartStore'
import { usePickupStore } from '@/stores/pickupPoints'
import CartItem from '@/components/checkout/Cartitem.vue'
import DeliveryMethod from '@/components/checkout/DeliveryMethod.vue'
import PaymentMethod from '@/components/checkout/PaymentMethod.vue'

// Definir la URL base del sitio (puede venir de variable de entorno)
const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://zoeindumentaria.com.uy'

const cartStore = useCartStore()
const pickupStore = usePickupStore()

const deliveryMethod = ref('presencial')
const paymentMethod = ref('efectivo')
const deliveryAddress = ref('')
const selectedPickupPoint = ref(null)

const pickupPoints = computed(() => pickupStore.getAllPoints)

const canSend = computed(() => {
  if (cartStore.itemCount === 0) return false
  if (deliveryMethod.value === 'cadeteria' && !deliveryAddress.value) return false
  if (deliveryMethod.value === 'presencial' && !selectedPickupPoint.value) return false
  return true
})

const removeItem = (item) => {
  cartStore.removeItem(item)
}

const generateWhatsAppMessage = () => {
  const storeName = 'ZOE INDUMENTARIA';
  const itemsList = cartStore.items.map(item => {
    const quantity = item.quantity || 1;
    const unitPrice = item.price;
    const lineTotal = unitPrice * quantity;
    const productUrl = `${SITE_URL}/producto/${item.id}`;
    return `🛍️ *${item.name}*${item.size ? ` (Talle ${item.size})` : ''}\n   Cantidad: ${quantity} x $${unitPrice.toFixed(2)} = *$${lineTotal.toFixed(2)}*\n   Ver producto: ${productUrl}`;
  }).join('\n\n');

  const deliveryText = deliveryMethod.value === 'presencial'
    ? `📍 *Retiro presencial*\n   Punto elegido: ${selectedPickupPoint.value.address}`
    : `🚚 *Envío por cadetería*\n   Dirección: ${deliveryAddress.value}`;

  const paymentMethods = {
    tarjeta: '💳 Tarjeta de crédito/débito (Mercado Pago)',
    transferencia: '🏦 Transferencia bancaria',
    mercadopago: '📱 Saldo Mercado Pago',
    efectivo: '💵 Efectivo (solo retiro presencial)'
  };
  const paymentText = paymentMethods[paymentMethod.value];

  return encodeURIComponent(
    `*🛍️ NUEVO PEDIDO - ${storeName}* 🛍️\n\n` +
    `*Productos:*\n${itemsList}\n\n` +
    `💰 *TOTAL: $${cartStore.subtotal.toFixed(2)}*\n\n` +
    `*Entrega:*\n${deliveryText}\n\n` +
    `*Pago:*\n${paymentText}\n\n`
  );
};

const sendWhatsApp = () => {
  if (!canSend.value) return
  const phone = '59893616093' // Número real de la tienda
  const message = generateWhatsAppMessage()
  window.open(`https://wa.me/${phone}?text=${message}`, '_blank')
}
</script>