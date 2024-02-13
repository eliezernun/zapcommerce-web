<template>
    <v-row justify-md="center">
        <v-card width="500" height="500">
            <v-card-title>Incluir novo colaborador:</v-card-title>
            <v-card-text>
                <v-container>
                    <v-text-field label="nome completo"></v-text-field>
                    <v-text-field label="documento"></v-text-field>
                    <v-text-field label="celular"></v-text-field>
                    <v-text-field label="nascimento"></v-text-field>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer><v-btn color="green">Salvar</v-btn><v-spacer></v-spacer><v-btn
                    color="red">cancelar</v-btn><v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
    </v-row>
</template>

<script lang="ts">
import { dateFormatter } from '@/utils/Date';

export default {
    name: 'IncluirColaborador',
    props: {
        principal: {
            type: Boolean
        },
    },
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
        updateExibir(newValue: any) {
            this.$emit('update:exibir', newValue);
        },
        salvar() {

        },
        formatDate() {
            const inputValue = this.colaborador.nascimento.replace(/\D/g, ''); // Remove non-numeric characters
            if (inputValue.length === 8) {
                this.colaborador.nascimento = dateFormatter(inputValue);
            }
        },
    }
}
</script>
