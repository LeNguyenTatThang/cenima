import React, { useEffect, useState } from "react"
import { Container, Card, CardContent, Typography, Box, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { deleteTheater, getAllTheaters, updateTheater } from "../../../services/thearterApi"
import { TheaterType } from "../../../type/types"
import { useNavigate } from "react-router-dom"
import { IconButton, CardActions, Tooltip } from "@mui/material"
import { Edit, Delete, Visibility } from "@mui/icons-material"
import TheaterEditDialog from "../../../components/dashboard/TheaterEditDialog"
import { useSnackbar } from "../../../components/dashboard/SnackbarContext"

const Theater = () => {
    const [theaters, setTheaters] = useState<TheaterType[]>([])
    const [cities, setCities] = useState<string[]>([])
    const [value, setValue] = useState(0)
    const navigate = useNavigate()
    const [isOpenDialog, setIsOpenDialog] = useState(false)
    const [selectTheater, setSelectTheater] = useState<TheaterType | null>(null)
    const { showMessage } = useSnackbar()
    useEffect(() => {
        fetchTheaters()
    }, [])

    const fetchTheaters = async () => {
        try {
            const response = await getAllTheaters()
            if (!response) return
            setTheaters(response)
            const uniqueCities = Array.from(new Set(response.map((theater) => theater.city)))
            console.log(uniqueCities)
            setCities(uniqueCities)
        } catch (err) {
            console.log(err)
        }
    }

    const filteredTheaters = theaters.filter((theater) => theater.city === cities[value])
    const handleChangePageCreate = () => {
        navigate('/dashboard/theater/create')
    }
    const handleEdit = (theater: TheaterType) => {
        setSelectTheater(theater)
        setIsOpenDialog(true)
    }
    const handleView = (id: number) => {
        navigate(`/dashboard/theater/view/${id}`)
        console.log(id)
    }
    const handleDelete = async (id: number) => {
        try {
            await deleteTheater(id)
            fetchTheaters()
            showMessage("Xoá rạp chiếu phim thành công")
        } catch (err) {
            console.log(err)
        }
    }
    const handleUpdate = async (form: { name: string; city: string; address: string; type: string }) => {
        if (!selectTheater) return
        try {
            await updateTheater(selectTheater.id, { ...selectTheater, ...form })
            showMessage("Cập nhật rạp chiếu phim thành công")
            fetchTheaters()
            setIsOpenDialog(false)
        } catch (err) {
            console.log(err)
        }

    }
    const handleDialogClose = () => {
        setIsOpenDialog(false)
    }

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Danh sách Rạp Chiếu Phim
            </Typography>
            <Button
                variant="contained"
                onClick={handleChangePageCreate}>Thêm rạp chiếu phim</Button>
            <FormControl fullWidth margin="normal">
                <InputLabel id="city-select-label">Chọn tỉnh/thành</InputLabel>
                <Select
                    labelId="city-select-label"
                    value={cities[value] || ""}
                    onChange={(e) => {
                        const selectedCity = e.target.value
                        const index = cities.findIndex((c) => c === selectedCity)
                        setValue(index)
                    }}
                    label="Chọn tỉnh/thành"
                >
                    {cities.map((city, index) => (
                        <MenuItem key={index} value={city}>
                            {city}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {filteredTheaters.length === 0 ? (
                <Typography variant="h6" color="textSecondary">
                    Không có rạp chiếu phim nào tại thành phố này.
                </Typography>
            ) : (
                <Box
                    display="flex"
                    flexWrap="wrap"
                    justifyContent="space-between"
                    gap={2}
                >
                    {filteredTheaters.map((theater) => (
                        <Box
                            key={theater.id}
                            width={{ xs: "100%", sm: "48%", md: "30%" }}
                            mb={2}
                        >
                            <Card>
                                <CardContent>
                                    <Typography variant="h6">{theater.name}</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Địa chỉ: {theater.address}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Loại: {theater.type}
                                    </Typography>
                                </CardContent>

                                <CardActions>
                                    <Tooltip title="Xem chi tiết">
                                        <IconButton onClick={() => handleView(theater.id)}>
                                            <Visibility />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Chỉnh sửa">
                                        <IconButton onClick={() => handleEdit(theater)}>
                                            <Edit />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Xoá">
                                        <IconButton onClick={() => handleDelete(theater.id)}>
                                            <Delete />
                                        </IconButton>
                                    </Tooltip>
                                </CardActions>
                            </Card>

                        </Box>
                    ))}
                </Box>
            )}
            <TheaterEditDialog isOpen={isOpenDialog} onClose={handleDialogClose} theater={selectTheater} onSubmit={handleUpdate} />
        </Container>
    )
}

export default Theater
