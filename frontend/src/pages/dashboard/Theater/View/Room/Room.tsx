import React, { useState } from "react"
import { useParams } from "react-router-dom"
import {
    Box,
    Typography,
    Grid,
    Button,
    Breadcrumbs,
    Link
} from "@mui/material"
import {
    NavigateNext as NavigateNextIcon
} from '@mui/icons-material'

const ROWS = 10
const COLS = 14

const generateMatrixSeats = () => {
    const seats = []
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const id = `${String.fromCharCode(65 + (ROWS - row - 1))}${col + 1}`
            let type: 'single' | 'double' | 'vip' = 'single'

            if (row === 0) {
                type = 'double'
            }
            if (
                row !== 0 &&
                col >= Math.floor(COLS / 2) - 2 &&
                col <= Math.floor(COLS / 2) + 1
            ) {
                type = 'vip'
            }
            seats.push({ id, row, col, status: true, type })
        }
    }

    return seats.reverse()
}
const Room = () => {

    const { roomId } = useParams()
    const [seats, setSeats] = useState(generateMatrixSeats())

    const toggleSeatStatus = (index: number) => {
        const updatedSeats = [...seats]
        updatedSeats[index].status = !updatedSeats[index].status
        setSeats(updatedSeats)
    }

    const getSeatColor = (type: string) => {
        switch (type) {
            case "single": return "green"
            case "double": return "orange"
            case "vip": return "red"
            default: return "gray"
        }
    }

    return (
        <Box>
            <Box sx={{ mb: 1 }}>
                <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small" />}
                    aria-label="breadcrumb"
                >
                    <Link underline="hover" color="inherit" href="/dashboard">
                        Dashboard
                    </Link>
                    <Typography color="text.primary">
                        <Link underline="hover" color="inherit" href="/dashboard/theater">
                            Quản lý phòng chiếu
                        </Link>
                    </Typography>
                    <Typography color="text.primary">Phòng chiếu: {roomId}</Typography>
                </Breadcrumbs>
                <Typography variant="h4" sx={{ mt: 1 }}>
                    Quản lý phòng chiếu phim: {roomId}
                </Typography>
            </Box>
            <Box p={1}>
                {[...Array(ROWS)].map((_, rowIndex) => (
                    <Grid container spacing={1} key={rowIndex} mb={1} justifyContent="center">
                        {seats
                            .filter(seat => seat.row === rowIndex)
                            .map((seat) => (
                                <React.Fragment key={seat.id}>
                                    <Button
                                        variant="contained"
                                        onClick={() => toggleSeatStatus(seats.findIndex(s => s.id === seat.id))}
                                        sx={{
                                            width: 50,
                                            height: 50,
                                            bgcolor: seat.status ? getSeatColor(seat.type) : "#999",
                                            color: "white",
                                            fontWeight: "bold",
                                            "&:hover": {
                                                opacity: 0.8
                                            }
                                        }}
                                    >
                                        {seat.id}
                                    </Button>
                                </React.Fragment>
                            ))}
                    </Grid>
                ))}

                <Box mt={4}>
                    <Typography variant="subtitle2">🟩 Ghế đơn | 🟧 Ghế đôi | 🟥 Ghế VIP | ⬛ Ghế bị khóa</Typography>
                    <Typography variant="body2" color="text.secondary">Click để thay đổi trạng thái hoạt động</Typography>
                </Box>
            </Box>
        </Box>

    )
}

export default Room