<template>
    <div class="clientes-container">
        <v-data-table :headers="headers" :items="data" style="box-shadow:  0 0 10px #000000;">
            <template v-slot:loading>
                <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
            </template>
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>Colaboradores:</v-toolbar-title>
                    <div class="mr-10">
                        <v-btn icon="mdi-account-multiple-plus-outline" variant="outlined" elevation="4" color="blue" dark
                            class="mb-2" @click="incluir"></v-btn>
                        <v-tooltip activator="parent" location="bottom center">Incluir um novo colaborador</v-tooltip>
                    </div>
                    <v-dialog v-model="inclusao">
                        <IncluirColaborador :principal="principal" />
                    </v-dialog>
                </v-toolbar>
            </template>
            <template v-slot:item.nome="{ item }">
                <v-chip v-if="item.you" color="blue"> {{ String(item.nome).toUpperCase() }} ( você )</v-chip>
                <span v-else>{{ item.nome }}</span>
            </template>
            <template v-slot:item.documento="{ item }">
                {{ formatar(item.documento) }}
            </template>
            <template v-slot:item.sistema="{ item }">
                <v-chip :color="item.sistema == true ? 'green' : 'red'">
                    {{ item.sistema == true ? 'Sim' : 'Não' }}
                </v-chip>
            </template>
            <template v-slot:item.funcao="{ item }">
                <v-chip :color="corFuncao(item.funcao)">
                    {{ formatarFuncao(item.funcao) }}
                    <v-tooltip activator="parent" location="start">{{ funcaoDescriptor(item.funcao) }}</v-tooltip>
                </v-chip>
            </template>
            <template v-slot:item.principal="{ item }">
                <v-chip color="red" v-if="item.principal"> principal <v-tooltip activator="parent"
                        location="bottom center">Só pode ser editado por outro usuário principal</v-tooltip> </v-chip>
            </template>
            <template v-slot:item.opt="{ item }">
                <v-btn icon="mdi mdi-pencil" :disabled="item.principal && item.you == false"></v-btn>
            </template>
        </v-data-table>
    </div>
</template>
<script lang="ts">
import { formatarCNPJ, formatarCPF, formatarRG } from '@/utils/documetos';
import { obterColaboradores } from '@/services/colaboradores'
import { Colaborador } from '@/types/pessoa/colaborador'
import { funcaoColor, funcaoDescricao, funcaoText } from '@/utils/funcoes';
import IncluirColaborador from '@/components/IncluirColaborador.vue'

export default {
    data() {
        return {
            headers: [
                { title: 'ID', align: 'start', sortable: false, key: 'id' },
                { title: 'Nome', align: 'start', sortable: true, key: 'nome' },
                { title: '', align: 'start', sortable: false, key: 'principal' },
                { title: 'Função', align: 'center', sortable: true, key: 'funcao' },
                { title: 'Documento', align: 'start', sortable: true, key: 'documento' },
                { title: 'Sistema', align: 'center', sortable: false, key: 'sistema' },
                { title: 'Opções', align: 'center', sortable: false, key: 'opt' }
            ],
            data: [] as Colaborador[],
            loading: true,
            inclusao: false,
            principal: false
        };
    },
    async mounted() {
        await this.listar();
    },
    methods: {
        formatar(doc: string) {
            if (doc.length == 14) {
                return formatarCNPJ(doc);
            }
            if (doc.length == 11) {
                return formatarCPF(doc);
            }
            if (doc.length == 10) {
                return formatarRG(doc);
            }
            return doc;
        },
        async listar() {
            let colaboradores = await obterColaboradores();
            if (colaboradores !== false) {
                if (Array.isArray(colaboradores)) {
                    let colaboradores = await obterColaboradores();
                    if (colaboradores !== false) {
                        if (Array.isArray(colaboradores)) {
                            this.data = [...colaboradores];
                            colaboradores.forEach(item =>{
                               if(item.you) this.principal = item.principal;
                            })
                        }
                    }
                }
            }
            console.info(this.principal)
            this.loading == false;
        },
        formatarFuncao(fnc: string) {
            return funcaoText(fnc);
        },
        corFuncao(fnc: string) {
            return funcaoColor(fnc);
        },
        funcaoDescriptor(fnc: string) {
            return funcaoDescricao(fnc);
        },
        incluir() {
            this.inclusao = true;
        }
    },
    components: { IncluirColaborador }
}
</script>
<style>
.colaboradores-container {
    margin: 55px;
    width: 80vw;
    height: 80vh;
}

.mr-10 {
    margin-right: 10px;
}
</style>