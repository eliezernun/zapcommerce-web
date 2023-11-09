import http from "@/plugins/https"
import { Login } from "@/types/api/login"
import { LoginResponse } from "@/types/api/loginResponse"
import { userStore } from '@/store/user'

export const login = async (login: Login) => {
    try {
        const { data }: LoginResponse | any = await http.post('/auth/login', login)
        return definirAltenticado(data)
    } catch (error) {
        console.error(error);
    }
}
function definirAltenticado(data: LoginResponse | any): Boolean {
    const storage = userStore();
    return storage.inicializar(data);
}

export function verificarSessao(){
    const storage = userStore();
    return storage.recuperarSessao();
}