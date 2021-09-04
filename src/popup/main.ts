import  ElementPlus  from 'element-plus'
import { createApp } from 'vue'
import App from './App.vue'
import * as icons from '@element-plus/icons'
import 'element-plus/dist/index.css'
const app = createApp(App)
Object.keys(icons).forEach(icon => {
  console.log('incosn', icon)
  app.component(icon)
})
app.use(ElementPlus).mount('#app')
