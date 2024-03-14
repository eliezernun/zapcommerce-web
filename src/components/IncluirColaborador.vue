<template>
    <v-row justify-md="center">
        <v-card width="500" height="500">
            <v-card-title>Incluir novo colaborador:</v-card-title>
            <v-card-text>
                <v-container>
                    <v-text-field label="nome completo" v-model="colaborador.nome"></v-text-field>
                    <v-text-field label="documento" v-model="colaborador.documento" @input="formatarDocumento"></v-text-field>
                    <v-text-field label="celular" v-model="colaborador.celular"></v-text-field>
                    <v-text-field label="nascimento" v-model="colaborador.nascimento" @input="formatDate"></v-text-field>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer><v-btn color="green" @click="salvar">Salvar</v-btn><v-spacer></v-spacer><v-btn
                    color="red" @click="fechar">cancelar</v-btn><v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
    </v-row>
</template>

<script lang="ts">
import { incluirColaborador } from '@/services/colaboradores';
import { dateFormatter, dateTimeFormatter } from '@/utils/Date';
import { formatarCPF } from '@/utils/documetos';


export default {
    name: 'IncluirColaborador',
    data() {
        return {
            colaborador: {
                nome: null as unknown as String | String,
                documento: null as unknown as String | String,
                celular: null as unknown as String | String,
                nascimento: null as unknown as String | String,
            }
        }

    },
    methods: {
        fechar() {
            this.$emit('close');
        },
        async salvar() {
            let date = {
                colaborador_nome: this.colaborador.nome,
                colaborador_telefone: this.colaborador.celular,
                colaborador_documento: this.colaborador.documento,
                colaborador_nascimento: new Date(dateTimeFormatter(this.colaborador.nascimento))
            };
            let sucesso = await incluirColaborador(date);
            if(sucesso){
                this.fechar();
            }
        },
        formatDate() {
            const inputValue = this.colaborador.nascimento.replace(/\D/g, ''); // Remove non-numeric characters
            if (inputValue.length === 8) {
                this.colaborador.nascimento = dateFormatter(inputValue);
            }
        },
        formatarDocumento(){
            if(this.colaborador.documento.length > 10){
                this.colaborador.documento = formatarCPF(String(this.colaborador.documento))
            }
        }
    }
}
</script>
