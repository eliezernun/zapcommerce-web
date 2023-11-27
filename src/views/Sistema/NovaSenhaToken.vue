<template>
    <div class="center">
        <v-card class="py-8 px-6 text-center" elevation="12" max-width="400" width="100%">
            <div v-if="!valido">
                <v-card elevation="0">
                    <v-card-title>Cadastrar nova senha:</v-card-title>
                    <v-card-subtitle></v-card-subtitle>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="6" md="12">
                                <v-text-field name="input-10-1" v-model="form.senha" label="nova senha"
                                    :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                    :type="show1 ? 'text' : 'password'" @click:append-inner="show1 = !show1"
                                    hint="A nova senha deve ter um carácter especial e no mínimo 8 caracteres"
                                    persistent-hint required
                                    :rules="[rules.counter, rules.email, rules.required]"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="6" md="12">
                                <v-text-field name="input-10-1" v-model="form.senha_replica" label="repita a nova senha"
                                    :append-inner-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                                    :type="show2 ? 'text' : 'password'" @click:append-inner="show2 = !show2" persistent-hint
                                    required :rules="[rules.counter, rules.email, rules.required]"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                    <small v-if="form.senha_replica && form.senha_replica.length >= 8 && form.senha !== form.senha_replica"><strong class="text-red-lighten-1">As senhas não são iguais</strong></small>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn :disabled="form.senha_replica && form.senha_replica.length >= 8 && form.senha !== form.senha_replica">Confirmar</v-btn>
                        <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>
            </div>
            <div v-else>
                <v-card elevation="0">
                    <v-card-title>Link de recuperação inválido</v-card-title>
                    <v-card-subtitle></v-card-subtitle>
                    <v-card-text>
                        Você será redirecionado para o login em 5 segundos!
                    </v-card-text>
                </v-card>
            </div>
        </v-card>
    </div>
</template>
<script lang="ts">
import { validarToken } from '@/services/senhas';
import { throwStatement } from '@babel/types';
import { formToJSON } from 'axios';
export default {
    name: 'NovaSenhaToken',
    data() {
        return {
            token: this.$route.params.token,
            valido: null as unknown as undefined | boolean,
            show1: false,
            show2: false,
            error: true,
            form: {
                senha: null as unknown as string | string,
                senha_replica: null as unknown as string | string
            },
            rules: {
                required: (value: string) => !!value || 'Preenchimento obrigatório!',
                counter: (value: string) => !!value && value.length > 8 || 'A senha deve conter no minimo 8 caracteres',
                email: (value: string) => {
                    const pattern = /[^a-zA-Z0-9\s]/;
                    return pattern.test(value) || 'A senha deve conter pelomenos 1 caracter especial (!@#$%¨&*()_+)';
                },
            }
        }
    },

    beforeMount() {
        const validar = async () => {
            this.valido = await validarToken(this.token);
            if (this.valido === false) {
                setTimeout(() => {
                    this.$router.push('/')
                }, 5000)
            }
        }
        // validar()
    },
    methods: {
        enviar() {

        },
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