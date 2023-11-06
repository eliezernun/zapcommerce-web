// Composables
import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Sistema/Login.vue'
import { userStore } from '@/store/user'
import Sistemas from '@/views/Sistema/Sistemas.vue'

const routes = [
  {
    path: '/',
    component: Login,
  },
  {
    path:'/sistemas',
    component: Sistemas
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next)=>{
const storage = userStore();
const autenticado = storage.getAutenticado();
  if(to.matched.some(record => record.meta.autenticado) && !autenticado){
    next('/')
    return;
  }
  next()
})

export default router
