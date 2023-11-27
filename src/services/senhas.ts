import https from "@/plugins/https"
import { sucesso, erro } from "@/utils/toast";
import { estado } from "@/plugins/estado";

export const validar = async ( data : {email: string} ) => {
    return await handleRequest('/senhas/validar', data)
}
export const validarToken = async ( token: string[] | string ) =>{
    try{
        const response = await https.get(`/senhas/token/${token}`)
        console.info(response.status)
        if(response.status === 200){

            return true;
        }
        else{
            erro("link inválido ou já reutilizado!")
            return false;
        }
    } catch(error: any){
        erro("link inválido ou já reutilizado!")
        return false;
    }
}
export const recuperar = async (dados: 
    { recuperacao_email_principal: string, 
        recuperacao_email: string, 
        recuperacao_nascimento: Date, 
        recuperacao_nome: string }) => {
    
    return await handleRequest('/senhas/reset', dados);

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