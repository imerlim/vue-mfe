export interface User {
    id?: number
    nome?: string
    email?: string
    dataNascimento?: string
    telefone?: string
    cpf?: string
    senha?: string
    createdAt?: string
}

export interface IApiResponse<T> {
    data: T
    message?: string
}
