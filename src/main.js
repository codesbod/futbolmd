import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "bootstrap-icons/font/bootstrap-icons.min.css";

// Import our custom CSS
import '/src/assets/styles.scss'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.mount('#app')
