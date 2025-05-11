import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material"
import { useState, useEffect } from "react"
import { AuditoriumType } from '../../type/types'

type Props = {
    open: boolean
    onClose: () => void
    data: AuditoriumType | null
    onSave: (form: { name: string; capacity: number }) => void
}
const AudiroriumEdit: React.FC<Props> = ({ open, onClose, data, onSave }) => {
    const [formData, setFormData] = useState<{ name: string; capacity: number }>({
        name: '',
        capacity: 0
    })


    useEffect(() => {
        if (data) {
            setFormData({
                name: data.name,
                capacity: data.capacity,
            })
        }
    }, [data])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = () => {
        onSave(formData)
        onClose()
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Sửa thông tin phòng chiếu</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    label="Tên phòng"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="Sức chứa"
                    name="capacity"
                    type="number"
                    value={formData.capacity}
                    onChange={handleChange}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Hủy</Button>
                <Button onClick={handleSubmit} variant="contained">Lưu</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AudiroriumEdit