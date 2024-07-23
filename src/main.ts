import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
//@ts-ignore
import { mask } from 'vue-the-mask'
import Maska from 'maska'

const pinia = createPinia()
const app = createApp(App)

//@ts-ignore
app.use(router).use(pinia).directive("mask", mask).mount('#app')