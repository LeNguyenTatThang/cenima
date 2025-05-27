import React from "react"
import { DialogContent, Stack, TextField, Button, FormControlLabel, Checkbox } from "@mui/material"

import { FoodSizesType, FoodType } from "../../../type/types"
import { useSnackbar } from "../../../components/dashboard/SnackbarContext"
import CustomDialog from "../../../components/dashboard/CustomDialog"

type Props = {
    isOpen: boolean
    onClose: () => void
    food: FoodType | null
    onSubmit: (form: { name: string; image: string; sizes: FoodSizesType[]; imageFile?: File | null }) => void
}

const FoodEdit = ({ isOpen, onClose, food, onSubmit }: Props) => {
    const { showMessage } = useSnackbar()

    const [form, setForm] = React.useState<{
        name: string
        image: string
        sizes: FoodSizesType[]
        imageFile?: File | null
    }>({
        name: '',
        image: '',
        sizes: [],
        imageFile: null
    })

    React.useEffect(() => {
        if (food) {
            setForm({
                name: food.name,
                image: food.image,
                sizes: food.sizes,
                imageFile: null
            })
        }
    }, [food])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
    }

    const handleSizeChange = (
        index: number,
        key: keyof FoodSizesType,
        value: string | number | boolean
    ) => {
        const newSizes = [...form.sizes]
        newSizes[index] = { ...newSizes[index], [key]: value }
        setForm({ ...form, sizes: newSizes })
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const imageUrl = URL.createObjectURL(file)
            setForm(prev => ({ ...prev, image: imageUrl, imageFile: file }))
        }
    }

    const handleSubmit = () => {
        const { name, image, sizes } = form
        if (!name || !image || sizes.length === 0) {
            showMessage("Vui lòng nhập đầy đủ thông tin")

            return
        }
        onSubmit(form)
    }

    return (
        <CustomDialog
            open={isOpen}
            onClose={onClose}
            title="Chỉnh sửa món ăn"
            onSubmit={handleSubmit}
            cancelText="Hủy"
            confirmText="Lưu thay đổi"
        >
            <DialogContent>
                <Stack spacing={2} mt={1}>
                    <TextField
                        label="Tên món ăn"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        fullWidth
                        required
                    />

                    <Button
                        variant="outlined"
                        component="label"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Đổi ảnh khác
                        <input
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={handleImageChange}
                        />
                    </Button>

                    {form.image && (
                        <img
                            src={form.image}
                            alt="Xem trước hình ảnh"
                            style={{
                                width: "100%",
                                maxHeight: 200,
                                objectFit: "contain",
                                borderRadius: 8,
                                border: "1px solid #ccc",
                                marginTop: 8
                            }}
                        />
                    )}

                    {form.sizes.map((item, index) => (
                        <Stack direction="row" spacing={1} key={index}>
                            <TextField
                                label="Size"
                                value={item.size}
                                onChange={(e) => handleSizeChange(index, "size", e.target.value)}
                            />
                            <TextField
                                label="Giá"
                                type="number"
                                value={item.price}
                                onChange={(e) => handleSizeChange(index, "price", Number(e.target.value))}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={item.status}
                                        onChange={(e) => handleSizeChange(index, "status", e.target.checked)}
                                    />
                                }
                                label="Trạng thái"
                            />
                        </Stack>
                    ))}
                </Stack>
            </DialogContent>
        </CustomDialog>
    )
}

export default FoodEdit