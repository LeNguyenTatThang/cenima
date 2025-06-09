import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    Stack,
    Button,
} from "@mui/material"
import { useState, useMemo } from "react"
import { isEqual, cloneDeep } from "lodash"

const initialTicketData = [
    {
        day: "Thứ 2, 4, 5",
        showtimes: [
            {
                time: "Trước 17:00",
                prices: [
                    "75.000",
                    "55.000",
                    "55.000"
                ]
            },
            {
                time: "Sau 17:00",
                prices: [
                    "80.000",
                    "55.000",
                    "55.000"
                ]
            }
        ]
    },
    {
        day: "Thứ 3",
        showtimes: [
            {
                time: "Happy Day",
                prices: [
                    "55.000",
                    "55.000",
                    "55.000"
                ]
            }]
    },
    {
        day: "Thứ 6, 7, CN",
        showtimes: [
            {
                time: "Trước 17:00",
                prices: [
                    "85.000",
                    "65.000",
                    "65.000"
                ]
            },
            {
                time: "Sau 17:00",
                prices: [
                    "95.000",
                    "65.000",
                    "65.000"
                ]
            }
        ]
    },
    {
        day: "Ngày lễ",
        showtimes: [
            {
                time: "",
                prices: [
                    "100.000",
                    "100.000",
                    "65.000"
                ]
            }
        ]
    },
    {
        day: "Ngày tri ân",
        showtimes: [
            {
                time: "",
                prices: [
                    "50.000",
                    "50.000",
                    "50.000"
                ]
            }
        ]
    },
    {
        day: "Sau 22h (thành viên)",
        showtimes: [
            {
                time: "",
                prices: [
                    "60.000",
                    "50.000",
                    "50.000"
                ]
            }
        ]
    }
]

export default function Prince() {
    const [ticketData, setTicketData] = useState(() => cloneDeep(initialTicketData))
    const [editingCell, setEditingCell] = useState<{
        rowIndex: number,
        showtimeIndex: number,
        priceIndex: number
    } | null>(null)

    const handleChangePrice = (value: string, rowIndex: number, showtimeIndex: number, priceIndex: number) => {
        const newData = cloneDeep(ticketData)
        newData[rowIndex].showtimes[showtimeIndex].prices[priceIndex] = value
        setTicketData(newData)
    }

    const hasChanged = useMemo(() => !isEqual(ticketData, initialTicketData), [ticketData])

    const resetChanges = () => {
        setTicketData(cloneDeep(initialTicketData))
        setEditingCell(null)
    }

    const saveChanges = () => {
        console.log("Save to server:", ticketData)

    }

    const renderPriceCell = (rowIndex: number, showtimeIndex: number, priceIndex: number) => {
        const price = ticketData[rowIndex].showtimes[showtimeIndex].prices[priceIndex]
        const isEditing =
            editingCell &&
            editingCell.rowIndex === rowIndex &&
            editingCell.showtimeIndex === showtimeIndex &&
            editingCell.priceIndex === priceIndex

        return (
            <TableCell
                onClick={() =>
                    setEditingCell({ rowIndex, showtimeIndex, priceIndex })
                }
                sx={{ cursor: "pointer", borderRight: "1px solid rgba(255,255,255,0.5)" }}
            >
                {isEditing ? (
                    <TextField
                        variant="standard"
                        autoFocus
                        value={price}
                        onChange={(e) =>
                            handleChangePrice(e.target.value, rowIndex, showtimeIndex, priceIndex)
                        }
                        onBlur={() => setEditingCell(null)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") setEditingCell(null)
                        }}
                        sx={{ input: { color: "#fff", textAlign: "center" } }}
                    />
                ) : (
                    price
                )}
            </TableCell>
        )
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{
                    "& td, & th": { textAlign: "center", verticalAlign: "middle" },
                    "& .special-cell": {
                        textAlign: "start !important", fontWeight: "bold", paddingLeft: "3rem"
                    },
                }}>
                    <TableHead sx={{ background: "linear-gradient(to right, #003366, #004080)" }}>
                        <TableRow>
                            <TableCell sx={{ color: "#fff", fontWeight: "bold", borderRight: "1px solid rgba(255,255,255,0.5)" }}>Thời gian</TableCell>
                            <TableCell sx={{ color: "#fff", fontWeight: "bold", borderRight: "1px solid rgba(255,255,255,0.5)" }}>Suất chiếu</TableCell>
                            <TableCell sx={{ color: "#fff", fontWeight: "bold", borderRight: "1px solid rgba(255,255,255,0.5)" }}>⭐ Thành viên / Người lớn</TableCell>
                            <TableCell sx={{ color: "#fff", fontWeight: "bold", borderRight: "1px solid rgba(255,255,255,0.5)" }}>U22</TableCell>
                            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Trẻ em / Người cao tuổi</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ticketData.map((item, rowIndex) =>
                            item.showtimes.map((s, showtimeIndex) => {
                                const rowStyle = {
                                    background: "linear-gradient(to right,rgb(37, 82, 127),rgb(85, 141, 197))",
                                    color: "#fff"
                                }

                                return (
                                    <TableRow key={`${rowIndex}-${showtimeIndex}`} sx={rowStyle}>
                                        {showtimeIndex === 0 && (
                                            <TableCell
                                                rowSpan={item.showtimes.length}
                                                sx={{ borderRight: "1px solid rgba(255,255,255,0.5)", color: "#fff", fontWeight: "bold" }}
                                            >
                                                {item.day}
                                            </TableCell>
                                        )}
                                        <TableCell sx={{ borderRight: "1px solid rgba(255,255,255,0.5)" }}>{s.time}</TableCell>

                                        {renderPriceCell(rowIndex, showtimeIndex, 0)}
                                        {renderPriceCell(rowIndex, showtimeIndex, 1)}
                                        {renderPriceCell(rowIndex, showtimeIndex, 2)}
                                    </TableRow>
                                )
                            })
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            {hasChanged && (
                <Stack direction="row" spacing={2} mt={2} justifyContent="flex-end">
                    <Button variant="outlined" color="secondary" onClick={resetChanges}>🔄 Reset</Button>
                    <Button variant="contained" color="primary" onClick={saveChanges}>💾 Lưu</Button>
                </Stack>
            )}

        </>
    )
}