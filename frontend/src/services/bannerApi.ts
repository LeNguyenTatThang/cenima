import { BannerType } from "../type/types"
const API_URL = "http://localhost:5000/api"

export const getAllbanner = async (): Promise<BannerType[]> => {
    const response = await fetch(`${API_URL}/getBanners`)
    if (!response.ok) throw new Error("Failed to fetch banners")

    return response.json()
}