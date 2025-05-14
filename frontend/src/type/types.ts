export interface AccountType {
    id: number
    points: number
    profile_picture: string
    name: string
    email: string
    role: string
    status: string
    createdAt: string
    updatedAt?: string
}

export interface BannerType {
    id: number
    title: string
    image: string
    link?: string
    status: string
    createdAt: string
    updatedAt?: string
}

export interface TheaterType {
    id: number
    name: string
    city: string
    address: string
    type: string
    createdAt: string
    updatedAt?: string
}

export interface AuditoriumType {
    id: number
    theater_id: number
    name: string
    capacity: number
    createdAt: string
    updatedAt?: string
}

export type CreateAuditorium = {
    name: string
    capacity: number
    theater_id: number
}

export interface SeatType {
    id: number
    auditorium_id: number
    row: string
    number: number
    type: string
    status: string
    createdAt: string
    updatedAt?: string
}
