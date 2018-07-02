export interface User {
    email: string
    password: string
}

export interface Category {
    name: string
    user?: string
    imageSrc?: string,
    _id?: string
}

export interface Massage {
    massage: string
}

export interface Position {
    name:string
    cost: number
    category:string
    user?: string
    _id?:string
}
