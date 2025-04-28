import React, { useEffect, useState } from "react"
import { Alert, Autocomplete, Button, Snackbar, Stack, TextField, Typography } from "@mui/material"
import { getCities } from "../../../services/thearterApi"
const CreateTheater = () => {
    const [name, setName] = useState<string>('')
    const [city, setCity] = useState<string>('')
    const [address, setAddress] = useState<string>('')
    const [type, setType] = useState<string>('')
    const [message, setMessage] = useState('')
    const [open, setOpen] = useState(false)
    const [cities, setCities] = useState<{ code: string; name: string }[]>([])
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!name || !city || !address || !type) {
            setMessage('Vui lòng nhập đầy đủ thông tin')
            setOpen(true)

            return
        }
        try {
            const dataTheater = {
                name, city, address, type
            }
            await fetch('http://localhost:5000/api/createTheater', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataTheater)
            })

            setMessage('Thêm rap thành công')
            setOpen(true)
            setName('')
            setCity('')
            setAddress('')
            setType('')
        } catch (error) {
            console.error(error)
            setMessage('Lỗi khi tạo rap')
        }
    }

    useEffect(() => {
        fetchCities()
    }, [])
    const fetchCities = async () => {
        try {
            const res = await getCities()
            console.log(res)
            setCities(res.data || [])
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
                <Typography variant="h6">Create New Theater</Typography>
                <TextField
                    label="Name Cenima"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                />
                <Autocomplete
                    options={cities}
                    getOptionLabel={(option) => option.name} // Lấy tên tỉnh thành
                    value={city ? cities.find((c) => c.name === city) || null : null}
                    onChange={(event, newValue) => {
                        setCity(newValue ? newValue.name : '')
                    }}
                    renderInput={(params) => (
                        <TextField {...params} label="City" fullWidth />
                    )}
                />

                <TextField
                    label="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    fullWidth
                >

                </TextField>
                <TextField
                    label="Type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    fullWidth
                ></TextField>
                <Button type="submit" variant="contained" color="primary">
                    Tạo
                </Button>
            </Stack>

            <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert severity="info">{message}</Alert>
            </Snackbar>
        </form>
    )
}

export default CreateTheater