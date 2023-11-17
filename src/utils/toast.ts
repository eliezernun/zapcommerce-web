import { toast } from 'vue3-toastify';

export const sucesso = (mensagem: string) => {
    toast.success(mensagem, { autoClose: true })
}
export const alerta = (mensagem: string) => {
    toast.warn(mensagem, { autoClose: true })
}
export const erro = (mensagem: string) => {
    toast.error(mensagem, { autoClose: true })
}