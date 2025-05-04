import React from "react"
import { TheaterType } from "../../type/types"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from "@mui/material"
import { useSnackbar } from "./SnackbarContext"

type Props = {
    isOpen: boolean
    onClose: () => void
    theater: TheaterType | null
    onSubmit: (form: { name: string; city: string; address: string; type: string }) => void
}

const TheaterEditDialog = ({ isOpen, onClose, theater, onSubmit }: Props) => {
    const { showMessage } = useSnackbar()

    const [form, setForm] = React.useState({
        name: '',
        city: '',
        address: '',
        type: '',
    })

    React.useEffect(() => {
        if (theater) {
            setForm({
                name: theater.name,
                city: theater.city,
                address: theater.address,
                type: theater.type,
            })
        }
    }, [theater])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const { name, city, address, type } = form

        if (!name || !city || !address || !type) {
            showMessage("Vui lòng nhập đầy đủ thông tin")

            return
        }

        onSubmit(form)
    }

    return (
        <Dialog open={isOpen} onClose={onClose} fullWidth>
            <DialogTitle>Chỉnh sửa Rạp Chiếu</DialogTitle>
            <DialogContent>
                <Stack spacing={2} mt={1}>
                    <TextField
                        label="Tên rạp"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        label="Thành phố"
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        label="Địa chỉ"
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        label="Loại rạp"
                        name="type"
                        value={form.type}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Hủy</Button>
                <Button variant="contained" onClick={handleSubmit}>
                    Lưu thay đổi
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default TheaterEditDialog