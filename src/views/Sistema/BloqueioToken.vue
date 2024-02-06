<template>
    <div class="center">
      <v-card class="py-8 px-6 text-center" elevation="12" max-width="800" width="100%">
        <div>
          <v-card elevation="0">
            <v-card-title>Iremos inutilizar o link, caso já tenha sido utilizado sua conta será bloqueada.</v-card-title>
            <v-card-subtitle>Entre em contato com o administrador do sistema para recuperar seu acesso!</v-card-subtitle>
            <v-card-text>
              Você será redirecionado para o login em {{ seconds - 1}} segundos!
            </v-card-text>
          </v-card>
        </div>
      </v-card>
    </div>
  </template>
  
  <script lang="ts">
  import { tokenBloqueio } from '@/services/senhas';
  
  export default {
    name: 'NovaSenhaToken',
    data() {
      return {
        token: this.$route.params.token,
        seconds: 6 // Defina o tempo inicial em segundos
      };
    },
  
    mounted() {
      // Inicie a contagem regressiva
      const intervalId = setInterval(() => {
        if (this.seconds > 0) {
          this.seconds--;
        } else {
          // Redirecione para a página de login quando o tempo atingir zero
          clearInterval(intervalId);
          this.$router.push('/login');
        }
      }, 1000);
  
      // Chame a função para bloquear o token
      //this.blockToken();
    },
  
    methods: {
      async blockToken() {
        try {
          await tokenBloqueio(this.token);
        } catch (error) {
          console.error('Erro ao bloquear token:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .center {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    margin: 0;
  }
  </style>
  