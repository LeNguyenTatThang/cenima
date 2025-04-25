// src/services/accountApi.ts
import { AccountType } from "../type/types"

const API_URL = "http://localhost:5000/api"

export const createAccount = async (data: AccountType) => {
    const response = await fetch(`${API_URL}/createAccount`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Failed to create account")

    return response.json()
}
export const getAllAccounts = async (): Promise<AccountType[]> => {
    const response = await fetch(`${API_URL}/getAccounts`)
    if (!response.ok) throw new Error("Failed to fetch accounts")

    return response.json()
}

export const updateAccount = async (id: number, data: Partial<AccountType>) => {
    const response = await fetch(`${API_URL}/updateAccount/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Failed to update account")

    return response.json()
}

export const deleteAccount = async (id: number) => {
    const response = await fetch(`${API_URL}/deleteAccount/${id}`, {
        method: "DELETE",
    })
    if (!response.ok) throw new Error("Failed to delete account")

    return true
}

