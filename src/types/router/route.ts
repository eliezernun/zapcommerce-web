import { SubModulosAgenda } from "../enums/agenda/SubModulosAgenda"


export type Route = {
    text: string,
    path: string,
    icon: string,
    modulo: SubModulosAgenda,
    index: number
}