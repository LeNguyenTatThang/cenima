import React from "react"
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    FormControl,
    SelectChangeEvent,
    InputLabel,
    Select,
    MenuItem,
    Box,
} from "@mui/material"
import { AccountType } from "../../type/types"
import UploadFileIcon from '@mui/icons-material/UploadFile'

interface Props {
    open: boolean
    account: AccountType | null
    onClose: () => void
    onUpdated: () => void
}

const AccountEditModal: React.FC<Props> = ({ open, account, onClose, onUpdated }) => {
    const [formData, setFormData] = React.useState<AccountType | null>(account)
    const [profilePicture, setProfilePicture] = React.useState<string>("")
    const [fileInput, setFileInput] = React.useState<File | null>(null)
    React.useEffect(() => {
        setFormData(account)
    }, [account])

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
            data.append("name", formData.name)
            data.append("email", formData.email)
            data.append("role", formData.role)
            data.append("status", formData.status)
            if (fileInput) {
                data.append("profile_picture", fileInput)
            }
            const updateAccount = await fetch(`http://localhost:5000/api/updateAccount/${formData.id}`, {
                method: "PUT",
                body: data,
            })

            if (updateAccount.ok) {
                const updatedAccount = await updateAccount.json()
                console.log(updatedAccount)
                onUpdated()
                onClose()
            }

        } catch (err) {
            console.log(err)
        }
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            setFileInput(file)
            const reader = new FileReader()
            reader.onload = () => {
                setProfilePicture(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Chỉnh sửa tài khoản</DialogTitle>
            <DialogContent>
                <Button
                    variant="contained"
                    component="label"
                    startIcon={<UploadFileIcon />}
                >
                    Upload Avatar
                    <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </Button>
                {
                    profilePicture && (
                        <Box
                            sx={{
                                width: 150,
                                height: 150,
                                borderRadius: "50%",
                                overflow: "hidden",
                                border: "2px solid #ccc",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "#f0f0f0",
                            }}
                        >
                            {profilePicture ? (
                                <img
                                    src={profilePicture}
                                    alt="Avatar"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                    }}
                                />
                            ) : (
                                <span>No Profile Picture</span>
                            )}
                        </Box>
                    )
                }
                <TextField
                    id="name"
                    label="Tên"
                    name="name"
                    value={formData?.name || ""}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    id="email"
                    label="Email"
                    name="email"
                    value={formData?.email || ""}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Role</InputLabel>
                    <Select
                        id="role"
                        label="Role"
                        name="role"
                        value={formData?.role || ""}
                        onChange={handleSelectChange}
                    >
                        <MenuItem value="admin">Admin</MenuItem>
                        <MenuItem value="user">User</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <InputLabel>Status</InputLabel>
                    <Select
                        id="status"
                        label="Status"
                        name="status"
                        value={formData?.status || ""}
                        onChange={handleSelectChange}
                    >
                        <MenuItem value="active">Active</MenuItem>
                        <MenuItem value="inactive">Inactive</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="contained" color="warning" sx={{ margin: "0 auto", display: "center" }}> Change password</Button>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Hủy</Button>
                <Button variant="contained" onClick={handleSubmit}>Lưu</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AccountEditModal