
const API_URL = "http://localhost:5000/api"

export const getAllFoods = async () => {
    const res = await fetch(`${API_URL}/getFoods`)
    if (!res.ok) throw new Error("Không thể lấy danh sách món ăn")

    return res.json()
}