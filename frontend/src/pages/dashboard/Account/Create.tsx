import React, { useState } from "react"
import {
    Paper,
    Typography,
    Snackbar,
    Alert,
    Box,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material"
import { SelectChangeEvent } from "@mui/material/Select"
const roles = ["admin", "user"]
const statuses = ["active", "inactive"]

const CreateAccount = () => {
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState("")
    const [severity, setSeverity] = useState<"success" | "error">("success")

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "user",
        status: "active",
        profile_picture: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSelectChange = (e: SelectChangeEvent) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await fetch(
                "http://localhost:5000/api/createAccount",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            )
            const data = await response.json()
            console.log(data)
            setMessage(data.message)
            setSeverity("success")
            setOpen(true)

            if (!response.ok) {
                throw new Error("Failed to create account")
            }
            setFormData({
                name: "",
                email: "",
                password: "",
                role: "user",
                status: "active",
                profile_picture: "",
            })
        } catch (error) {
            console.error(error)
        }
    }
    const handleClose = () => {
        setOpen(false)
    }

    return (
        <Paper elevation={3} sx={{ p: 4, maxWidth: 500, mx: "auto", mt: 5 }}>
            <Typography variant="h5" gutterBottom>
                Create Account
            </Typography>

            <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
                    {message}
                </Alert>
            </Snackbar>

            <form onSubmit={handleSubmit}>
                <Box display="flex" flexDirection="column" gap={2}>
                    <TextField
                        id="name"
                        label="Name"
                        name="name"
                        fullWidth
                        value={formData.name}
                        onChange={handleChange}
                    />

                    <TextField
                        id="email"
                        label="Email"
                        name="email"
                        fullWidth
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <TextField
                        id="password"
                        label="Password"
                        type="password"
                        name="password"
                        fullWidth
                        value={formData.password}
                        onChange={handleChange}
                    />

                    {/* Role */}
                    <FormControl fullWidth>
                        <InputLabel id="role-label">Role</InputLabel>
                        <Select
                            labelId="role-label"
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleSelectChange}
                            label="Role"
                        >
                            {roles.map((role) => (
                                <MenuItem key={role} value={role}>
                                    {role}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel id="status-label">Status</InputLabel>
                        <Select
                            labelId="status-label"
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleSelectChange}
                            label="Status"
                        >
                            {statuses.map((status) => (
                                <MenuItem key={status} value={status}>
                                    {status}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        id="profile_picture"
                        label="Profile Picture URL"
                        name="profile_picture"
                        fullWidth
                        value={formData.profile_picture}
                        onChange={handleChange}
                    />

                    <Button type="submit" variant="contained" color="primary">
                        Create Account
                    </Button>
                </Box>
            </form>
        </Paper>
    )
}

export default CreateAccount