const { json } = require('body-parser')
const { User } = require('../models')
const bcrypt = require("bcryptjs")
async function getUser(req, res) {
    try {
        const users = await User.findAll()
        res.status(200).json(users)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Lỗi khi lấy người dùng' })
    }
}

async function createUser(req, res) {
    try {
        const { username, email, password, provider, exp, level, avatar_frame, chat_frame, role } = req.body
        const existingUser = await User.findOne({
            where: { email }
        })
        if (existingUser) {
            return res.status(409).json({ message: 'Email đã tồn tại' })
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({
            username,
            email,
            password: hashPassword,
            provider,
            exp,
            level,
            avatar_frame,
            chat_frame,
            role
        })
        const user = { ...newUser.get(), password: undefined }
        res.status(201).json(user)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "error create user" })
    }
}

async function updateUser(req, res) {
    try {
        const { id } = req.params
        const { firstName, lastName, email } = req.body
        const user = await User.findByPk(id)

        if (!user) {
            return res.status(404).json({ message: "cand not find user" })
        }
        user.firstName = firstName
        user.lastName = lastName
        user.email = email
        await user.save()

        res.status(200).json(user)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Error updated user" })
    }

}

async function deleteUser(req, res) {
    try {

        const { id } = req.params
        const user = await User.findByPk(id)
        if (!user) {
            return res.status(404).json({ message: "cand not find user" })
        }
        await user.delete()
        res.status(200), json(user)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Error delete user" })
    }
}
module.exports = { getUser, createUser, updateUser, deleteUser }
