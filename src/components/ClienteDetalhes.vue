<template>
    <v-row>
        <v-dialog v-model="exibir">
            <v-card>
                <v-card-title>Cliente: </v-card-title>
            </v-card>
        </v-dialog>
    </v-row>
</template>
<script lang="ts">
import { consultarCliente } from '@/services/clientes';

export default {
    name: 'ClienteDetalhes',
    props:{
        clienteId : {
            type : Number,
            required: true
        }
    },
    data() {
        return {
            exibir: false,
            cliente: {},
        }
    },
    async beforeMount() {
        this.cliente = await consultarCliente(this.clienteId);
    },
    methods:{
        proximoRegistro(){

        },
        registroAnterior(){

        }
    }

}
</script>