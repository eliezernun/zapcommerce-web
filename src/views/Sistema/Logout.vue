<template>
    <div class="center">
        <v-card class="py-8 px-6 text-center mx-auto ma-4" elevation="12" max-width="500" width="100%">
        <v-card-title>
            <span>Você será desconectado!</span>
        </v-card-title>
        <v-card-text>
            <v-container v-if="!expirado">
                <span> Estamos te desconectando com segurança <br>
                    Você será redirecionado em {{ segundos }} segundos...</span>
            </v-container>
            <v-container v-else>
                <span>
                    Não foi possivel validar sua sessão com segurança! <br>
                    Faça login novamente para continuar! <br>
                    Você será redirecionado em {{ segundos }} segundos...
                </span>
            </v-container>
        </v-card-text>
        <div class="text-caption">
            Não quer esperar clique <a href="#" @click.prevent="finalizarContador">aqui</a>
        </div>
        </v-card>
    </div>
</template>
<script lang="ts">
import { userStore } from '@/store/user';

export default {
    name: 'Logout',
    props: {
        expirado: Boolean,
    },
    data() {
        return {
            segundos: 5
        }
    },
    mounted() {
        this.destruir()
        this.iniciarContador()
    },
    methods: {
        iniciarContador() {
            const intervalId = setInterval(() => {
                this.segundos--;

                if (this.segundos === 0) {
                    this.finalizarContador();
                    clearInterval(intervalId);
                }
            }, 1000);
        },
        finalizarContador() {
            this.$router.push('/')
        },
        destruir() {
            userStore().destruir();
        }
    }
}
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