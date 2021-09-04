import  ElementPlus  from 'element-plus'
import { router } from './router/index';
import { createApp } from 'vue'
import App from './App.vue'
import * as icons from '@element-plus/icons'
import 'element-plus/dist/index.css'
const app = createApp(App)
Object.keys(icons).forEach(iconName => {
  app.component(iconName, icons[iconName])
})
app.use(ElementPlus).use(router).mount('#app')
