import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { registerSW } from 'virtual:pwa-register' // Add this

import App from './App.vue'
import router from './router'

registerSW() // Add this


const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

