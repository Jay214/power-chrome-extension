import * as VueRouter from 'vue-router'
import App from '../popup/App.vue'

const routes = [
  {
    path: '/', component: App
  }
]
export const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
})