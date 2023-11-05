import { Status } from "./status";

export type LoginResponse ={
    status : Status,
    client_token: string,
    token_expires: number,    
}