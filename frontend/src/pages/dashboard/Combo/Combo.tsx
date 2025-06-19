import React, { useEffect, useState } from 'react'
import {
    Box,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Stack,
    Chip,
    Button,
    DialogContent,
    DialogContentText,
    TextField,
    InputLabel,
    Select,
    FormControl,
    MenuItem
} from '@mui/material'
import { Add, Delete, Edit } from '@mui/icons-material'
import CustomDialog from '../../../components/dashboard/CustomDialog'
import { getAllFoodsFromCombo } from '../../../services/foodApi'
import { getAllDrinks } from '../../../services/drinkApi'
import { DrinkType, MappedFood } from '../../../type/types'

interface Food {
    id: number
    name: string
    ComboFood?: {
        size: string
    }
}

interface Drink {
    id: number
    name: string
}

interface Combo {
    id: number
    name: string
    image: string
    price_old: number
    price_new: number
    foods: Food[]
    drinks: Drink[]
}

interface ComboForm {
    name: string
    price_old: number
    price_new: number
    image: string | File
    foods: string[]
    drinks: number[]
}

const Combo = () => {
    const [combos, setCombos] = useState<Combo[]>([])
    const [open, setOpen] = useState(false)
    const [form, setForm] = useState<ComboForm>({
        name: '',
        price_old: 0,
        price_new: 0,
        image: '',
        foods: [],
        drinks: []
    })
    const [preview, setPreview] = useState<string | null>(null)
    const [editingCombo, setEditingCombo] = useState<Combo | null>(null)
    const [openDelete, setOpenDelete] = useState(false)
    const [comboIdToDelete, setComboIdToDelete] = useState<number | null>(null)
    const [foods, setFoods] = useState<MappedFood[]>([])

    const [drinks, setDrinks] = useState<DrinkType[]>([])
    const fetchCombos = async () => {
        fetch('http://localhost:5000/api/getCombos')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setCombos(data)
                else console.error('API trả về không phải array:', data)
            })
            .catch(err => console.error('Fetch lỗi:', err))
    }
    useEffect(() => {
        fetchCombos()
    }, [])

    const handleOpenAdd = async () => {
        setForm({ name: '', price_old: 0, price_new: 0, image: '', foods: [], drinks: [] })
        const foods = await getAllFoodsFromCombo()
        setFoods(foods)
        const drinks = await getAllDrinks()
        setDrinks(drinks)
        setPreview(null)
        setEditingCombo(null)
        setOpen(true)
    }

    const handleEdit = (id: number) => {
        const combo = combos.find(c => c.id === id)
        if (!combo) return

        // Chuyển sang dạng ComboForm
        setForm({
            name: combo.name,
            price_old: combo.price_old,
            price_new: combo.price_new,
            image: combo.image,
            foods: combo.foods.map(f => `${f.id}-${f.ComboFood?.size || 'default'}`),
            drinks: combo.drinks.map(d => d.id)     // lấy danh sách id
        })

        setPreview(combo.image)
        setEditingCombo(combo)
        setOpen(true)
    }


    const handleClose = () => {
        setOpen(false)
        setPreview(null)
        setForm({ name: '', price_old: 0, price_new: 0, image: '', foods: [], drinks: [] })
        setEditingCombo(null)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setForm(prev => ({
            ...prev,
            [name]: name === 'price_old' || name === 'price_new' ? Number(value) : value
        }))
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setForm(prev => ({ ...prev, image: file }))
            const reader = new FileReader()
            reader.onloadend = () => setPreview(reader.result as string)
            reader.readAsDataURL(file)
        }
    }


    const handleSubmit = async () => {
        const formData = new FormData()
        formData.append('name', form.name)
        formData.append('price_old', String(form.price_old))
        formData.append('price_new', String(form.price_new))
        const foodIds = form.foods.map(f => Number(f.split('-')[0]))
        formData.append('foodIds', JSON.stringify(foodIds))
        formData.append('drinkIds', JSON.stringify(form.drinks))
        if (form.image instanceof File) formData.append('comboImage', form.image)

        const url = editingCombo
            ? `http://localhost:5000/api/updateCombo/${editingCombo.id}`
            : `http://localhost:5000/api/createCombo`
        const method = editingCombo ? 'PUT' : 'POST'

        try {
            const res = await fetch(url, { method, body: formData })
            if (res.ok) {
                const newData = await res.json()
                setCombos(prev => {
                    if (editingCombo) {
                        return prev.map(c => c.id === newData.id ? newData : c)
                    } else {
                        return [...prev, newData]
                    }
                })
                fetchCombos()
                handleClose()
            }
        } catch (err) {
            console.error('Lỗi submit:', err)
        }
    }

    const confirmDeleteCombo = (id: number) => {
        setOpenDelete(true)
        setComboIdToDelete(id)
    }

    const handleConfirmDelete = async () => {
        if (comboIdToDelete == null) return
        try {
            const res = await fetch(`http://localhost:5000/api/combos/${comboIdToDelete}`, { method: 'DELETE' })
            if (res.ok) {
                setCombos(prev => prev.filter(c => c.id !== comboIdToDelete))
                setOpenDelete(false)
                setComboIdToDelete(null)
            }
        } catch (err) {
            console.error('Lỗi khi xóa combo:', err)
        }
    }

    useEffect(() => {
        const foodTotal = form.foods
            .map(key => {
                const [id, size] = key.split('-')
                const food = foods.find(f => f.id === Number(id))
                const foundSize = food?.sizes.find(s => s.size === size)

                return foundSize?.price || 0
            })
            .reduce((acc, cur) => acc + cur, 0)

        const drinkTotal = form.drinks
            .map(id => drinks.find(d => d.id === id)?.price || 0)
            .reduce((acc, cur) => acc + cur, 0)

        setForm(prev => ({
            ...prev,
            price_old: foodTotal + drinkTotal
        }))
    }, [form.foods, form.drinks, foods, drinks])



    return (
        <Box p={3}>
            <Typography variant="h4" mb={3} fontWeight="bold">Danh sách Combo</Typography>
            <Button variant="contained" startIcon={<Add />} onClick={handleOpenAdd}>
                Thêm combo
            </Button>

            <Stack spacing={3} direction="row" flexWrap="wrap" useFlexGap>
                {combos.map(combo => (
                    <Card key={combo.id} sx={{ width: 300, borderRadius: 3, boxShadow: 3 }}>
                        <CardMedia
                            component="img"
                            height="180"
                            image={combo.image}
                            alt={combo.name}
                        />
                        <CardContent>
                            <Typography variant="h6" fontWeight="bold">{combo.name}</Typography>

                            <Stack direction="row" spacing={1} mt={1}>
                                <Typography sx={{ textDecoration: 'line-through' }}>
                                    {combo.price_old.toLocaleString()}đ
                                </Typography>
                                <Typography color="error" fontWeight="bold">
                                    {combo.price_new.toLocaleString()}đ
                                </Typography>
                            </Stack>

                            <Stack direction="row" spacing={1} mt={2} flexWrap="wrap">
                                {combo.foods?.map(food => (
                                    <Chip key={food.id} label={food.name} color="primary" size="small" />
                                ))}
                                {combo.drinks?.map(drink => (
                                    <Chip key={drink.id} label={drink.name} color="secondary" size="small" />
                                ))}
                            </Stack>

                            <Stack direction="row" spacing={1} mt={2}>
                                <Button variant="outlined" color="primary" size="small" onClick={() => handleEdit(combo.id)}>
                                    <Edit fontSize="small" />
                                </Button>
                                <Button variant="outlined" color="error" size="small" onClick={() => confirmDeleteCombo(combo.id)}>
                                    <Delete fontSize="small" />
                                </Button>
                            </Stack>
                        </CardContent>
                    </Card>
                ))}
            </Stack>

            <CustomDialog
                open={open}
                title={editingCombo ? 'Chỉnh sửa combo' : 'Thêm combo'}
                onClose={handleClose}
                onSubmit={handleSubmit}
                confirmText={editingCombo ? 'Cập nhật' : 'Thêm'}
                cancelText="Hủy"
            >
                <DialogContent>
                    <TextField
                        label="Tên combo"
                        name="name"
                        fullWidth
                        margin="dense"
                        value={form.name}
                        onChange={handleChange}
                    />
                    <FormControl fullWidth margin="dense">
                        <InputLabel id="food-label">Chọn đồ ăn</InputLabel>
                        <Select
                            labelId="food-label"
                            label="Chọn đồ ăn"
                            multiple
                            value={form.foods}
                            onChange={(e) => setForm(prev => ({ ...prev, foods: e.target.value as string[] }))}
                            renderValue={(selected) =>
                                selected
                                    .map(value => {
                                        const [id, size] = value.split('-')
                                        const food = foods.find(f => f.id === Number(id))

                                        return food ? `${food.name} - ${size}` : ''
                                    })
                                    .join(', ')
                            }
                        >
                            {foods.flatMap(food =>
                                (food.sizes ?? []) // nếu undefined thì dùng mảng rỗng
                                    .filter(size => size.status)
                                    .map(size => (
                                        <MenuItem key={`${food.id}-${size.size}`} value={`${food.id}-${size.size}`}>
                                            {food.name} - {size.size} - {size.price.toLocaleString()}đ
                                        </MenuItem>
                                    ))
                            )}

                        </Select>
                    </FormControl>

                    <FormControl fullWidth margin="dense" sx={{ mt: 2 }}>
                        <InputLabel id="drink-label">Chọn nước uống</InputLabel>
                        <Select
                            labelId="drink-label"
                            label="Chọn nước uống"
                            multiple
                            value={form.drinks}
                            onChange={(e) =>
                                setForm(prev => ({ ...prev, drinks: e.target.value as number[] }))
                            }
                            renderValue={(selected) =>
                                drinks
                                    .filter(drink => selected.includes(drink.id))
                                    .map(d => d.name)
                                    .join(', ')
                            }
                        >
                            {drinks.map(drink => (
                                <MenuItem key={drink.id} value={drink.id}>
                                    {drink.name} - {drink.price}đ
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        label="Giá gốc"
                        name="price_old"
                        fullWidth
                        margin="dense"
                        type="number"
                        value={form.price_old}
                        disabled   // hoặc readOnly
                    />
                    <TextField
                        label="Giá khuyến mãi"
                        name="price_new"
                        fullWidth
                        margin="dense"
                        type="number"
                        value={form.price_new}
                        onChange={handleChange}
                    />
                    <Button variant="outlined" component="label" fullWidth sx={{ mt: 2 }}>
                        Chọn ảnh
                        <input
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
                title="Xóa combo"
                confirmText="Xóa"
                onSubmit={handleConfirmDelete}
            >
                <DialogContentText sx={{ textAlign: 'center' }}>
                    Bạn có chắc muốn xóa combo này không?
                </DialogContentText>
            </CustomDialog>
        </Box>
    )
}

export default Combo