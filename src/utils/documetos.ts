export function formatarCPF(cpf : string) {
    // Remove caracteres não numéricos do CPF
    const cpfNumerico = cpf.replace(/\D/g, '');

    // Verifica se o CPF possui 11 dígitos
    if (cpfNumerico.length !== 11) {
        return '--'
    }

    // Aplica a máscara
    const cpfFormatado = `${cpfNumerico.slice(0, 3)}.${cpfNumerico.slice(3, 6)}.${cpfNumerico.slice(6, 9)}-${cpfNumerico.slice(9)}`;

    return cpfFormatado;
}

export function formatarCNPJ(cnpj: string) {
    // Remove caracteres não numéricos do CNPJ
    const cnpjNumerico = cnpj.replace(/\D/g, '');

    // Verifica se o CNPJ possui 14 dígitos
    if (cnpjNumerico.length !== 14) {
        return '--';
    }

    // Aplica a máscara
    const cnpjFormatado = `${cnpjNumerico.slice(0, 2)}.${cnpjNumerico.slice(2, 5)}.${cnpjNumerico.slice(5, 8)}/${cnpjNumerico.slice(8, 12)}-${cnpjNumerico.slice(12)}`;

    return cnpjFormatado;
}

export function formatarRG(rg: string) {
    // Remove caracteres não numéricos do RG
    const rgNumerico = rg.replace(/\D/g, '');

    // Verifica se o RG possui pelo menos 1 dígito
    if (rgNumerico.length < 1) {
        return '--';
    }

    // Aplica a máscara
    const rgFormatado = rgNumerico.replace(/(\d{1,2})(\d{3})(\d{3})(\d{1})/, '$1.$2.$3-$4');

    return rgFormatado;
}
