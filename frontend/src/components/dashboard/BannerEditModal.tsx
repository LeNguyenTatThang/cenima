import React from "react"
import { BannerType } from "../../type/types"
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material"
import UploadFileIcon from '@mui/icons-material/UploadFile'
interface BannerProps {
    open: boolean
    onClose: () => void
    onUpdated: () => void
    banner: BannerType | null
}
const BannerEditModal: React.FC<BannerProps> = ({ open, onClose, onUpdated, banner }) => {
    const [formData, setFormData] = React.useState<BannerType | null>(banner)
    const [imageBanner, setImageBanner] = React.useState<string>("")
    const [fileInput, setFileInput] = React.useState<File | null>(null)
    React.useEffect(() => {
        setFormData(banner)

    }, [banner])
    console.log(formData)
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            setFileInput(file)
            const reader = new FileReader()
            reader.onload = () => {
                setImageBanner(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (formData) {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            })
        }
    }
    const handleSelectChange = (e: SelectChangeEvent<string>) => {
        if (formData) {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            })
        }
    }
    const handleSubmit = async () => {
        if (!formData) return
        try {
            const data = new FormData()
            data.append("title", formData.title)
            data.append("status", formData.status)
            data.append("link", formData.link ?? "")
            if (fileInput) {
                data.append("image", fileInput)
            }

            const res = await fetch(`http://localhost:5000/api/updateBanner/${formData.id}`, {
                method: "PUT",
                body: data,
            })
            if (res.ok) {
                onUpdated()
                onClose()
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Chỉnh sửa Banner</DialogTitle>
            <DialogContent dividers>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        mb: 2,
                    }}
                >
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        Hình ảnh hiện tại / mới
                    </Typography>
                    <Box
                        sx={{
                            width: "100%",
                            maxWidth: 400,
                            borderRadius: 2,
                            overflow: "hidden",
                            border: "2px dashed #ccc",
                            backgroundColor: "#fafafa",
                            mb: 2,
                        }}
                    >
                        <img
                            src={imageBanner || formData?.image}
                            alt="Banner"
                            style={{ width: "100%", height: "auto", objectFit: "cover" }}
                        />
                    </Box>

                    <Button
                        variant="outlined"
                        component="label"
                        startIcon={<UploadFileIcon />}
                    >
                        Tải ảnh lên
                        <input
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </Button>
                    {imageBanner && (
                        <Typography variant="caption" color="textSecondary" mt={1}>
                            Ảnh mới đã được chọn
                        </Typography>
                    )}
                </Box>

                <TextField
                    id="title"
                    label="Tiêu đề"
                    name="title"
                    value={formData?.title || ""}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    id="link"
                    label="Liên kết"
                    name="link"
                    value={formData?.link || ""}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel id="status-label">Trạng thái</InputLabel>
                    <Select
                        labelId="status-label"
                        id="status"
                        name="status"
                        value={formData?.status || ""}
                        label="Trạng thái"
                        onChange={handleSelectChange}
                    >
                        <MenuItem value="active">Hoạt động</MenuItem>
                        <MenuItem value="inactive">Không hoạt động</MenuItem>
                    </Select>
                </FormControl>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose} color="inherit">
                    Hủy
                </Button>
                <Button variant="contained" onClick={handleSubmit}>
                    Lưu
                </Button>
            </DialogActions>
        </Dialog>
    )
}
export default BannerEditModal