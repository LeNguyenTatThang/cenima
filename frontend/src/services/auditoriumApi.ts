import { AuditoriumType, CreateAuditorium } from "../type/types"
const API_URL = "http://localhost:5000/api"

export const getAuditoriums = async (): Promise<AuditoriumType[]> => {
    const response = await fetch(`${API_URL}/getAuditoriums`)
    if (!response.ok) throw new Error("Failed to fetch banners")

    return response.json()
}

export const getAuditorium = async (id: number): Promise<AuditoriumType> => {
    const response = await fetch(`${API_URL}/getAuditorium/${id}`)
    if (!response.ok) throw new Error("Failed to fetch auditorium")

    return response.json()
}

export const createAuditorium = async (data: CreateAuditorium) => {
    const response = await fetch(`${API_URL}/createAuditorium`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })

    if (!response.ok) throw new Error("Failed to create auditorium")

    return response.json()
}

export const updateAuditorium = async (id: number, data: Partial<AuditoriumType>) => {
    const response = await fetch(`${API_URL}/updateAuditorium/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Failed to update auditorium")

    return response.json()
}

export const deleteAuditorium = async (id: number) => {
    const response = await fetch(`${API_URL}/deleteAuditorium/${id}`, {
        method: "DELETE",
    })
    if (!response.ok) throw new Error("Failed to delete auditorium")

    return true
}