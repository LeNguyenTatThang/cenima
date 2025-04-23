const json = require('body-parser')
const { Account } = require('../models')
const bcrypt = require("bcryptjs")
const { where } = require('sequelize')

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
        res.status(200).json(accounts)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "error get accounts" })
    }
}

async function updateAccount(req, res) {
    try {
        const { id } = req.params
        const { name, email, password } = req.body
        const account = await Account.findByPk(id)
        if (!name && !email && !password) {
            return res.status(400).json({ message: "Vui lòng nhập đày đủ thông tin" })
        }
        if (!account) {
            return res.status(404).json({ message: "Account not found" })
        }
        account.name = name
        account.email = email
        account.password = password
        await account.save()
        res.status(200).json({ message: "Account updated successfully" })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "error update account" })
    }
}

module.exports = {
    createAccount,
    getAccounts,
    updateAccount
}