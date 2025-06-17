
const API_URL = "http://localhost:5000/api"

export const getAllDrinks = async () => {
    const res = await fetch(`${API_URL}/getDrinks`)
    if (!res.ok) throw new Error("Không thể lấy danh sách nuoc")

    return res.json()
}

export const createdDrink = async (formData: FormData) => {
    try {
        const res = await fetch(`${API_URL}/createDrink`, {
            method: "POST",
            body: formData,
        })
        if (!res.ok) throw new Error("Không thể tạo nuoc")

        return await res.json()
    } catch (err) {
        console.log(err)
    }
}