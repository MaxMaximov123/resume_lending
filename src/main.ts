import { createApp } from 'vue'
import { MotionPlugin } from '@vueuse/motion'
import App from './App.vue'
import './styles/main.css'

createApp(App).use(MotionPlugin).mount('#app')
