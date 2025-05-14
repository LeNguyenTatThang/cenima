import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import {
    Box, Typography, Grid, Button, Breadcrumbs, Link, CircularProgress, TextField
} from "@mui/material"
import { NavigateNext as NavigateNextIcon } from '@mui/icons-material'
import { SeatType } from "../../../../../type/types"
import {
    Dialog, DialogTitle, DialogContent, DialogContentText,
    DialogActions
} from "@mui/material"



const Room = () => {
    const { id } = useParams()
    const [seats, setSeats] = useState<SeatType[]>([])
    const [loading, setLoading] = useState(true)
    const [nameAuditorium, setNameAuditorium] = useState<string>('')
    const [rowsCount, setRowsCount] = useState<number>(5)
    const [rowsInput, setRowsInput] = useState<string>("ABCDE")
    const [columnsInput, setColumnsInput] = useState(10)
    const [openConfirm, setOpenConfirm] = useState(false)


    useEffect(() => {
        const letters = Array.from({ length: rowsCount }, (_, i) => String.fromCharCode(65 + i)).join("")
        setRowsInput(letters)
    }, [rowsCount])
    useEffect(() => {
        const fetchSeats = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/getseats/${id}`)
                const data = await res.json()

                if (data?.name_auditorium && data?.seats) {
                    setNameAuditorium(data.name_auditorium)
                    setSeats(data.seats)
                }
            } catch (err) {
                console.error("Lỗi khi lấy ghế:", err)
            } finally {
                setLoading(false)
            }
        }

        fetchSeats()
    }, [id])

    const toggleSeatStatus = (index: number) => {
        const updatedSeats = [...seats]
        updatedSeats[index].status = updatedSeats[index].status === 'available' ? 'locked' : 'available'
        setSeats(updatedSeats)
    }

    const getSeatColor = (type: string, status: string) => {
        if (status === 'unavailable') return "#999"
        switch (type) {
            case "single": return "green"
            case "double": return "orange"
            case "vip": return "red"
            default: return "gray"
        }
    }

    const handleCreateSeats = async () => {
        try {
            const body = {
                auditorium_id: Number(id),
                row: rowsInput,
                number: columnsInput,
                type: "single",
                status: "available"
            }

            const res = await fetch("http://localhost:5000/api/createSeatForAuditorium", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })

            const result = await res.json()
            if (res.ok) {
                setSeats(result.seats)
            } else {
                console.error("Lỗi tạo ghế:", result.message)
            }
        } catch (err) {
            console.error("Lỗi gửi yêu cầu tạo ghế:", err)
        }
    }

    if (loading) return <Box textAlign="center" mt={4}><CircularProgress /></Box>

    const handleConfirmDelete = async () => {
        try {
            const res = await fetch(`http://localhost:5000/api/deleteSeat/${id}`, {
                method: "DELETE"
            })

            if (res.ok) {
                setSeats([])
            }
        } catch (err) {
            console.error("Lỗi khi xóa ghế:", err)
            alert("Lỗi kết nối tới máy chủ.")
        } finally {
            setOpenConfirm(false)
        }
    }

    const handleChangeRowAttribute = (row: string) => {
        const updatedSeats = seats.map(seat => {
            if (seat.row === row) {
                return {
                    ...seat,
                    type: seat.type === 'vip' ? 'single' : 'vip',
                }
            }

            return seat
        })
        setSeats(updatedSeats)
    }


    return (
        <Box>
            <Box sx={{ mb: 1 }}>
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
                    <Link underline="hover" color="inherit" href="/dashboard">Dashboard</Link>
                    <Link underline="hover" color="inherit" href="/dashboard/theater">Quản lý phòng chiếu</Link>
                    <Typography color="text.primary">Phòng chiếu: {nameAuditorium}</Typography>
                </Breadcrumbs>
                <Typography variant="h4" sx={{ mt: 1 }}>
                    Quản lý phòng chiếu phim: Phòng {nameAuditorium}
                </Typography>
            </Box>

            <Box p={1}>
                {seats.length > 0 ? (
                    <>
                        {[...new Set(seats.map(seat => seat.row))]
                            .sort()
                            .map((rowLetter) => (
                                <Grid container spacing={1} key={rowLetter} mb={1} justifyContent="center" alignItems="center">
                                    {/* Nút chỉnh thuộc tính toàn hàng */}
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        color="primary"
                                        sx={{ minWidth: 40, height: 50, mr: 1 }}
                                        onClick={() => handleChangeRowAttribute(rowLetter)}
                                    >
                                        {rowLetter}
                                    </Button>

                                    {seats
                                        .filter(seat => seat.row === rowLetter)
                                        .sort((a, b) => Number(a.number) - Number(b.number))
                                        .map((seat) => (
                                            <Button
                                                key={seat.id}
                                                variant="contained"
                                                onClick={() => toggleSeatStatus(seats.findIndex(s => s.id === seat.id))}
                                                sx={{
                                                    width: 50,
                                                    height: 50,
                                                    bgcolor: getSeatColor(seat.type, seat.status),
                                                    color: "white",
                                                    fontWeight: "bold",
                                                    "&:hover": { opacity: 0.8 }
                                                }}
                                            >
                                                {seat.row}{seat.number}
                                            </Button>
                                        ))}
                                </Grid>
                            ))}

                        <Box textAlign="right" mb={2}>
                            <Button variant="outlined" color="error" onClick={() => setOpenConfirm(true)}>
                                Xóa tất cả ghế
                            </Button>
                        </Box>
                        <Box mt={4}>
                            <Typography variant="subtitle2">
                                🟩 Ghế đơn | 🟧 Ghế đôi | 🟥 Ghế VIP | ⬛ Ghế bị loại (lối đi)
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Click vào ghế để bật/tắt trạng thái hoạt động
                            </Typography>
                        </Box>

                        <Dialog
                            open={openConfirm}
                            onClose={() => setOpenConfirm(false)}
                        >
                            <DialogTitle>Xác nhận xóa</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Bạn có chắc chắn muốn <strong>xóa toàn bộ ghế</strong> trong phòng chiếu này không? Hành động này không thể hoàn tác.
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setOpenConfirm(false)} color="primary">
                                    Hủy
                                </Button>
                                <Button onClick={handleConfirmDelete} color="error" variant="contained">
                                    Xóa
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </>
                ) : (
                    <Box>
                        <Typography variant="h6" mb={2}>Tạo sơ đồ ghế mới cho phòng {nameAuditorium}</Typography>
                        <TextField
                            label="Số hàng ghế"
                            type="number"
                            value={rowsCount}
                            onChange={(e) => setRowsCount(Number(e.target.value))}
                            sx={{ mr: 2 }}
                        />
                        <TextField
                            label="Số cột ghế"
                            type="number"
                            value={columnsInput}
                            onChange={(e) => setColumnsInput(Number(e.target.value))}
                            sx={{ mr: 2 }}
                        />
                        <Button variant="contained" onClick={handleCreateSeats}>
                            Tạo ghế
                        </Button>
                    </Box>
                )}
            </Box>
        </Box>
    )
}

export default Room
