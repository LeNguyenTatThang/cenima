import React, { useEffect, useState } from 'react'
import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Chip,
    DialogContent,
    DialogContentText,
    IconButton,
    Skeleton,
    Stack,
    TextField,
    Typography
} from '@mui/material'
import { Add, Delete, Edit } from '@mui/icons-material'
import { DrinkType } from '../../../type/types'
import CustomDialog from '../../../components/dashboard/CustomDialog'

const initialDrinks: DrinkType[] = [
    {
        id: 1,
        name: 'Pepsi',
        price: 15000,
        image: 'https://www.shutterstock.com/image-photo/mykolaiv-ukraine-june-9-2021-600nw-2027510024.jpg'
    },
    {
        id: 2,
        name: 'Coca',
        price: 18000,
        image: 'https://quick-live.eu-central-1.linodeobjects.com/media/images/COCA_DETAIL_SABBSHM.format-jpeg.jpegquality-75.jpg'
    }
]

const Drink = () => {
    const [drinks, setDrinks] = useState<DrinkType[]>([])
    const [loading, setLoading] = useState(true)
    const [openDelete, setOpenDelete] = useState(false)
    const [open, setOpen] = useState(false)
    const [editingDrink, setEditingDrink] = useState<DrinkType | null>(null)
    const [form, setForm] = useState({ name: '', price: '', image: '' })
    const [selectedDrinkId, setSelectedDrinkId] = useState<number | null>(null)

    useEffect(() => {
        setTimeout(() => {
            setDrinks(initialDrinks)
            setLoading(false)
        }, 1000)
    }, [])

    const handleOpenAdd = () => {
        setForm({ name: '', price: '', image: '' })
        setEditingDrink(null)
        setOpen(true)
    }

    const handleOpenEdit = (drink: DrinkType) => {
        setForm({
            name: drink.name,
            price: drink.price.toString(),
            image: drink.image
        })
        setEditingDrink(drink)
        setOpen(true)
    }

    const handleClose = () => setOpen(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = () => {
        const newDrink: DrinkType = {
            id: editingDrink ? editingDrink.id : Date.now(),
            name: form.name,
            price: parseInt(form.price),
            image: form.image
        }

        if (editingDrink) {
            setDrinks(prev => prev.map(d => d.id === editingDrink.id ? newDrink : d))
        } else {
            setDrinks(prev => [...prev, newDrink])
        }

        handleClose()
    }

    const handleDelete = () => {
        if (selectedDrinkId !== null) {
            setDrinks(prev => prev.filter(d => d.id !== selectedDrinkId))
            setSelectedDrinkId(null)
            setOpenDelete(false)
        }
    }

    return (
        <Box p={2}>
            <Stack direction="row" justifyContent="space-between" mb={2}>
                <Typography variant="h5" fontWeight="bold">Đồ uống</Typography>
                <Button variant="contained" startIcon={<Add />} onClick={handleOpenAdd}>
                    Thêm đồ uống
                </Button>
            </Stack>

            <Stack direction="row" flexWrap="wrap" gap={2}>
                {loading
                    ? Array.from({ length: 4 }).map((_, i) => (
                        <Box key={i} width={220}>
                            <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 2 }} />
                        </Box>
                    ))
                    : drinks.map((drink) => (
                        <Box key={drink.id} width={250}>
                            <Card sx={{ borderRadius: 3, boxShadow: 3, '&:hover': { boxShadow: 6 } }}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={drink.image}
                                    alt={drink.name}
                                    sx={{ objectFit: 'cover' }}
                                />
                                <CardContent>
                                    <Typography variant="h6" fontWeight="bold" noWrap>
                                        {drink.name}
                                    </Typography>
                                    <Chip label={`${drink.price.toLocaleString()} đ`} color="primary" sx={{ mt: 1 }} />
                                    <Stack direction="row" justifyContent="end" gap={1} mt={1}>
                                        <IconButton size="small" color="primary" onClick={() => handleOpenEdit(drink)}>
                                            <Edit fontSize="small" />
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            color="error"
                                            onClick={() => {
                                                setSelectedDrinkId(drink.id)
                                                setOpenDelete(true)
                                            }}
                                        >
                                            <Delete fontSize="small" />
                                        </IconButton>

                                    </Stack>
                                </CardContent>
                            </Card>
                        </Box>
                    ))}
            </Stack>

            <CustomDialog
                open={open}
                title={editingDrink ? 'Chỉnh sửa' : 'Thêm'}
                onClose={handleClose}
                onSubmit={handleSubmit}
                confirmText={editingDrink ? 'Cập nhật' : 'Thêm'}
                cancelText="Hủy"
            >
                <DialogContent>
                    <TextField
                        label="Tên"
                        name="name"
                        fullWidth
                        margin="dense"
                        value={form.name}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Giá"
                        name="price"
                        fullWidth
                        margin="dense"
                        type="number"
                        value={form.price}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Link hình ảnh"
                        name="image"
                        fullWidth
                        margin="dense"
                        value={form.image}
                        onChange={handleChange}
                    />
                </DialogContent>
            </CustomDialog>
            <CustomDialog
                open={openDelete}
                onClose={() => setOpenDelete(false)}
                title='Xóa'
                confirmText="Xóa"
                onSubmit={handleDelete}
            >
                <DialogContentText sx={{ textAlign: 'center' }}>
                    Bạn có chắc muốn xóa?
                </DialogContentText>
            </CustomDialog>
        </Box>
    )
}

export default Drink