<template>
  <v-row justify="center">
    <v-dialog v-model="localExibir" persistent width="auto" transition="dialog-bottom-transition">
      <v-card>
        <v-card-title>
          <span class="text-h5">Meu Perfil</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="12">
                <v-text-field v-model="formData.nome" label="Nome completo" hint="O nome do usuario é obrigatório!"
                  persistent-hint required :disabled="formData.nome === '' ? false : true ? true : false"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="formData.email" label="e-mail acesso:" required disabled></v-text-field>
              </v-col>
              <v-col cols="10">
                <v-text-field label="e-mail recuperação:" type="email" required
                  v-model="formData.emailRecuperacao" :disabled="formControl.editarEmailRecuperacao"
                  :readonly="formControl.ativo" :rules="rulesEmail" hide-details="auto">
                  <template v-slot:loader>
                    <v-progress-linear :active="formControl.ativo" :model-value="progress" color="light-green-darken-1"
                      height="7" indeterminate></v-progress-linear>
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="2" justify-center align-self="center">
                <v-btn :color="formControl.editarEmailRecuperacao == false ? 'red-accent-3' : 'blue-darken-1'"
                  variant="text" @click="() => editEmailRecuperacao()">
                  {{ formControl.editarEmailRecuperacao == false ? 'Cancelar' : 'Alterar' }}
                </v-btn>
                <v-btn color="blue-darken-1"
                  :disabled="formControl.editarEmailRecuperacao == true ? true : false" 
                  variant="text" @click="() => confirmar()">
                  Confirmar
                </v-btn>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field label="Data de Nascimento:" required v-model="formData.formattedDate"
                  :disabled="formData.formattedDate == '' ? false : true" @input="formatDate"
                  placeholder="DD/MM/AAAA"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indica os campos obrigatórios</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="() => close()">
            Close
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="() => save()">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
  <v-dialog v-model="confirmarAlteracao">
    <confirmar-alteracao-email :email-recuperacao="formData.emailRecuperacao" :id-usuario="userId"/>
  </v-dialog>
</template>
  
<script lang="ts">
import { emailValid } from '@/utils/Email'
import { alterarEmail } from '@/services/email';
import { userStore } from '@/store/user'
import { dateFormatter, dateConverter } from '@/utils/Date';
import { ref } from 'vue';
import ConfirmarAlteracaoEmail from './ConfirmarAlteracaoEmail.vue';
export default {
    props: {
        exibir: Boolean,
        nome: String,
        nascimento: Date
    },
    data() {
        return {
            timeOut: setTimeout(this.enviarConfirmacao, 3000),
            localExibir: this.exibir,
            confirmarAlteracao: false,
            emailAntigo: '',
            userId: 0,
            timeInSeconds: 90,
            timerInterval: null as unknown as NodeJS.Timeout | NodeJS.Timeout,
            isTimerRunning: false,
            code: '',
            formControl: {
                editarEmailRecuperacao: true,
                value: '',
                ativo: false,
            },
            formData: {
                nome: '',
                email: '',
                emailRecuperacao: '',
                formattedDate: null as unknown as String | String
            },
            rulesEmail: [(value: any) => !!value || 'Preenchimento obrigatório!',
                (value: any) => !!emailValid(value) || 'O email informado é invalido!'
            ]
        };
    },
    beforeMount() {
        let user = userStore().getUsuario();
        console.info(user);
        this.emailAntigo = user?.email_recuperacao != undefined ? user?.email_recuperacao : '';
        this.userId = user?.id_usuario != undefined ? user.id_usuario : 0;
        this.formData.email = user?.email_principal != undefined ? user?.email_principal : '';
        this.formData.emailRecuperacao = user?.email_recuperacao != undefined ? user?.email_recuperacao : '';
        this.formData.formattedDate = this.nascimento != undefined ? dateConverter(String(this.nascimento)) : '';
        this.formData.nome = this.nome != undefined ? this.nome : '';
    },
    watch: {
        exibir(newVal) {
            this.localExibir = newVal;
        },
        localExibir(newVal) {
            this.$emit('update:exibir', newVal);
        },
    },
    computed: {
        progress(): any {
            return Math.min(100, this.formControl.value.length * 10);
        },
        formattedTime(): string {
            const minutes = Math.floor(this.timeInSeconds / 60);
            const seconds = this.timeInSeconds % 60;
            return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        },
    },
    methods: {
        close() {
            this.localExibir = false;
        },
        save() {
            // Add your save logic here if needed
            this.close(); // For simplicity, just close the dialog on save
        },
        formatDate() {
            const inputValue = this.formData.formattedDate.replace(/\D/g, ''); // Remove non-numeric characters
            if (inputValue.length === 8) {
                this.formData.formattedDate = dateFormatter(inputValue);
            }
        },
        editEmailRecuperacao() {
            this.formData.emailRecuperacao = this.emailAntigo;
            this.formControl.ativo = false;
            this.formControl.editarEmailRecuperacao = !this.formControl.editarEmailRecuperacao;
        },
        confirmar() {
            if (this.formData.emailRecuperacao != this.emailAntigo) {
                this.formControl.ativo = true;
                this.alterar();
            }
        },
        async alterar() {
            let info = {
                id_usuario: this.userId,
                email_anterior: this.emailAntigo,
                email_novo: this.formData.emailRecuperacao
            };
            const confirmar = await alterarEmail(info);
            this.formControl.ativo = false;
            if(confirmar){
                this.confirmarAlteracao = true;
            }
        },
        fechar(){
          this.confirmarAlteracao = false;
        },
        cancelar(){
          this.formData.emailRecuperacao = this.emailAntigo;
          this.confirmarAlteracao = false;
        }
    },
    components: { ConfirmarAlteracaoEmail }
};
</script>
<style>
.otp-input {
  text-align: center;
}
</style>