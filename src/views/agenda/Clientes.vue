<template>
    <div class="clientes-container">
        <v-data-table :headers="headers" :items="clientes" :sort-by="[{ key: 'nome', order: 'asc' }]"
            class="elevation-10">
            <template v-slot:top>
               <div class="title">
                <v-toolbar-title><strong class="text-blue">MEUS CLIENTES:</strong></v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
               </div>
            </template>
        </v-data-table>
    </div>
</template>
<script lang="ts">

export default {

    name: 'Clientes',
    data() {
        return {
            headers: [
                { title: 'Nome', align: 'start', sortable: true, key: 'nome' },
                { title: 'Celular', align: 'start', sortable: true, key: 'celular' },
                { title: 'WhatsApp', align: 'center', sortable: false, key: 'isWhtasApp' },
                { title: 'Documento', align: 'center', sortable: true, key: 'documento' },
                { title: 'E-mail', align: 'start', sortable: false, key: 'email' },
                { title: 'Bloqueio', align: 'center', sortable: false, key: 'isBloqueado' }
            ],
            clientes: [
                {
                    nome: 'Eliezer Nunes Rodrigues Junior',
                    celular: '11945458475',
                    isWhtasApp: true,
                    documento: '42239650850',
                    email: 'eliezernun@gmail.com',
                    isBloqueado: false
                }
            ]
        }
    }
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
.title{
    margin: 20px;
}
</style>