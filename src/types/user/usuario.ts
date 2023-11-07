import { Funcao } from "@/types/enums/funcao"
import { Modulos } from "../enums/modulos"

export type Usuario ={
    id_usuario: number,
    email_principal: string,
    email_recuperacao: string,
    outros_sistemas: Modulos[],
    ativo: boolean,
    bloqueado: boolean,
    senha_provisoria: boolean,
    funcao: Funcao,
}