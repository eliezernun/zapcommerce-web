<template>
    <div class="clientes-container">
        <v-data-table :headers="headers" :items="data">
            <template v-slot:item.nome = "{item}">
                <v-chip v-if="item.you" color="blue"> {{ String(item.nome).toUpperCase() }} ( você )</v-chip>
            </template>
            <template v-slot:item.documento ="{item}">
               {{ formatar(item.documento) }}        
            </template>
            <template v-slot:item.sistema ="{item}">
              <v-chip :color="item.sistema == true ? 'green':'red'">
                {{ item.sistema == true ? 'Sim' : 'Não' }}   
              </v-chip>     
            </template>
            <template v-slot:item.opt="{item}">
                    <v-btn icon="mdi mdi-pencil"></v-btn>
            </template>
        </v-data-table>
    </div>
</template>
<script lang="ts">
import { formatarCNPJ, formatarCPF, formatarRG } from '@/utils/documetos';

export default {
    data() {
        return {
            headers: [
                { title: 'ID', align: 'start', sortable: false, key: 'id' },
                { title: 'Nome', align: 'start', sortable: true, key: 'nome' },
                { title: 'Documento', align: 'start', sortable: true, key: 'documento' },
                { title: 'Sistema', align: 'center', sortable: false, key: 'sistema' },
                { title: 'Opções', align: 'center', sortable : false, key: 'opt'}
            ],
            data: [
                { id: 1, nome: 'Eliezer nunes', documento: '4419583405', sistema: false, you: true }
            ]
        }
    },

    methods:{
        formatar(doc : string){
           if(doc.length == 14){
            return formatarCNPJ(doc)
           }
           if(doc.length == 11){
            return formatarCPF
           }
           if(doc.length == 10){
            return formatarRG(doc);
           }
           return doc;
        }
    }
}
</script>
<style>
.colaboradores-container {
    margin: 55px;
    width: 80vw;
    height: 80vh;
}
</style>