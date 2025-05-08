import { TheaterType } from "../type/types"
const API_URL = "http://localhost:5000/api"

export const getAllTheaters = async (): Promise<TheaterType[]> => {
    const response = await fetch(`${API_URL}/getTheaters`)
    if (!response.ok) throw new Error("Failed to fetch theaters")

    return response.json()
}

export const getTheater = async (id: number) => {
    const response = await fetch(`${API_URL}/getTheater/${id}`)
    if (!response.ok) throw new Error("Failed to fetch theater")

    return response.json()
}
export const getCities = async (query = "") => {
    const response = await fetch(`https://open.oapi.vn/location/provinces?page=0&size=30&query=${query}`)
    if (!response.ok) throw new Error("Failed to fetch cities")

    return response.json()
}

export const updateTheater = async (id: number, data: Partial<TheaterType>) => {
    const response = await fetch(`${API_URL}/updateTheater/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Failed to update theater")

    return response.json()
}

export const deleteTheater = async (id: number) => {
    const response = await fetch(`${API_URL}/deleteTheater/${id}`, {
        method: "DELETE",
    })
    if (!response.ok) throw new Error("Failed to delete theater")

    return true
}