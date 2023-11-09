import { Empresa } from "../empresa/empresa";
import { AgendaPermicoes } from "../permicoes/AgendaPermicoes";
import { Pessoa } from "../pessoa/pessoa";
import { Usuario } from "../user/usuario";
import { Status } from "./status";

export type LoginResponse ={
    status : Status,
    client_token: string,
    token_expires: number,
    detalhes_usuario: {
        usuario: Usuario,
        pessoa: Pessoa,
        empresa: Empresa,
        permicoes: AgendaPermicoes
    },
    criado_em: Date;

}