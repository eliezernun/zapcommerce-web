<template>
    <div class="clientes-container">
        <v-data-table :headers="headers" :items="clientes" :sort-by="[{ key: 'nome', order: 'asc' }]" class="elevation-10">
            <template v-slot:top>
                <div class="title">
                    <v-toolbar-title><strong class="text-blue">MEUS CLIENTES:</strong></v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                </div>
            </template>
            <template v-slot:item.celular="{ item }">
                <div>
                    <v-chip :color="item.celular ? 'green' : 'red'" :text="celularMask(item.celular)" label
                        size="small"></v-chip>
                </div>
            </template>
            <template v-slot:item.isWhtasApp="{ item }">
                <div>
                    <v-chip :color="item.isWhtasApp ? 'green' : 'red'" :text="item.isWhtasApp ? 'Sim 🟢' : 'Não 🔴'"
                        class="text-uppercase" label size="small"></v-chip>
                </div>
            </template>
            <template v-slot:item.documento="{ item }">
                <div>
                    {{ cpfmask(item.documento) }}
                </div>
            </template>
            <template v-slot:item.isBloqueado="{ item }">
                <div>
                    <v-chip :color="item.isBloqueado ? 'red' : 'green'" :text="item.isBloqueado ? 'Sim' : 'Não'"
                        class="text-uppercase" label size="small"></v-chip>
                </div>
            </template>
            <template v-slot:item.id="{item}">
                <div>
                    <v-btn 
                    density="comfortable" 
                    icon="mdi-message-arrow-right-outline" 
                    :disabled="!item.isWhtasApp || !enviarMensagens"></v-btn>
                    <v-btn 
                    density="comfortable" 
                    icon="mdi-account-details"></v-btn>
                </div>
            </template>
        </v-data-table>
        <cliente-detalhes @clienteId="idSelecionado">
        </cliente-detalhes>
    </div>
</template>
<script lang="ts">
import ClienteDetalhes from '@/components/ClienteDetalhes.vue';
import { formatCelular } from '@/utils/celular';
import { formatarCPF } from '@/utils/documetos';
export default {
    name: 'Clientes',
    data() {
        return {
            idSelecionado: Number,
            enviarMensagens: true,
            headers: [
                { title: 'Nome', align: 'start', sortable: true, key: 'nome' },
                { title: 'Celular', align: 'start', sortable: true, key: 'celular' },
                { title: 'WhatsApp', align: 'center', sortable: false, key: 'isWhtasApp' },
                { title: 'Documento', align: 'center', sortable: true, key: 'documento' },
                { title: 'E-mail', align: 'start', sortable: false, key: 'email' },
                { title: 'Bloqueio', align: 'center', sortable: false, key: 'isBloqueado' },
                { title: 'Ações', align: 'center', sortable: false, key: 'id' }
            ],
            clientes: [
                {
                    id: 1,
                    nome: 'Eliezer Nunes Rodrigues Junior',
                    celular: '11945458475',
                    isWhtasApp: true,
                    documento: '42239650850',
                    email: 'eliezernun@gmail.com',
                    isBloqueado: false
                }
            ]
        };
    },
    methods: {
        celularMask(n: string) {
            return formatCelular(n);
        },
        cpfmask(n: string) {
            return formatarCPF(n);
        },
        envarMensagem(id: Number) {
        },
        detalharCliente(id: Number) {
            this.idSelecionado = id;
        }
    },
    components: { ClienteDetalhes }
}
</script>
<style>
.clientes-container {
    margin: 55px;
    width: 80vw;
    height: 80vh;
}

.clientes-sub-container {
    display: flex;
    flex: 1;
    width: 85%;
    height: 85%;
    background-color: #f1f1f11b;
}

.title {
    margin: 20px;
}
</style>