import { reactive } from 'vue';

export const estado = reactive({
  carregando: false,
  silenciar: false,
});

export const modalPerfil = reactive({
  exibir: false
})