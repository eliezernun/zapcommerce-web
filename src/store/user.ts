import { defineStore } from 'pinia'
import { Usuario } from '@/types/user/usuario';
import { Pessoa } from '@/types/pessoa/pessoa';
import { LoginResponse } from '@/types/api/loginResponse';
import { Empresa } from '@/types/empresa/empresa';
import { AgendaPermicoes } from '@/types/permicoes/AgendaPermicoes';
import { Modulos } from '@/types/enums/modulos';

export const userStore = defineStore('user', {
  state: () => {
    return { 
      atuenticado: false,
      token: '',
      tokens_expiration : 0,
      usuario: null as Usuario | null,
      pessoa: null as Pessoa | null,
      empresa: null as Empresa | null,
      permicoes: null as AgendaPermicoes | null,
      contexto : null as Modulos | null
    }
  },
  actions: {
    inicializar(data : LoginResponse ) : boolean{
        this.token = data.client_token;
        this.tokens_expiration = data.token_expires;
        this.usuario = data.detalhes_usuario.usuario;
        this.pessoa = data.detalhes_usuario.pessoa;
        this.empresa = data.detalhes_usuario.empresa;
        this.permicoes = data.detalhes_usuario.permicoes;
        this.atuenticado = true;
        return true;
    },
    isAutenticado(){
      return this.atuenticado;
    },
    getToken() : string | undefined {
      return this.token;
    },
    getEmpresaToken() : string | undefined {
      return this.empresa?.client_id
    },
    getUsuario() : Usuario | null {
      return this.usuario
    },
    getPermicoes() : AgendaPermicoes | null {
      return this.permicoes;
    },
    getPessoa () : Pessoa | null {
      return this.pessoa;
    },
    getEmpresa () : Empresa | null {
      return this.empresa;
    },
    getAutenticado() : boolean {
      return this.atuenticado;
    },
    getModulos() : Modulos[] | undefined {
      return this.usuario?.outros_sistemas;
    },
    setContexto(modulo : Modulos | null):void{
      this.contexto = modulo;
    },
    getContexto() : Modulos | null {
      return this.contexto
    }
  },
})