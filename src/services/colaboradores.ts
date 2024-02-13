import https from "@/plugins/https";
import { estado } from "@/plugins/estado";
import { erro, sucesso } from "@/utils/toast";
import { Colaborador } from "@/types/pessoa/colaborador";

export async function obterColaboradores(){
  return handleRequestGet('/colaborador/listar')
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
        console.info(error)
        //erro(error.response.data.mensagem);
        return false;
    } finally {
        estado.silenciar = false;
    }
}