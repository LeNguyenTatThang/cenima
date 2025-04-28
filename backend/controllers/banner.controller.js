const json = require('body-parser')
const { Banner } = require('../models')
const bcrypt = require("bcryptjs")
const fs = require("fs")
const { get } = require('http')
async function createBanner(req, res) {
    try {
        const { title, link, status } = req.body

        if (!title) return res.status(400).json({ message: 'Vui lòng nhập đầy đủ thông tin' })

        const image = req.file ? req.file.filename : null
        if (!image) return res.status(400).json({ message: 'Vui lòng chọn hình ảnh' })
        const newBanner = await Banner.create({ title, link, status, image })
        console.log("check banner", newBanner)

        res.status(201).json({ banner: newBanner, message: 'Tạo banner thành công' })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'error create banner' })
    }
}
async function getBanners(req, res) {
    try {
        const getBanners = await Banner.findAll()
        const bannersWithImage = getBanners.map(banner => {
            return {
                ...banner.toJSON(),
                image: banner.image
                    ? `http://localhost:5000/uploads/banners/${banner.image}`
                    : null
            }
        })
        res.status(200).json(bannersWithImage)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'error get banner' })
    }
}

async function updateBanner(req, res) {
    try {
        const { id } = req.params
        const { title, link, status } = req.body
        const image = req.file ? req.file.filename : null
        console.log("check image", image)
        const existingBanner = await Banner.findByPk(id)
        if (!existingBanner) return status(404).json({ message: 'Banner not found' })
        if (image) {
            const oldImage = existingBanner.image
            console.log("check old image", oldImage)
            existingBanner.image = image
            if (oldImage) {
                try {
                    const oldImagePath = `./uploads/banners/${oldImage}`
                    if (fs.existsSync(oldImagePath)) {
                        await fs.promises.unlink(oldImagePath)
                    }
                    existingBanner.title = title
                    existingBanner.link = link
                    existingBanner.status = status
                    existingBanner.image = image
                    await existingBanner.save()
                } catch (error) {
                    console.error(error)
                }
            }
        }
        existingBanner.title = title
        existingBanner.link = link
        existingBanner.status = status
        await existingBanner.save()
        res.status(200).json({ banner: existingBanner, message: 'Cập nhật banner thành công' })

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'error update banner' })
    }
}

async function deleteBanner(req, res) {
    try {
        const { id } = req.params
        const existingBanner = await Banner.findByPk(id)
        if (!existingBanner) return res.status(404).json({ message: 'Banner not found' })
        await existingBanner.destroy()
        res.status(200).json({ message: 'Xoá banner thành công' })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'error delete banner' })
    }
}
module.exports = { createBanner, getBanners, updateBanner, deleteBanner }