import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import {
    Box,
    Typography,
    Grid,
    Button,
    Breadcrumbs,
    Link,
    CircularProgress,
    TextField,
    DialogContent,
    DialogContentText,
} from "@mui/material"
import { NavigateNext as NavigateNextIcon } from "@mui/icons-material"
import CustomDialog from "../../../../../components/dashboard/CustomDialog"
import {
    createSeats,
    deleteSeatsByAuditorium,
    fetchSeatsByAuditorium,
} from "../../../../../services/roomApi"
import ModeEditIcon from '@mui/icons-material/ModeEdit'
type SeatType = {
    id: number;
    auditorium_id: number;
    row: string;
    number: number | string;
    type: string;
    status: string;
};
interface UpdateSeatPayload {
    id: number;
    auditorium_id: string | number | undefined;
    type: string;
    status: string;
}
const Room = () => {
    const { id } = useParams()
    const [seats, setSeats] = useState<SeatType[]>([])
    const [loading, setLoading] = useState(true)
    const [nameAuditorium, setNameAuditorium] = useState("")
    const [rowsCount, setRowsCount] = useState(5)
    const [rowsInput, setRowsInput] = useState("ABCDE")
    const [columnsInput, setColumnsInput] = useState(10)
    const [openConfirm, setOpenConfirm] = useState(false)
    const [openEditDialog, setOpenEditDialog] = useState(false)

    const [editMode, setEditMode] = useState<"row" | "seat">("row")

    const [selectedRow, setSelectedRow] = useState<string | null>(null)
    const [selectedSeat, setSelectedSeat] = useState<SeatType | null>(null)
    const [selectedType, setSelectedType] = useState("standard")
    const [selectedStatus, setSelectedStatus] = useState("available")

    const [pairSide, setPairSide] = useState<"left" | "right" | null>(null)

    useEffect(() => {
        setRowsInput(
            Array.from({ length: rowsCount }, (_, i) =>
                String.fromCharCode(65 + i)
            ).join("")
        )
    }, [rowsCount])

    useEffect(() => {
        fetchData()
    }, [id])

    const fetchData = async () => {
        try {
            const data = await fetchSeatsByAuditorium(id!)
            setNameAuditorium(data.name_auditorium)
            setSeats(data.seats)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const getSeatColor = (type: string, status: string) => {
        if (status === "unavailable") return "#999"

        return type === "single"
            ? "green"
            : type === "double"
                ? "orange"
                : type === "vip"
                    ? "red"
                    : "gray"
    }

    const handleCreateSeats = async () => {
        try {
            const result = await createSeats(Number(id), rowsInput, columnsInput)
            setSeats(result.seats)
        } catch (err) {
            console.error(err)
        }
    }

    const handleConfirmDelete = async () => {
        try {
            await deleteSeatsByAuditorium(id!)
            setSeats([])
        } catch (err) {
            console.error(err)
        } finally {
            setOpenConfirm(false)
        }
    }

    const handleOpenEditDialog = (row: string) => {
        setEditMode("row")
        setSelectedRow(row)
        const seat = seats.find((s) => s.row === row)
        if (seat) {
            setSelectedType(seat.type)
            setSelectedStatus(seat.status)
        }
        setOpenEditDialog(true)
    }

    const handleOpenEditSeatDialog = (seat: SeatType) => {
        setEditMode("seat")
        setSelectedSeat(seat)
        setSelectedType(seat.type)
        setSelectedStatus(seat.status)
        setPairSide(null)
        setOpenEditDialog(true)
    }
    const hasLeftSeat = () => {
        if (!selectedSeat) return false

        return seats.some(
            (seat) =>
                seat.row === selectedSeat.row &&
                Number(seat.number) === Number(selectedSeat.number) - 1 &&
                seat.type === "single"
        )
    }

    const hasRightSeat = () => {
        if (!selectedSeat) return false

        return seats.some(
            (seat) =>
                seat.row === selectedSeat.row &&
                Number(seat.number) === Number(selectedSeat.number) + 1 &&
                seat.type === "single"
        )
    }

    const handleApplyRowEdit = async () => {
        if (!selectedRow) return
        setLoading(true)
        try {
            const res = await fetch("http://localhost:5000/api/updateSeat", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    auditorium_id: id,
                    row: selectedRow,
                    type: selectedType,
                    status: selectedStatus,
                }),
            })
            const data = await res.json()
            if (res.ok) {
                fetchData()
                setOpenEditDialog(false)
                setLoading(false)
            } else {
                alert(data.message || "Cập nhật thất bại")
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật hàng ghế:", error)
            alert("Đã xảy ra lỗi khi gửi yêu cầu cập nhật")
        }
    }

    const handleApplySeatEdit = async () => {
        if (!selectedSeat) return
        setLoading(true)

        try {
            const updateMainSeatBody: UpdateSeatPayload = {
                id: selectedSeat.id,
                auditorium_id: id,
                type: selectedType,
                status: selectedStatus,
            }
            if (selectedType === "double" && pairSide) {
                const neighborNumber =
                    pairSide === "left"
                        ? Number(selectedSeat.number) - 1
                        : Number(selectedSeat.number) + 1
                const neighborSeat = seats.find(
                    (s) =>
                        s.row === selectedSeat.row &&
                        Number(s.number) === neighborNumber
                )

                if (!neighborSeat) {
                    alert("Không tìm thấy ghế bên cạnh để ghép đôi")
                    setLoading(false)

                    return
                }

                const resMain = await fetch("http://localhost:5000/api/updateSeat", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updateMainSeatBody),
                })
                if (!resMain.ok) {
                    const errData = await resMain.json()
                    alert(errData.message || "Cập nhật ghế chính thất bại")
                    setLoading(false)

                    return
                }
                const resNeighbor = await fetch(
                    "http://localhost:5000/api/updateSeat",
                    {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            id: neighborSeat.id,
                            auditorium_id: id,
                            type: "double",
                            status: selectedStatus,
                        }),
                    }
                )
                if (!resNeighbor.ok) {
                    const errData = await resNeighbor.json()
                    alert(errData.message || "Cập nhật ghế ghép đôi thất bại")
                    setLoading(false)

                    return
                }
            } else {
                const res = await fetch("http://localhost:5000/api/updateSeat", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updateMainSeatBody),
                })
                if (!res.ok) {
                    const errData = await res.json()
                    alert(errData.message || "Cập nhật ghế thất bại")
                    setLoading(false)

                    return
                }
            }

            await fetchData()
            setOpenEditDialog(false)
            setLoading(false)
        } catch (error) {
            console.error("Lỗi khi cập nhật ghế:", error)
            alert("Đã xảy ra lỗi khi gửi yêu cầu cập nhật")
            setLoading(false)
        }
    }

    if (loading)
        return (
            <Box textAlign="center" mt={4}>
                <CircularProgress />
            </Box>
        )

    return (
        <Box>
            <Box mb={1}>
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
                    <Link underline="hover" color="inherit" href="/dashboard">
                        Dashboard
                    </Link>
                    <Link underline="hover" color="inherit" href="/dashboard/theater">
                        Quản lý phòng chiếu
                    </Link>
                    <Typography color="text.primary">{nameAuditorium}</Typography>
                </Breadcrumbs>
            </Box>
            {!seats.length && (
                <Box mb={2}>
                    <Typography variant="h6" mb={1}>
                        Tạo ghế mới cho phòng {nameAuditorium}
                    </Typography>
                    <TextField
                        label="Số hàng (ví dụ: 5)"
                        value={rowsCount}
                        onChange={(e) => setRowsCount(Number(e.target.value))}
                        type="number"
                        size="small"
                        sx={{ mr: 2 }}
                    />
                    <TextField
                        label="Tên các hàng (ví dụ: ABCDE)"
                        value={rowsInput}
                        onChange={(e) => setRowsInput(e.target.value.toUpperCase())}
                        size="small"
                        sx={{ mr: 2, width: 120 }}
                    />
                    <TextField
                        label="Số ghế mỗi hàng"
                        value={columnsInput}
                        onChange={(e) => setColumnsInput(Number(e.target.value))}
                        type="number"
                        size="small"
                        sx={{ width: 120 }}
                    />
                    <Button variant="contained" onClick={handleCreateSeats} sx={{ ml: 2 }}>
                        Tạo ghế
                    </Button>
                </Box>
            )}

            {!!seats.length && (
                <Box>
                    <Box display="flex" mb={2} gap={1}>
                        <Button variant="outlined" color="error" onClick={() => setOpenConfirm(true)}>
                            Xóa toàn bộ ghế
                        </Button>
                    </Box>
                    {Array.from(new Set(seats.map((s) => s.row))).map((row) => (
                        <Box key={row} mb={3}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            gap={2}>

                            <Button variant="outlined" onClick={() => handleOpenEditDialog(row)}>
                                <ModeEditIcon />
                            </Button>
                            <Grid container spacing={1}>
                                {seats
                                    .filter((seat) => seat.row === row)
                                    .sort((a, b) => Number(a.number) - Number(b.number))
                                    .reduce<React.JSX.Element[]>((acc, seat, index, array) => {

                                        if (
                                            seat.type === "double" &&
                                            index > 0 &&
                                            Number(seat.number) === Number(array[index - 1].number) + 1 &&
                                            array[index - 1].type === "double"
                                        ) {
                                            return acc
                                        }
                                        if (
                                            seat.type === "double" &&
                                            index < array.length - 1 &&
                                            Number(array[index + 1].number) === Number(seat.number) + 1 &&
                                            array[index + 1].type === "double"
                                        ) {
                                            const nextSeat = array[index + 1]
                                            acc.push(
                                                <Box
                                                    key={`${seat.id}-${nextSeat.id}`}
                                                    onClick={() => handleOpenEditSeatDialog(seat)}
                                                    sx={{
                                                        width: 80,
                                                        height: 40,
                                                        bgcolor: getSeatColor(seat.type, seat.status),
                                                        color: "white",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        borderRadius: 1,
                                                        cursor: "pointer",
                                                        userSelect: "none",
                                                    }}
                                                    title={`Ghế đôi ${seat.row}${seat.number} + ${nextSeat.row}${nextSeat.number} - ${seat.type} - ${seat.status}`}
                                                >
                                                    {`${seat.row}${seat.number}+${nextSeat.number}`}
                                                </Box>
                                            )

                                            return acc
                                        }

                                        acc.push(
                                            <Box
                                                key={seat.id}
                                                onClick={() => handleOpenEditSeatDialog(seat)}
                                                sx={{
                                                    width: 40,
                                                    height: 40,
                                                    bgcolor: getSeatColor(seat.type, seat.status),
                                                    color: "white",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    borderRadius: 1,
                                                    cursor: "pointer",
                                                    userSelect: "none",
                                                }}
                                                title={`Ghế ${seat.row}${seat.number} - ${seat.type} - ${seat.status}`}
                                            >
                                                {`${seat.row}${seat.number}`}
                                            </Box>
                                        )

                                        return acc
                                    }, [])}

                            </Grid>
                        </Box>
                    ))}
                </Box>
            )}

            <CustomDialog
                open={openConfirm}
                onClose={() => setOpenConfirm(false)}
                title="Xác nhận xóa toàn bộ ghế"
                maxWidth="xs"
                onSubmit={handleConfirmDelete}
            >
                <DialogContent>
                    <DialogContentText>
                        Bạn có chắc muốn xóa toàn bộ ghế trong phòng chiếu {nameAuditorium} không?
                    </DialogContentText>
                </DialogContent>
            </CustomDialog>

            <CustomDialog
                open={openEditDialog}
                onClose={() => setOpenEditDialog(false)}
                title={editMode === "row" ? `Chỉnh sửa hàng ${selectedRow}` : `Chỉnh sửa ghế ${selectedSeat?.row}${selectedSeat?.number}`}
                maxWidth="xs"
                onSubmit={editMode === "row" ? handleApplyRowEdit : handleApplySeatEdit}
            >
                <DialogContent>
                    <Box mb={2}>
                        <TextField
                            select
                            label="Loại ghế"
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            SelectProps={{ native: true }}
                            fullWidth
                            size="small"
                        >
                            <option value="standard">Standard (ghế đơn)</option>
                            <option value="double">Double (ghế đôi)</option>
                            <option value="vip">VIP</option>
                            <option value="single">Single</option>
                        </TextField>
                    </Box>

                    <Box mb={2}>
                        <TextField
                            select
                            label="Trạng thái"
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            SelectProps={{ native: true }}
                            fullWidth
                            size="small"
                        >
                            <option value="available">Available (Có thể đặt)</option>
                            <option value="unavailable">Unavailable (Không thể đặt)</option>
                        </TextField>
                    </Box>

                    {editMode === "seat" && selectedType === "double" && (
                        <Box mt={2}>
                            <Typography variant="subtitle2" mb={1}>
                                Chọn ghế ghép đôi:
                            </Typography>
                            <Box display="flex" gap={1}>
                                {hasLeftSeat() && (
                                    <Button
                                        variant={pairSide === "left" ? "contained" : "outlined"}
                                        onClick={() => setPairSide("left")}
                                    >
                                        Ghép bên trái
                                    </Button>
                                )}
                                {hasRightSeat() && (
                                    <Button
                                        variant={pairSide === "right" ? "contained" : "outlined"}
                                        onClick={() => setPairSide("right")}
                                    >
                                        Ghép bên phải
                                    </Button>
                                )}
                                {!hasLeftSeat() && !hasRightSeat() && (
                                    <Typography color="error" variant="body2">
                                        Không có ghế bên cạnh để ghép đôi
                                    </Typography>
                                )}
                            </Box>
                        </Box>
                    )}
                </DialogContent>
            </CustomDialog>
        </Box>
    )
}

export default Room
