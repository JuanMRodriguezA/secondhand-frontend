<template>
  <div class="bg-white rounded-2xl p-6 border border-[#a74792]/20 shadow-sm hover:shadow-md transition-shadow">
    <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
      <span class="mdi mdi-human-male-height text-[#a74792]"></span>
      Guía de talles - Calzado
    </h3>
    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead>
          <tr class="bg-gradient-to-r from-[#a74792] to-[#d973b8] text-white rounded-t-lg">
            <th class="py-2 px-2 text-left font-semibold rounded-tl-lg">Talle</th>
            <th class="py-2 px-2 text-left font-semibold rounded-tr-lg">Largo plantilla (cm)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, idx) in sizeChart" :key="row.size" class="border-b border-gray-100 last:border-0 hover:bg-[#f8f0fa] transition-colors">
            <td class="py-2 px-2 text-gray-800">{{ row.size }}</td>
            <td class="py-2 px-2 text-gray-600">{{ row.cm }} cm</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p class="text-xs text-gray-500 mt-3 flex items-center gap-1">
      <span class="mdi mdi-information text-[#a74792]"></span>
      * Medida aproximada. Recomendamos comparar con un calzado que ya tengas.
    </p>
  </div>
</template>

<script setup>
const sizeChart = [
  { size: 35, cm: 22.5 },
  { size: 36, cm: 23.0 },
  { size: 37, cm: 23.5 },
  { size: 38, cm: 24.0 },
  { size: 39, cm: 24.5 },
  { size: 40, cm: 25.0 },
  { size: 41, cm: 25.5 },
  { size: 42, cm: 26.0 },
  { size: 43, cm: 26.5 },
  { size: 44, cm: 27.0 },
  { size: 45, cm: 27.5 }
]
</script>