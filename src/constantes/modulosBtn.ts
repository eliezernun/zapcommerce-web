import { Modulos } from "@/types/enums/modulos";


export const buttonsModulos = [
    {
        text: 'Agenda', 
        icon: 'mdi-calendar-clock', 
        path: '/agenda',
        modulo: Modulos.AGENDA
    },
    {
        text: 'Loja', 
        icon: 'mdi-cart-outline', 
        path: '/loja',
        modulo: Modulos.LOJA
    }
]