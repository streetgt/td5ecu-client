import Vue, { createApp } from '@vue/compat';

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'vue3-toastify/dist/index.css';

import './assets/main.scss'

import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)

import Vue3Toastify, {toast} from 'vue3-toastify';

app.use(Vue3Toastify, {autoClose: 2000, position: toast.POSITION.BOTTOM_RIGHT});

pinia.use(piniaPluginPersistedstate)

app.use(router)


app.mount('#app')