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