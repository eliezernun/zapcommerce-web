// Composables
import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Sistema/Login.vue'
import { userStore } from '@/store/user'
import Sistemas from '@/views/Sistema/Sistemas.vue'
import Logout from '@/views/Sistema/Logout.vue'
import RecuperarSenha from '@/views/Sistema/RecuperarSenha.vue'
import AgendaMain from '@/views/agenda/AgendaMain.vue'
import Clientes from '@/views/agenda/Clientes.vue'
import Usuarios from '@/views/agenda/Usuarios.vue'
import NovaSenhaToken from '@/views/Sistema/NovaSenhaToken.vue'
import { Modulos } from '@/types/enums/modulos'

const routes = [
  {
    path: '/',
    component: Login,
  },
  {
    path: '/sair',
    component: Logout,
  },
  {
    path: '/recuperar-senha',
    component: RecuperarSenha,
  },
  {
    path: '/recuperar-senha/:token',
    props: true,
    component: NovaSenhaToken
  },
  {
    path: '/sistemas',
    component: Sistemas,
    meta: { autenticado: true }
  },
  {
    path: '/agenda',
    component: AgendaMain,
    meta: { autenticado: true, contexto: Modulos.AGENDA },
    children: [
      {
        path: '/agenda/clientes',
        component: Clientes
      },
      {
        path:'/agenda/colaboradores',
        component: Usuarios
      },
      {
        path: '/agenda/usuarios',
        component: Usuarios
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const storage = userStore();
  const autenticado = storage.getAutenticado();
  if (to.matched.some(record => record.meta.autenticado) && !autenticado) {
    next('/')
    return;
  }
  next()
})

export default router
