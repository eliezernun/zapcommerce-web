export function funcaoText(f: string): string {
    switch (f) {
        case 'ADMIN':
            return 'admin'
        case 'GESTOR':
            return 'gestor'
        case 'GERENCIAR':
            return 'gerente'
        case 'CONSULTAR':
            return 'consulta'
        case 'USUARIO':
            return 'usuário'
        default:
            return '--'
    }
}

export function funcaoColor(f: string) {
    switch (f) {
        case 'ADMIN':
            return 'pink'
        case 'GESTOR':
            return 'green'
        case 'GERENCIAR':
            return 'blue'
        case 'CONSULTAR':
            return 'orange'
        case 'USUARIO':
            return 'indigo'
        default:
            return 'Secondary'
    }
}
    export function funcaoDescricao(f: string) {
        switch (f) {
            case 'ADMIN':
                return 'Usuário com privilégios totais, incluindo controle total do sistema.';
            case 'GESTOR':
                return 'Responsável pela gestão da empresa, com acesso completo a todas as funcionalidades.';
            case 'GERENCIAR':
                return 'Gerente com acesso à maioria dos módulos do sistema para realizar operações de gerenciamento.';
            case 'CONSULTAR':
                return 'Usuário com permissão apenas para consultar informações, sem capacidade de modificação.';
            case 'USUARIO':
                return 'Acesso a módulos específicos conforme atribuído, limitado a funções específicas.';
            default:
                return 'Função não definida.';

        }
    }