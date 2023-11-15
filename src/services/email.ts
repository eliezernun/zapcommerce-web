import { estado } from "@/plugins/estado";
import https from "@/plugins/https";
import { AlterarEmail } from "@/types/user/alterarEmail";

export const alterarEmail = (info : AlterarEmail) =>{
    try{
        estado.silenciar = true;
        const data = https.post('/email/alterar', info);
        return true;
    }catch(error){
        estado.silenciar = false;
        console.error(error);
        return false;
    }
}