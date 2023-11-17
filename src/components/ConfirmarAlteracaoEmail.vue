<template>
    
        <v-card class="py-8 px-6 text-center mx-auto ma-4" style="align-items: center;" elevation="12" max-width="700"
            width="100%">
            <h3 class="text-h6 mb-4">Verificar email</h3>

            <div class="text-body-2">
                Enviamos um email de confirmação para o email: <br><strong class="text-indigo-accent-2">{{
                    emailRecuperacao }}</strong><br>
                verifique seu email e infome o código abaixo
                <v-card-item color="surface" style="align-items: center;">
                    <v-row align="center" no-gutters>
                        <v-text-field class="otp-input" v-model="token" @input="handler"></v-text-field>
                    </v-row>
                </v-card-item>

                <v-btn class="my-4" color="indigo" height="40" text="Verificar" variant="flat" width="70%" @click="enviar"></v-btn>
                <div class="text-caption">
                    Não recebeu o código? <a href="#" @click.prevent="() => console.info('c')">Reenviar</a>
                </div>
            </div>
            <v-card-actions>
                <v-btn color="orange-darken-4" variant="text" @click="close">
                    Voltar
                </v-btn>
            </v-card-actions>
        </v-card>
</template>
  
<script lang="ts">
import { verificarEmail } from '@/services/email'
export default {
    props: {
        emailRecuperacao: String, // Pass any other necessary props
        idUsuario: Number
    },
    data() {
        return {
            token: ''
        }
    },
    // Add any other logic specific to the confirmarAlteracao dialog
    methods: {
        close() {
            return null;
        },
        handler(){
            this.token = this.token.replace(/\D/g, '')
        },
        async enviar(){
            const status = await verificarEmail(this.idUsuario || 0 , this.token);
            if(status === true){

            }
        }
    }
};
</script>
  
<style>
/* Add any styles specific to the confirmarAlteracao dialog */
</style>
  