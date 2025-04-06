import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { Container, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Email:', email)
        console.log('Password:', password)
    }
    const navigate = useNavigate()
    const goHome = () => {
        navigate("/")
    }

    return (
        <div className="login-container">

            <Container component="main" maxWidth="sm">
                <a className="homeLink" onClick={goHome}>Về trang chủ</a>
                <Box
                    sx={{
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        boxShadow: 3,
                        padding: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Stack spacing={2} sx={{ width: 500 }}>
                        <img
                            src="https://plus.unsplash.com/premium_photo-1701760184917-38e25718ee3e?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bG9naW4lMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww"
                            alt="Logo"
                        />
                        <TextField
                            label="Tài khoản email"
                            type="email"
                            variant="outlined"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            required
                        />

                        <TextField
                            label="Mật khẩu"
                            type="password"
                            variant="outlined"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                            required
                        />

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                            fullWidth
                        >
                            Đăng nhập
                        </Button>
                    </Stack>
                </Box>
            </Container >
        </div>
    )
}

export default Login
