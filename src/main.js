import './assets/main.css'
import { createI18n } from 'vue-i18n'


import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "bootstrap-icons/font/bootstrap-icons.min.css";

// Import our custom CSS
import '/src/assets/styles.scss'
import { messages } from './i18n'

const app = createApp(App)

const i18n = createI18n(messages)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.mount('#app')
