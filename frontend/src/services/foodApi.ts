import { FoodSizesType } from "../type/types"

const API_URL = "http://localhost:5000/api"

export const getAllFoods = async () => {
    const res = await fetch(`${API_URL}/getFoods`)
    if (!res.ok) throw new Error("Không thể lấy danh sách món ăn")

    return res.json()
}
export const updateFood = async (
    id: number,
    data: { name: string; sizes: FoodSizesType[]; imageFile?: File }
) => {
    const formData = new FormData()
    formData.append("name", data.name)
    formData.append("sizes", JSON.stringify(data.sizes))
    if (data.imageFile) {
        formData.append("foods", data.imageFile)
    }

    const response = await fetch(`${API_URL}/updateFood/${id}`, {
        method: "PUT",
        body: formData,
    })

    if (!response.ok) throw new Error("Failed to update food")

    return response.json()
}