import { defineStore } from 'pinia'
import { Usuario } from '@/types/user/usuario';

export const userStore = defineStore('user', {
  state: () => {
    return { 
      atuenticado: false,
      usuario: null as Usuario | null,
    }
  },
  actions: {
    setAutenticado(value: boolean) {
        this.atuenticado = value;
    },
    setUsuario(user: Usuario){
      this.usuario = user;
    }
  },
})