<template>
  <router-view />
  <v-overlay :model-value="overlay" class="align-center justify-center" scrim="#036358">
    <v-progress-circular color="#1E88E5" indeterminate size="90" width="10"></v-progress-circular>
  </v-overlay>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import router from './router';
import { verificarSessao } from './services/login';
import { estado } from '@/plugins/estado';
import 'vue3-toastify/dist/index.css';
var overlay = computed(() => {
  if (estado.carregando && !estado.silenciar) {
    return true
  }
   return false
})
const sessionIsValid = () => {
  let sessao = verificarSessao()
  if (sessao) {
    router.push('/sistemas')
  }
}
sessionIsValid()

</script>
