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
                <v-text-field label="Nome completo" hint="O nome do usuario é obrigatório!" persistent-hint
                  required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="e-mail acesso:" required disabled></v-text-field>
              </v-col>
              <v-col cols="10">
                <v-text-field label="e-mail recuperação:" type="email" @blur="hadleInput" required
                  :disabled="formControl.editarEmailRecuperacao" :readonly="formControl.ativo" :rules="rulesEmail"
                  hide-details="auto">
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
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field label="Data de Nascimento:" required v-model="formData.formattedDate" @input="formatDate"
                  placeholder="DD/MM/AAAA"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
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
  <v-dialog width="500"  v-model="confirmarAlteracao">

    <template>
      <v-card title="Dialog">
        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Close Dialog" @click=" () => alert('1')"></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
  
<script lang="ts">
import { emailValid } from '@/utils/Email'
import { alterarEmail } from '@/services/email';
import { userStore } from '@/store/user'
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
      verificandoEmail: false,
      confirmarAlteracao: false,
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
      let user = userStore().getUsuario()
      this.formData.email = user?.email_principal != undefined ? user?.email_principal : ''
      this.formData.emailRecuperacao = user?.email_recuperacao != undefined ? user?.email_recuperacao : ''
      this.formData.formattedDate = this.nascimento != undefined ? this.nascimento : '';
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
      return Math.min(100, this.formControl.value.length * 10)
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
        
        this.formData.formattedDate = `${day}/${month}/${year}`;
      }
    },
    editEmailRecuperacao() {
      this.formControl.ativo = false;
      this.formControl.editarEmailRecuperacao = !this.formControl.editarEmailRecuperacao;
    },
    hadleInput() {
      this.formControl.ativo = true;
      this.verificandoEmail = true;
    },
    async alterar(){
      let info = {
        id_usuario: 2,
        
      }
      //const validar = alterarEmail()
    }


  },
};
</script>
  