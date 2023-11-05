import http from "@/plugins/https"
import { Login } from "@/types/api/login"
import { LoginResponse } from "@/types/api/loginResponse"

export const login = async (login : Login) => {
    try {
        const { data } : LoginResponse | any = await http.post('/auth/login', login)
        return data
    } catch (error) {
        
    }
}