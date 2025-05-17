import { SeatType } from "../type/types"

const API_URL = "http://localhost:5000/api"

export const fetchSeatsByAuditorium = async (auditoriumId: string) => {
    const res = await fetch(`${API_URL}/getseats/${auditoriumId}`)
    if (!res.ok) throw new Error("Không thể lấy danh sách ghế")

    return res.json()
}

export const createSeats = async (
    auditorium_id: number,
    row: string,
    number: number,
    type: string = "single",
    status: string = "available"
): Promise<{ seats: SeatType[] }> => {
    const res = await fetch(`${API_URL}/createSeatForAuditorium`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ auditorium_id, row, number, type, status }),
    })
    if (!res.ok) {
        const err = await res.json()
        throw new Error(err.message || "Không thể tạo ghế")
    }

    return res.json()
}

export const deleteSeatsByAuditorium = async (auditoriumId: string) => {
    const res = await fetch(`${API_URL}/deleteSeat/${auditoriumId}`, {
        method: "DELETE",
    })
    if (!res.ok) throw new Error("Xóa ghế thất bại")

    return res.json()
}

