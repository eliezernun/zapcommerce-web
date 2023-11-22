<template>
    <div class="center">
        <v-card class="py-8 px-6 text-center" elevation="12" max-width="800" width="100%">
            <div>
                <div v-if="currentStep === 1">
                    <!-- Step 1 content -->
                    <v-card elevation="0">
                        <v-card-text>
                            <v-row><v-spacer></v-spacer><v-img width="96" height="96"
                                    src="https://zapcommerce.blob.core.windows.net/imagens-frontend/public/password-96.png"></v-img><v-spacer></v-spacer></v-row>
                        </v-card-text>
                        <v-card-title>Esqueceu sua senha?</v-card-title>
                        <v-card-subtitle>Informe o email de acesso:</v-card-subtitle>
                        <v-card-text>
                            <v-row>
                                <v-spacer></v-spacer>
                                <v-text-field density="compact" placeholder="email de acesso"
                                    prepend-inner-icon="mdi-email-outline" variant="outlined" 
                                    hint="informe o email utilizado para acessar a plataforma!"
                                    v-model="emailPrincipal"
                                    :rules="[rules.email]"></v-text-field>
                                <v-spacer></v-spacer>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </div>
                <div v-if="currentStep === 2">
                    <v-card elevation="0">
                        <v-card-text>
                            <v-row><v-spacer></v-spacer><v-img width="96" height="96"
                                    src="https://zapcommerce.blob.core.windows.net/imagens-frontend/public/password-96.png"></v-img><v-spacer></v-spacer></v-row>
                        </v-card-text>
                        <v-card-title>Usuário identificado!</v-card-title>
                        <v-card-subtitle>Para continuar informe os seguintes dados:</v-card-subtitle>
                        <v-card-text>
                            <v-row>
                                <v-spacer></v-spacer>
                                <v-text-field density="compact" label="nome completo:" placeholder="ex: Jão Carlos Oliveira"
                                    prepend-inner-icon="mdi-account-circle-outline"  variant="outlined"
                                    hint="O nome deve ser indêntico ao cadastrado!" v-model="nomeCompleto" :rules="[ rules.size, rules.palavras ]"></v-text-field>
                                <v-spacer></v-spacer>
                            </v-row>
                            <v-row>
                                <v-spacer></v-spacer>
                                <v-text-field density="compact" label="email de recuperação"
                                    placeholder="ex: emailrecuperacao@exemplo.com" prepend-inner-icon="mdi-email-outline"
                                    type="email" variant="outlined" v-model="emailRecuperacao" :rules="[ rules.email ]"
                                    hint="você deve ter acesso a esse email!"></v-text-field>
                                <v-spacer></v-spacer>
                            </v-row>
                            <v-row>
                                <v-spacer></v-spacer>
                                <v-text-field density="compact" label="Data de nascimento" placeholder="01/01/1990"
                                    prepend-inner-icon="mdi-calendar-range" variant="outlined" v-model="dataNascimento"
                                    hint="segindo o formato dia/mes/ano" @input="handleDateInput"></v-text-field>
                                <v-spacer></v-spacer>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </div>
                <div v-if="currentStep === 3">
                    <v-card elevation="0">
                        <v-icon icon="mdi-email-fast" size="100" color="primary"></v-icon>
                        <v-card-title color="primary">Sucesso!</v-card-title>
                        <v-card-text>O email de recuperação foi enviado com sucesso.<br>
                         <strong>Verifique sua caixa de entrada, span e lixeira!</strong>
                         <br> você será enviado para o login em instantes...
                        </v-card-text>
                    </v-card>
                </div>
            </div>
            <v-card-actions v-if="currentStep < 3">
                <v-row>
                    <v-spacer></v-spacer>
                    <v-btn elevation="5" @click="handleNext" v-if="currentStep < 3">{{ currentStep == 2 ? 'Soliciatar' :
                        'Próximo' }}</v-btn>
                    <v-spacer></v-spacer>
                </v-row>
            </v-card-actions>
        </v-card>
    </div>
</template>
  
<script lang="ts">
import { validar, recuperar } from '@/services/senhas';
import { dateFormatter, dateTimeFormatter } from '@/utils/Date';

export default {
    name: 'RecuperarSenha',
    data() {
        return {
            currentStep: 2,
            emailPrincipal: 'eliezernun@gmail.com',
            emailRecuperacao:'eliezer.nunes@embracon.com.br',
            dataNascimento: '14/02/1995',
            nomeCompleto: 'Eliezer Nunes Rodrigues Junior',
            rules: {
                size:(value : string) => value.length > 3 || 'Nome inválido!' ,
                palavras: (value : string) => {const pattern = /\b\w+\b/g
                    let test = value.match(pattern)
                    let result = test && test.length > 1
                    return  result || 'Informe seu nome completo!'
                },
                email: (value: string) => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || 'email inválido!'
                }
            }


        };
    },
    methods: {
        handleDateInput(){
            this.dataNascimento = this.dataNascimento.replace(/\D/g, '')
            const inputValue = this.dataNascimento; // Remove non-numeric characters
            if (inputValue.length === 8) {
                this.dataNascimento = dateFormatter(inputValue);
            }
        },
        async handleNext() {
            if (this.currentStep == 1) {
               let isValido = await validar({email: this.emailPrincipal})
               if(isValido){
                this.currentStep += 1;
               }
               return;
            }
            if(this.currentStep == 2){
                console.info('aqui')
                let dataNormalizada = dateTimeFormatter(this.dataNascimento);
                let isValido = await recuperar({
                    recuperacao_email: this.emailRecuperacao, 
                    recuperacao_email_principal: this.emailPrincipal,
                    recuperacao_nascimento: dataNormalizada,
                    recuperacao_nome: this.nomeCompleto
                    })
                
                if(isValido){
                    this.currentStep += 1;
                    setInterval(()=>{
                        this.$router.push('/')
                    }, 10000)
                }
            }
        },
        handlePrevious() {
            console.info('Previous');
            this.currentStep -= 1;
        },
    },
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
  