import React, { useEffect, useState } from "react"
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, TableSortLabel, Typography,
    Avatar,
    Button,
    DialogContent,
    TextField,
    Box,
    RadioGroup,
    FormControlLabel,
    Radio,
    IconButton
} from "@mui/material"
import CustomDialog from "../../../components/dashboard/CustomDialog"
import { FoodSizesType, FoodType } from "../../../type/types"
import { getAllFoods, updateFood } from "../../../services/foodApi"
import { Edit, Delete } from "@mui/icons-material"
import FoodEdit from "./FoodEdit"
const sizes = ["Mặc định", "Vừa", "Lớn"]
type SizeKey = typeof sizes[number]
const Food = () => {
    const [foods, setFoods] = useState<FoodType[]>([])
    const [order, setOrder] = useState<"asc" | "desc">("asc")
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenEdit, setIsOpenEdit] = useState(false)
    const [foodName, setFoodName] = useState("")
    const [imageFiles, setImageFiles] = useState<File | null>(null)
    const [sizeType, setSizeType] = useState<"mac-dinh" | "nhieu-size">("mac-dinh")
    const [prices, setPrices] = useState<Record<SizeKey, string>>({
        "Mặc định": "",
        "Vừa": "",
        "Lớn": ""
    })
    const [loading, setLoading] = useState(false)
    const [selectFood, setSelectFood] = useState<FoodType | null>(null)
    const handlePriceChange = (size: string, value: string) => {
        if (/^\d*$/.test(value)) {
            setPrices(prev => ({ ...prev, [size]: value }))
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllFoods()
                setFoods(data)
            } catch (err) {
                console.error("Lỗi khi lấy danh sách món ăn:", err)
            }
        }
        fetchData()
    }, [])

    const handleSort = () => {
        setOrder(prev => (prev === "asc" ? "desc" : "asc"))
    }

    const sortedFoods = [...foods].sort((a, b) => {
        const nameA = a.name.toLowerCase()
        const nameB = b.name.toLowerCase()
        if (nameA < nameB) return order === "asc" ? -1 : 1
        if (nameA > nameB) return order === "asc" ? 1 : -1

        return 0
    })

    const handleSubmit = async () => {
        if (!foodName.trim()) {
            alert("Vui lòng nhập tên món ăn")

            return
        }
        const sizesData = sizes
            .filter(size => prices[size] && Number(prices[size]) > 0)
            .map(size => ({
                size,
                price: Number(prices[size]),
                status: true
            }))
        if (sizesData.length === 0) {
            alert("Vui lòng nhập ít nhất 1 giá cho size")

            return
        }
        try {
            setLoading(true)
            const formData = new FormData()
            formData.append("name", foodName)
            formData.append('foods', imageFiles as File)
            formData.append("sizes", JSON.stringify(sizesData))

            const res = await fetch("http://localhost:5000/api/createFood", {
                method: "POST",
                body: formData
            })

            if (!res.ok) throw new Error("Lỗi khi tạo món ăn")

            const newFood = await res.json()
            setFoods(prev => [...prev, newFood])
            setIsOpen(false)
            setFoodName("")
            setImageFiles(null)
            setPrices({
                "Mặc định": "",
                "Vừa": "",
                "Lớn": ""
            })
        } catch (error) {
            console.error("Lỗi khi tạo món ăn:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleSizeTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSizeType(event.target.value as "mac-dinh" | "nhieu-size")
    }

    const handleEditFood = (id: number) => {
        const food = foods.find(f => f.id === id)
        if (food) {
            setSelectFood(food)
            setIsOpenEdit(true)
        }
    }

    const handleDeleteFood = (id: number) => {
        console.log(id)
    }

    const handleUpdate = async (form: { name: string; image: string; sizes: FoodSizesType[]; imageFile?: File | null }) => {
        if (!selectFood) return
        try {
            await updateFood(selectFood.id, {
                name: form.name,
                sizes: form.sizes,
                imageFile: form.imageFile || undefined,
            })

            setFoods(prevFoods =>
                prevFoods.map(f =>
                    f.id === selectFood.id
                        ? {
                            ...f,
                            name: form.name,
                            sizes: form.sizes,
                            image: form.imageFile ? URL.createObjectURL(form.imageFile) : f.image,
                        }
                        : f
                )
            )
            setIsOpenEdit(false)
        } catch (err) {
            console.error(err)
        }
    }


    return (
        <>
            <Paper sx={{ width: "100%", overflow: "hidden", p: 2 }}>
                <Typography variant="h5" gutterBottom>
                    Danh sách món ăn
                </Typography>
                <Button variant="contained" onClick={() => setIsOpen(true)} sx={{ mb: 2 }}>
                    Thêm món ăn
                </Button>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>Ảnh</TableCell>
                                <TableCell sortDirection={order}>
                                    <TableSortLabel
                                        active
                                        direction={order}
                                        onClick={handleSort}
                                    >
                                        Tên món ăn
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>Danh sách size</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortedFoods.map(row => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>
                                        <Avatar
                                            src={row.image}
                                            alt={row.name}
                                            variant="rounded"
                                            sx={{ width: 56, height: 56 }}
                                        />
                                    </TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>
                                        {row.sizes.map((s, index) => (
                                            <div key={index}>
                                                {s.size} - {s.price.toLocaleString()} ₫
                                            </div>
                                        ))}
                                    </TableCell>
                                    <TableCell>
                                        <IconButton
                                            color="primary"
                                            onClick={() => handleEditFood(row.id)}
                                        >
                                            <Edit />
                                        </IconButton>
                                        <IconButton
                                            color="secondary"
                                            onClick={() => handleDeleteFood(row.id)}
                                        >
                                            <Delete />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            <FoodEdit isOpen={isOpenEdit} onClose={() => setIsOpenEdit(false)} food={selectFood} onSubmit={handleUpdate} />
            <CustomDialog
                open={isOpen}
                onClose={() => setIsOpen(false)}
                title="Thêm món ăn"
                onSubmit={handleSubmit}
                confirmText={loading ? "Đang thêm..." : "Thêm"}
                cancelText="Hủy"
            >
                <DialogContent>
                    <TextField
                        label="Tên món ăn"
                        fullWidth
                        margin="normal"
                        value={foodName}
                        onChange={(e) => setFoodName(e.target.value)}
                    />

                    <Button
                        variant="outlined"
                        component="label"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Chọn ảnh
                        <input
                            name="foods"
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={(e) => {
                                const files = e.target.files
                                if (files) {
                                    setImageFiles(files[0])
                                }
                            }}
                        />
                    </Button>

                    <Box mt={1}>

                        <Typography variant="body2">
                            {imageFiles?.name}
                        </Typography>

                    </Box>

                    <Box>
                        <Typography variant="subtitle1">Chọn kiểu size</Typography>
                        <RadioGroup row value={sizeType} onChange={handleSizeTypeChange}>
                            <FormControlLabel
                                value="mac-dinh"
                                control={<Radio />}
                                label="Mặc định"
                            />
                            <FormControlLabel
                                value="nhieu-size"
                                control={<Radio />}
                                label="Nhiều size (Vừa, Lớn)"
                            />
                        </RadioGroup>

                        {sizeType === "mac-dinh" && (
                            <TextField
                                label="Giá size Mặc định (VNĐ)"
                                value={prices["Mặc định"]}
                                onChange={e => handlePriceChange("Mặc định", e.target.value)}
                                margin="normal"
                                fullWidth
                                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                            />
                        )}

                        {sizeType === "nhieu-size" && (
                            <>
                                <TextField
                                    label="Giá size Vừa (VNĐ)"
                                    value={prices["Vừa"]}
                                    onChange={e => handlePriceChange("Vừa", e.target.value)}
                                    margin="normal"
                                    fullWidth
                                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                                />
                                <TextField
                                    label="Giá size Lớn (VNĐ)"
                                    value={prices["Lớn"]}
                                    onChange={e => handlePriceChange("Lớn", e.target.value)}
                                    margin="normal"
                                    fullWidth
                                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                                />
                            </>
                        )}
                    </Box>
                </DialogContent>
            </CustomDialog>
        </>
    )
}

export default Food
