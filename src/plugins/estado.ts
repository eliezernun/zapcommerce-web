import { reactive } from 'vue';

export const estado = reactive({
  carregando: false,
  silenciar: false,
});

export const modalPerfil = reactive({
  exibir: false
})

export const sneacksController = reactive({
    info:{
      exibir: false,
      text: '',
      timeout:  5000,
      tipo: '',
    },
})