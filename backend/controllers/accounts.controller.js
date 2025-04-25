const json = require('body-parser')
const { Account } = require('../models')
const bcrypt = require("bcryptjs")
const { where } = require('sequelize')
const fs = require("fs")
async function createAccount(req, res) {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin" })
        }
        const existingAccount = await Account.findOne({
            where: { email }
        })
        if (existingAccount) {
            return res.status(409).json({ message: 'Email đã tồn tại' })
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const newAccount = await Account.create({
            name, email, password: hashPassword
        })
        const account = { ...newAccount.get(), password: undefined }
        res.status(201).json({ account, message: "Tài khoản đã được tạo" })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "error create account" })
    }
}

async function getAccounts(req, res) {
    try {
        const accounts = await Account.findAll()
        const accountsWithImage = accounts.map(account => {
            return {
                ...account.toJSON(),
                profile_picture: account.profile_picture
                    ? `http://localhost:5000/uploads/profiles/${account.profile_picture}`
                    : null
            };
        });

        res.status(200).json(accountsWithImage);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "error get accounts" });
    }
}

async function updateAccount(req, res) {
    try {
        const { id } = req.params
        const { name, email, password, role, status } = req.body
        const profile_picture = req.file ? req.file.filename : null
        const account = await Account.findByPk(id)
        if (!name && !email && !password) {
            return res.status(400).json({ message: "Vui lòng nhập đày đủ thông tin" })
        }
        if (!account) {
            return res.status(404).json({ message: "Tài khoản không tồn tại" })
        }

        account.name = name
        account.email = email
        account.role = role
        account.status = status

        if (password) {
            account.password = await bcrypt.hash(password, 10)
        }

        if (profile_picture) {
            const oldImage = account.profile_picture
            account.profile_picture = profile_picture
            if (oldImage) {
                try {
                    const oldImagePath = `./uploads/profiles/${oldImage}`
                    if (fs.existsSync(oldImagePath)) {
                        await fs.promises.unlink(oldImagePath)
                        console.log(`Đã xóa ảnh cũ: ${oldImagePath}`)
                    }
                } catch (err) {
                    console.log(err)
                }
            }
        }

        await account.save()

        res.status(200).json({ message: "Account updated successfully" })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "error update account" })
    }
}

async function deleteAccount(req, res) {
    try {
        const { id } = req.params
        const existingAccount = await Account.findByPk(id)
        if (!existingAccount) {
            return res.status(404).json({ message: "Account not found" })
        }
        await existingAccount.destroy()
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'error delete user' })
    }
}

module.exports = {
    createAccount,
    getAccounts,
    updateAccount,
    deleteAccount
}