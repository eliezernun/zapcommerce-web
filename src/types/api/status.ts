export type Status ={
    sucesso: {
        type: Boolean,
        readonly: true,
        required: true
    }
    mensagem: {
        type: String,
        readonly: true
    }
}