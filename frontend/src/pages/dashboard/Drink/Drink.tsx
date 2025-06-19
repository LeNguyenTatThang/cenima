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
import { createdDrink, deleteDrink, getAllDrinks, updateDrink } from '../../../services/drinkApi'
import { useSnackbar } from '../../../components/dashboard/SnackbarContext'

const Drink = () => {
    const [drinks, setDrinks] = useState<DrinkType[]>([])
    const [loading, setLoading] = useState(true)
    const [openDelete, setOpenDelete] = useState(false)
    const [open, setOpen] = useState(false)
    const [editingDrink, setEditingDrink] = useState<DrinkType | null>(null)
    const [form, setForm] = useState({ name: '', price: '', image: '' })
    const [selectedDrinkId, setSelectedDrinkId] = useState<number | null>(null)
    const [preview, setPreview] = useState<string>('')
    const [imageFile, setImageFile] = useState<File | null>(null)
    const { showMessage } = useSnackbar()

    useEffect(() => {
        fetchDrinks()
    }, [])

    const fetchDrinks = async () => {
        try {
            const res = await getAllDrinks()
            setDrinks(res)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const imageURL = URL.createObjectURL(file)
        setPreview(imageURL)
        setImageFile(file)
    }
    const handleOpenAdd = () => {
        setForm({ name: '', price: '', image: '' })
        setPreview('')
        setEditingDrink(null)
        setOpen(true)
    }

    const handleOpenEdit = (drink: DrinkType) => {
        setForm({
            name: drink.name,
            price: drink.price.toString(),
            image: drink.image
        })
        setPreview(drink.image)
        setEditingDrink(drink)
        setOpen(true)
    }

    const handleClose = () => setOpen(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async () => {
        if (!form.name || !form.price) {
            showMessage('Vui lòng nhập tên và giá đồ uống')

            return
        }

        const formData = new FormData()
        formData.append('name', form.name)
        formData.append('price', form.price)

        if (imageFile) {
            formData.append('drinkImage', imageFile)
        }

        try {
            if (editingDrink) {
                formData.append('id', editingDrink.id.toString())
                await updateDrink(editingDrink.id, formData)
                showMessage("Cập nhật đồ uống thành công")
                setDrinks(prev => prev.map(d =>
                    d.id === editingDrink.id
                        ? { ...d, name: form.name, price: parseInt(form.price), image: imageFile ? URL.createObjectURL(imageFile) : d.image }
                        : d
                ))
            } else {
                await createdDrink(formData)
                showMessage("Thêm đồ uống thành công")
                fetchDrinks()
            }

            setForm({ name: '', price: '', image: '' })
            setImageFile(null)
            setPreview('')
            setEditingDrink(null)
            handleClose()
        } catch (err) {
            console.error('Lỗi:', err)
            showMessage('Thao tác thất bại!')
        }
    }


    const handleDelete = async () => {
        if (selectedDrinkId !== null) {
            await deleteDrink(selectedDrinkId)
            showMessage("Xoá đồ uống thành công")
            fetchDrinks()
            setDrinks(prev => prev.filter(d => d.id !== selectedDrinkId))
            setSelectedDrinkId(null)
            setOpenDelete(false)
        }
        showMessage("Khong ton tai id")

        return
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
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Chip label={`${drink.price.toLocaleString()} đ`} color="primary" sx={{ mt: 1 }} />
                                        <Chip
                                            label={drink.status === 1 ? 'Hoạt động' :
                                                'Không hoạt động'}
                                            color={
                                                drink.status === 1 ? 'success' : 'error'
                                            }
                                            sx={{ mt: 1 }}
                                        />
                                    </div>


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
                            onChange={handleFileChange}
                        />
                    </Button>
                    {preview && (
                        <Box mt={2} textAlign="center">
                            <img src={preview} alt="Xem trước" style={{ maxWidth: '100%', maxHeight: 200, borderRadius: 8 }} />
                        </Box>
                    )}
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