import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './axios'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import 'bootstrap'


createApp(App).use(store).use(router).mount('#app')
