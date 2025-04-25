import { Alert, Button, MenuItem, Snackbar, Stack, TextField, Typography } from "@mui/material"
import React, { useState } from "react"

const createBanner = () => {
    const [title, setTitle] = useState('')
    const [link, setLink] = useState('')
    const [status, setStatus] = useState('active')
    const [image, setImage] = useState<File | null>(null)
    const [message, setMessage] = useState('')
    const [open, setOpen] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!title || !image || !status) {
            setMessage('Vui lòng nhập đầy đủ thông tin')
            setOpen(true)

            return
        }

        const formData = new FormData()
        formData.append('title', title)
        formData.append('status', status)
        formData.append('image', image)
        if (link) formData.append('link', link)

        try {
            const res = await fetch('http://localhost:5000/api/createBanner', {
                method: 'POST',
                body: formData,
            })

            const data = await res.json()
            setMessage(data.message || 'Thêm banner thành công')
            setOpen(true)
            setTitle('')
            setImage(null)
            setLink('')
            setStatus('Active')
        } catch (error) {
            console.error(error)
            setMessage('Lỗi khi tạo banner')
            setOpen(true)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
                <Typography variant="h6">Tạo Banner Mới</Typography>
                <TextField
                    label="Tiêu đề"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                />
                <TextField
                    label="Liên kết (link)"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    fullWidth
                />
                <TextField
                    label="Trạng thái"
                    select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    fullWidth
                >
                    <MenuItem value="active">Hoạt động</MenuItem>
                    <MenuItem value="inactive">Ẩn</MenuItem>
                </TextField>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files?.[0] || null)}
                />
                <Button type="submit" variant="contained" color="primary">
                    Tạo
                </Button>
            </Stack>

            <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
                <Alert severity="info">{message}</Alert>
            </Snackbar>
        </form>
    )
}

export default createBanner