<template>
  <Teleport to="body">
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center p-4" @click.self="cancel">
      <div class="absolute inset-0 bg-black/30 backdrop-blur-sm" @click="cancel"></div>
      <div class="relative bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl max-w-md w-full p-6 border border-[#a74792]/20 transform transition-all duration-300 scale-100 opacity-100">
        <div class="text-center">
          <div class="mx-auto w-16 h-16 mb-4 rounded-full bg-[#f25081]/10 flex items-center justify-center">
            <i class="mdi mdi-alert-circle text-4xl text-[#f25081]"></i>
          </div>
          <h3 class="text-xl font-bold text-[#2D1E3E] mb-2">{{ title }}</h3>
          <p class="text-[#2D1E3E]/70 mb-6">{{ message }}</p>
          <div class="flex gap-3 justify-center">
            <button @click="cancel" class="px-6 py-2.5 rounded-full border border-[#a74792]/30 text-[#2D1E3E] font-medium hover:bg-gray-100 transition-colors active:scale-95">
              Cancelar
            </button>
            <button @click="confirm" class="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#a74792] to-[#d973b8] text-white font-medium hover:shadow-lg transition-all active:scale-95">
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
defineProps({
  show: Boolean,
  title: String,
  message: String
})
const emit = defineEmits(['confirm', 'cancel'])

const cancel = () => emit('cancel')
const confirm = () => emit('confirm')
</script>