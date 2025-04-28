import { TheaterType } from "../type/types"
const API_URL = "http://localhost:5000/api"

export const getAllTheaters = async (): Promise<TheaterType[]> => {
    const response = await fetch(`${API_URL}/getTheaters`)
    if (!response.ok) throw new Error("Failed to fetch theaters")

    return response.json()
}
export const getCities = async (query = "") => {
    const response = await fetch(`https://open.oapi.vn/location/provinces?page=0&size=30&query=${query}`)
    if (!response.ok) throw new Error("Failed to fetch cities")

    return response.json()
}