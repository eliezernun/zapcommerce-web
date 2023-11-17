import { estado } from "@/plugins/estado";
import https from "@/plugins/https";
import { AlterarEmail } from "@/types/user/alterarEmail";
import { sucesso, erro } from "@/utils/toast";

const handleRequest = async (endpoint : any, data : any) => {
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
    } catch (error : any) {
        erro(error.response.data.mensagem);
        return false;
    } finally {
        estado.silenciar = false;
    }
};

export const alterarEmail = async (info: AlterarEmail) => {
    return handleRequest('/emails/alterar', info);
};

export const verificarEmail = async (id: number, token: string) => {
    const body = {
        id_usuario: id,
        user_token: token
    };

    return handleRequest('/emails/verificar', body);
};