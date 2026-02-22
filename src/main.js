import { createApp } from 'vue'
import App from './App.vue'
import './index.css'       // Tailwind cargado
import { createPinia } from 'pinia'
import router from './router/index'

import "@fontsource/playfair-display/600.css"
import '@mdi/font/css/materialdesignicons.css'

import "@fontsource/playfair-display/700.css"

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
