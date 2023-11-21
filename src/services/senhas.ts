import https from "@/plugins/https"
import { sucesso, erro } from "@/utils/toast";
import { estado } from "@/plugins/estado";

export const validarUsuario = async (email: string) => {
    return await handleRequest('/validar', email)
}

export const recuperar = async (dados: 
    { recuperacao_email_principal: string, 
        recuperacao_email: string, 
        recuperacao_nascimento: string, 
        recuperacao_nome: string }) => {
    
    return await handleRequest('/gerar', dados);

}

const handleRequest = async (endpoint: any, data: any) => {
    try {
        estado.silenciar = true;
        const response = await https.post(endpoint, data);

        if (response.status === 200) {
            sucesso(response.data.mensagem);
            return true;
        } else {
            erro(response.data.mensagem);
            return false;
        }
    } catch (error: any) {
        erro(error.response.data.mensagem);
        return false;
    } finally {
        estado.silenciar = false;
    }
};