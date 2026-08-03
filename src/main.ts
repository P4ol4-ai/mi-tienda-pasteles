import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const app = createApp(App)

// IMPORTANTE: Registrar Pinia y Router antes de montar (#app)
app.use(createPinia())
app.use(router)

app.mount('#app')