import { estado } from "@/plugins/estado";
import https from "@/plugins/https";
import { AlterarEmail } from "@/types/user/alterarEmail";
import { sucesso, erro } from "@/utils/toast";

export const alterarEmail = async (info : AlterarEmail) =>{
    try{
        estado.silenciar = true;
        const data = await https.post('/emails/alterar', info);
        if(data.status == 200){
            sucesso(data.data.mensagem)
            estado.silenciar = false;
            return true;
        }
        else{
            erro(data.data.mensagem)
            estado.silenciar = false;
            return false;
        }
    }catch(error: any){
        erro(error.response.data.mensagem)
        estado.silenciar = false;
        return false; 
    }   
}
export const verificarEmail = async (id: number, token: string) => {
    let body = {
        id_usuario : id,
        user_token : token
    }
    try{
        estado.silenciar = true;
        const data = await https.post(`/emails/verificar`, body);
        if(data.status == 200){
            sucesso(data.data.mensagem)
            estado.silenciar = false;
            return true;
        }
        else{
            erro(data.data.mensagem)
            estado.silenciar = false;
            return false;
        }
    }catch(error : any ){
        erro(error.response.data.mensagem)
        estado.silenciar = false;
        return false;  
    }   
   
}