const json = require('body-parser')
const { Combo, ComboFood, ComboDrink } = require('../models')
const { where } = require('sequelize')
const baseUrl = 'http://localhost:5000'
const fs = require('fs')
const path = require('path')
// POST /api/combos
const createCombo = async (req, res) => {
    const { name, price_old, price_new } = req.body
    const foodIds = JSON.parse(req.body.foodIds || '[]')
    const drinkIds = JSON.parse(req.body.drinkIds || '[]')
    const image = req.file ? `/uploads/combos/${req.file.filename}` : null
    if (!image) return res.status(400).json({ message: 'Vui lòng chọn hình ảnh' })
    if (!name || !price_old || !price_new) return res.status(400).json({ message: 'Vui lòng nhập đầy đủ thông tin' })

    try {
        const combo = await Combo.create({ name, price_old, price_new, image })

        if (foodIds) await combo.setFoods(foodIds)
        if (drinkIds) await combo.setDrinks(drinkIds)

        const result = await Combo.findByPk(combo.id, {
            include: ['foods', 'drinks']
        })

        return res.status(201).json(result)
    } catch (err) {
        return res.status(500).json({ message: 'Create combo failed', error: err.message })
    }
}

// GET /api/combos
const getAllCombos = async (req, res) => {
    try {
        const combos = await Combo.findAll({
            include: ['foods', 'drinks']
        })
        const comboWithImages = combos.map(combo => {
            return {
                ...combo.toJSON(),
                image: combo.image ? baseUrl + combo.image : null
            }
        })
        return res.json(comboWithImages)
    } catch (err) {
        return res.status(500).json({ message: 'Fetch failed' })
    }
}

// PUT /api/combos/:id
const updateCombo = async (req, res) => {
    const { id } = req.params
    const { name, price_old, price_new, foodIds, drinkIds } = req.body
    const newImagePath = req.file ? `/uploads/combos/${req.file.filename}` : null

    try {
        const combo = await Combo.findByPk(id)
        if (!combo) return res.status(404).json({ message: 'Không tìm thấy combo' })

        // Xoá ảnh cũ nếu có ảnh mới
        if (req.file && combo.image) {
            const oldImagePath = path.join(__dirname, '..', 'public', combo.image)
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath)
            }
        }

        // Cập nhật thông tin combo
        await combo.update({
            name,
            price_old,
            price_new,
            image: newImagePath || combo.image
        })

        // Cập nhật foods (nếu có)
        if (foodIds) {
            const foodArray = typeof foodIds === 'string' ? JSON.parse(foodIds) : foodIds
            await ComboFood.destroy({ where: { comboId: id } })
            await ComboFood.bulkCreate(
                foodArray.map(foodId => ({ comboId: id, foodId }))
            )
        }

        // Cập nhật drinks (nếu có)
        if (drinkIds) {
            const drinkArray = typeof drinkIds === 'string' ? JSON.parse(drinkIds) : drinkIds
            await ComboDrink.destroy({ where: { comboId: id } })
            await ComboDrink.bulkCreate(
                drinkArray.map(drinkId => ({ comboId: id, drinkId }))
            )
        }

        const updated = await Combo.findByPk(id, {
            include: [
                { model: Food, as: 'foods' },
                { model: Drink, as: 'drinks' }
            ]
        })

        return res.json(updated)
    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: 'Lỗi cập nhật combo', error: err.message })
    }
}

// DELETE /api/combos/:id
const deleteCombo = async (req, res) => {
    try {
        const combo = await Combo.findByPk(req.params.id)
        if (!combo) return res.status(404).json({ message: 'Not found' })

        await combo.destroy()
        return res.json({ message: 'Deleted' })
    } catch (err) {
        return res.status(500).json({ message: 'Delete failed' })
    }
}

module.exports = {
    createCombo,
    getAllCombos,
    updateCombo,
    deleteCombo
}