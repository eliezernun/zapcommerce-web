import { Funcao } from "@/types/enums/funcao"

export type Usuario ={
    id_usuario: number,
    email_principal: string,
    email_recuperacao: string,
    ativo: boolean,
    bloqueado: boolean,
    senha_provisoria: boolean,
    funcao: Funcao,

}