<template>
    <div>
    <v-img
      class="mx-auto my-6"
      max-width="228"
      src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"
    ></v-img>

    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
      <div class="text-subtitle-1 text-medium-emphasis">Usuário:</div>

      <v-text-field
        density="compact"
        placeholder="E-mail de acesso"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Senha

        <a
          class="text-caption text-decoration-none text-blue"
          href="#"
          rel="noopener noreferrer"
          @click.prevent="navigate"
        >
          Esqueceu sua senha?</a>
      </div>

      <v-text-field
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        placeholder="Senha de acesso"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible = !visible"
      ></v-text-field>

      <v-card
        class="mb-12"
        color="surface-variant"
        variant="tonal"
      >
        <v-card-text class="text-medium-emphasis text-caption">
          Atenção: Caso sejam feitas 3 tentativas de login sem sucesso, seu usuário sera bloqueado por segurança.
          Caso tenha problemas com sua senha, clique em "Esqueceu sua senha?".
        </v-card-text>
      </v-card>

      <v-btn
        block
        class="mb-8"
        color="blue"
        size="large"
        variant="tonal"
        @click="autenticar"
      >
        Log In
      </v-btn>
      <!---
      <v-card-text class="text-center">
        <a
          class="text-blue text-decoration-none"
          href="#"
          rel="noopener noreferrer"
          target="_blank"
        >
          Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
        </a>
      </v-card-text> -->
    </v-card>
  </div>
</template>
<script lang="ts">
import router from '@/router';
import { login } from '@/services/login'
export default {
    name: 'Login',
    data: () => ({
      visible: false,
    }),
    methods: {
      async autenticar () {
          const resp = await login({email: 'silvanalucca.edu@gmail.com', senha:'WrAS@lnS'})
          if(resp === true) this.$router.push('/sistemas')
      },
      navigate(){
        this.$router.push('/recuperar-senha')
      }
    }
}
</script>