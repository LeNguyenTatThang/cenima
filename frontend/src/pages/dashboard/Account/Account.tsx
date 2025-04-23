import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import React from "react"
import { useNavigate } from "react-router-dom"


const Account = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [accounts, setAccounts] = React.useState<any[]>([])
    React.useEffect(() => {
        const getAllAccount = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/getAccounts")
                const data = await response.json()
                setAccounts(data)
                console.log(data)
            } catch (error) {
                console.error(error)
            }
        }
        getAllAccount()
    }, [])

    const router = useNavigate()
    const handleChangeCreateAccount = () => {
        router("/dashboard/account/create")
    }

    return (
        <Box sx={{ mt: 4 }}>
            <Button onClick={handleChangeCreateAccount} variant="contained" color="primary" sx={{ mb: 2 }}>
                Tạo tài khoản
            </Button>
            <Typography variant="h5" gutterBottom textAlign="center">
                Danh sách tài khoản
            </Typography>
            <TableContainer component={Paper} sx={{ maxWidth: 1000, mx: "auto" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>ID</strong></TableCell>
                            <TableCell><strong>Name</strong></TableCell>
                            <TableCell><strong>Email</strong></TableCell>
                            <TableCell><strong>Role</strong></TableCell>
                            <TableCell><strong>Status</strong></TableCell>
                            <TableCell><strong>Ngày cập nhật</strong></TableCell>
                            <TableCell><strong>Hanh dong</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        {accounts.map((account: any) => (
                            <TableRow key={account.id}>
                                <TableCell>{account.id}</TableCell>
                                <TableCell>{account.name}</TableCell>
                                <TableCell>{account.email}</TableCell>
                                <TableCell>{account.role}</TableCell>
                                <TableCell>{account.status}</TableCell>
                                <TableCell>
                                    {new Date(account.updatedAt).toLocaleDateString("vi-VN")}
                                </TableCell>
                                <TableCell>
                                    <button>Chi tiet</button>
                                    <button>Sua</button>
                                    <button>Xoa</button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {accounts.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} align="center">
                                    Không có dữ liệu.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default Account