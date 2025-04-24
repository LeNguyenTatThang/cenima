import { alpha, Box, Button, Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useTheme } from "@mui/material"
import React from "react"
import { useNavigate } from "react-router-dom"
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AccountEditModal from "../../../components/dashboard/AccountEditModal"
import { AccountType } from "../../../type/types"
import { deleteAccount, getAllAccounts } from "../../../services/accountApi"
const Account = () => {
    const [accounts, setAccounts] = React.useState<AccountType[]>([])
    const [selectedAccount, setSelectedAccount] = React.useState<AccountType | null>(null)
    const [openModal, setOpenModal] = React.useState(false)
    const theme = useTheme()
    React.useEffect(() => {
        fetchAccounts()
    }, [])

    const router = useNavigate()
    const handleChangeCreateAccount = () => {
        router("/dashboard/account/create")
    }

    const handleEditAccount = (id: number) => {
        const account = accounts.find((acc) => acc.id === id)
        if (account) {
            setSelectedAccount(account)
            setOpenModal(true)
        }
    }
    const handleDeleteAccount = async (id: number) => {
        try {
            await deleteAccount(id)
            setAccounts((prev) => prev.filter((acc) => acc.id !== id))
        } catch (err) {
            console.error(err)
        }
    }

    const fetchAccounts = async () => {
        try {
            const data = await getAllAccounts()
            setAccounts(data)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            <Box sx={{ mt: 4 }}>
                <Button onClick={handleChangeCreateAccount} variant="contained" color="primary" sx={{ mb: 2 }}>
                    Tạo tài khoản
                </Button>
                <Typography variant="h5" gutterBottom textAlign="center">
                    Danh sách tài khoản
                </Typography>
                <TableContainer component={Paper} sx={{ maxWidth: 1200, mx: "auto" }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>ID</strong></TableCell>
                                <TableCell><strong>Avt</strong></TableCell>
                                <TableCell><strong>Name</strong></TableCell>
                                <TableCell><strong>Email</strong></TableCell>
                                <TableCell><strong>Point</strong></TableCell>
                                <TableCell><strong>Role</strong></TableCell>
                                <TableCell><strong>Status</strong></TableCell>
                                <TableCell><strong>Ngày tao</strong></TableCell>
                                <TableCell><strong>Thao tác</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                            {accounts.map((account: any) => (
                                <TableRow key={account.id}>
                                    <TableCell>{account.id}</TableCell>
                                    <TableCell>
                                        <img
                                            src={account?.profile_picture}
                                            alt={account.name}
                                            style={{ width: 50, height: 50, borderRadius: "50%" }}
                                        />
                                    </TableCell>
                                    <TableCell>{account.name}</TableCell>
                                    <TableCell>{account.email}</TableCell>
                                    <TableCell>{account.points}</TableCell>
                                    <TableCell>{account.role}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={account.status}
                                            size="small"
                                            sx={{
                                                backgroundColor:
                                                    account.status === "active"
                                                        ? alpha(theme.palette.success.main, 0.1)
                                                        : alpha(theme.palette.error.main, 0.1),
                                                color:
                                                    account.status === "active"
                                                        ? theme.palette.success.main
                                                        : theme.palette.error.main,
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {new Date(account.createdAt).toLocaleDateString("vi-VN")}
                                    </TableCell>
                                    <TableCell>
                                        <Button onClick={() => handleEditAccount(account.id)}>
                                            <EditIcon color="warning" />
                                        </Button>
                                        <Button onClick={() => handleDeleteAccount(account.id)}>
                                            <DeleteIcon color="error" />
                                        </Button>
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
            <AccountEditModal
                open={openModal}
                account={selectedAccount}
                onClose={() => setOpenModal(false)}
                onUpdated={fetchAccounts}
            />
        </>

    )
}

export default Account