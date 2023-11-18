import { LoginResponse } from "@/types/api/loginResponse";
import CryptoJS from 'crypto-js';
const token = String(process.env.VUE_APP_SESSION_SECRET)

function encriptar(data: string, key: string): string {
    const dataEncript = CryptoJS.AES.encrypt(data, key).toString();
    return dataEncript;
}

function desencriptar(data: string, key: string): LoginResponse {
    const bytes = CryptoJS.AES.decrypt(data, key);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
}


export function createLocalSession(data: LoginResponse | undefined) {
    try {
        let dataString = JSON.stringify(data);
        localStorage.setItem('zapcommerce', encriptar(dataString, token))
        return true;
    } catch (error) {
        console.log(error)
        return false;
    }
}

export function loadSessionFromLocalStore(): LoginResponse | undefined {
    let info = localStorage.getItem('zapcommerce');
    if (info == null || info == undefined) {
        return undefined;
    }
    let data = desencriptar(info, token)
    let data_sessao = new Date(data.criado_em).getTime() + 3 * 60 * 60 * 1000
    let data_atual = new Date().getTime();
    let sessao_valida = data_atual > data_sessao ? true : false
    if (sessao_valida) {
        localStorage.clear()
        return undefined;
    }
    return data;
}

export function destruriSessao() {
    localStorage.removeItem('zapcommerce')
}