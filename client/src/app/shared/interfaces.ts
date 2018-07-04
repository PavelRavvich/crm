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
    name: string
    cost: number
    category:string
    user?: string
    _id?:string
    quantity?: number
}

export interface Order {
    _id?: string
    date?: Date
    order?: number
    user?: string
    list: any[]
}

export interface OrderPosition {
    name: string
    cost: number
    quantity: number
    _id?: string
}

export interface Filter {
    start?: Date
    end?: Date
    order: number
}
