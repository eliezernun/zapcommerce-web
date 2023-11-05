// Composables
import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Sistema/Login.vue'

const routes = [
  {
    path: '/',
    component: Login,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

/*router.beforeEach((to, from, next)=>{

})*/

export default router
