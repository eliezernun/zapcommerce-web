<template>
    <v-card>
        <v-card-item 
          class="mx-auto"
          max-width="auto"
          label="primary"
          color="primary"
          value="primary">
            <v-card-title>Usuários cadastrados:</v-card-title>
            <v-spacer></v-spacer>
        </v-card-item>
        <v-card-item>
            <v-data-table :headers="headers" :items="uper" :sort-by="[{ key: 'nome', order: 'asc' }]">

            </v-data-table>
        </v-card-item>
    </v-card>
</template>
<script lang="ts">
import { Funcao } from '@/types/enums/funcao';

export default {
    name: 'UserList',
    props: {
        usuarios: Array,
    },
    data() {
        return {
            headers: [ 
                { title: 'user', align: 'start', sortable: true, key: 'email_principal' },
                { title: 'pessoa', align: 'start', sortable: true, key: 'nome_pessoa' },
                { title: 'status', align: 'center', sortable: true, key: 'isAtivo'},
                { title: 'funcao', align: 'start', sortable: true, key: 'funcao' },
            ],
            uper: [{
            email_principal: 'eliezernun@gmail.com', 
            nome_pessoa:'Eliezer Nunes Rodrugues Junior',
            isAtivo: true,
            funcao: Funcao.ADM
        }]
        }
    }
}
</script>