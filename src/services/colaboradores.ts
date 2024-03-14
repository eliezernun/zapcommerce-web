import https from "@/plugins/https";
import { estado } from "@/plugins/estado";
import { erro, sucesso } from "@/utils/toast";
import { IncluirColaborador } from "@/types/pessoa/IncluirColaborador";
import { Colaborador } from "@/types/pessoa/colaborador";


export async function obterColaboradores(){
  return handleRequestGet('/colaborador/listar')
}
export async function incluirColaborador(data: IncluirColaborador){
        return handleRequestPost('/colaborador/incluir', data);
}
const handleRequestPost = async(endpoint: string, data : IncluirColaborador) : Promise<Boolean> =>{
    try{
        const response =  await https.post(endpoint, data);
        if(response.status === 201){
            sucesso("Colaborador incluido com sucesso!")
            return true;
        }
        erro("Ocorreu um erro ao incluir o novo colaborador")
        return false;
    }catch (error : any){
        console.error(error);
        return false;
    }
}
const handleRequestGet = async (endpoint: string) : Promise<Boolean | Array<Colaborador>> =>{
    try {
        estado.silenciar = true;
        const response = await https.get(endpoint);

        if (response.status === 200) {
            return response.data;
        } else {
            erro(response.data.mensagem);
            return false;
        }
    } catch (error : any) {
        console.error(error)
        //erro(error.response.data.mensagem);
        return false;
    } finally {
        estado.silenciar = false;
    }
}