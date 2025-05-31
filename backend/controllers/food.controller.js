const json = require('body-parser')
const { Food, FoodSize } = require('../models')
const { where } = require('sequelize')

async function getFoods(req, res) {
    try {
        const foods = await Food.findAll({
            include: [{
                model: FoodSize,
                as: 'sizes',
                attributes: ['size', 'price', 'status']
            }],
            order: [['id', 'ASC']]
        })
        const baseUrl = 'http://localhost:5000/uploads/foods/'
        const foodsWithFullImageUrl = foods.map(food => {
            return {
                ...food.toJSON(),
                image: baseUrl + food.image
            }
        })

        res.status(200).json(foodsWithFullImageUrl)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'error get food' })
    }
}

async function createFood(req, res) {
    let { name, sizes } = req.body
    const image = req.file ? req.file.filename : null
    if (!image) {
        return res.status(400).json({ message: 'Không có ảnh được upload' })
    }

    try {
        if (typeof sizes === "string") {
            sizes = JSON.parse(sizes)
        }

        if (!name || !Array.isArray(sizes) || sizes.length === 0) return res.status(400).json({ message: 'Tên món ăn và danh sách size là bắt buộc.' })
        const newFood = await Food.create({
            name,
            image,
            sizes: sizes.map(s => ({
                size: s.size,
                price: s.price,
                status: s.status ?? true
            }))
        }, {
            include: [{ model: FoodSize, as: 'sizes' }]
        })
        const baseUrl = 'http://localhost:5000/uploads/foods/'
        const foodWithFullImageUrl = {
            ...newFood.toJSON(),
            image: newFood.image ? baseUrl + newFood.image : null
        }
        res.status(201).json(foodWithFullImageUrl)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'error create food' })
    }
}

async function updateFood(req, res) {
    const id = Number(req.params.id)
    const { name, sizes } = req.body
    let sizesData = sizes

    if (typeof sizes === 'string') {
        try {
            sizesData = JSON.parse(sizes)
        } catch (e) {
            return res.status(400).json({ message: 'Invalid sizes format' })
        }
    }

    const image = req.file ? req.file.filename : null

    try {
        const existingFood = await Food.findByPk(id, { include: 'sizes' })
        if (!existingFood) return res.status(404).json({ message: 'Food not found' })

        if (image) {
            const oldImage = existingFood.image
            existingFood.image = image

            if (oldImage) {
                try {
                    const oldImagePath = `./uploads/foods/${oldImage}`
                    if (fs.existsSync(oldImagePath)) {
                        await fs.promises.unlink(oldImagePath)
                    }
                } catch (error) {
                    console.error(error)
                }
            }
        }

        if (name !== undefined) {
            existingFood.name = name
        }

        await existingFood.save()

        if (sizesData !== undefined) {
            await FoodSize.destroy({ where: { foodId: id } })

            for (const s of sizesData) {
                if (!s.size || !s.price) {
                    return res.status(400).json({ message: 'Size và Price không được để trống' })
                }

                await FoodSize.create({
                    foodId: id,
                    size: s.size,
                    price: s.price,
                    status: s.status ?? true,
                })
            }
        }

        const updatedFood = await Food.findByPk(id, { include: 'sizes' })
        res.status(200).json(updatedFood)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'error update food' })
    }
}

async function deleteFood(req, res) {
    try {
        const { id } = req.params
        const existingFood = await Food.findByPk(id)
        if (!existingFood) return res.status(404).json({ message: 'Food not found' })
        await existingFood.destroy()
        res.status(200).json({ message: 'Xoá món ăn thành công' })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'error delete food' })
    }
}

module.exports = {
    getFoods,
    createFood,
    updateFood,
    deleteFood
}