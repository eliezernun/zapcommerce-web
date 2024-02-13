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

export function validarCPF(cpf: string){
    cpf = cpf.replace(/[^\d]/g, '');

    if (cpf.length !== 11) {
        return false;
    }
    if (/^(\d)\1+$/.test(cpf)) {
        return false;
    }
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = 11 - (soma % 11);
    let digitoVerificador1 = resto === 10 || resto === 11 ? 0 : resto;
    if (digitoVerificador1 !== parseInt(cpf.charAt(9))) {
        return false;
    }
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = 11 - (soma % 11);
    let digitoVerificador2 = resto === 10 || resto === 11 ? 0 : resto;
    if (digitoVerificador2 !== parseInt(cpf.charAt(10))) {
        return false;
    }
    return true;
}