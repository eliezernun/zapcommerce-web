import { estado } from "@/plugins/estado";
import https from "@/plugins/https";

import { erro, sucesso } from "@/utils/toast";

export const consultarCliente = async (id: Number | any) =>{
    return handleRequestGet(`/clientes/consultar/${id}`)
}

const handleRequestGet = async (endpoint: string) : Promise<boolean | Object> =>{
    try {
        estado.silenciar = true;
        const response = await https.get(endpoint);

        if (response.status === 200) {
            sucesso(response.data.mensagem);
            return response.data;
        } else {
            erro(response.data.mensagem);
            return false;
        }
    } catch (error : any) {
        erro(error.response.data.mensagem);
        return false;
    } finally {
        estado.silenciar = false;
    }
}