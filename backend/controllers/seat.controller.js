const json = require('body-parser')
const { Seat, Auditorium } = require('../models')
const { where } = require('sequelize')

async function getSeats(req, res) {
    try {
        const { id } = req.params
        const seats = await Seat.findAll({
            where: { auditorium_id: id },
            include: {
                model: Auditorium,
                attributes: ['name']
            }
        })
        if (!seats || seats.length === 0) return res.status(404).json({ message: 'Seat not found' })
        const name_auditorium = seats[0].Auditorium?.name || 'null'
        res.status(200).json({
            name_auditorium,
            seats
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'error get seat' })
    }
}

async function createSeatForAuditorium(req, res) {
    try {
        const { auditorium_id, row, number, type, status } = req.body

        if (!auditorium_id || !row || !number || !type || !status) return res.status(400).json({ message: 'Vui lòng nhập đầy đủ thông tin' })
        const existingAuditorium = await Auditorium.findByPk(auditorium_id)
        if (!existingAuditorium) return res.status(404).json({ message: 'Auditorium not found' })
        const seatList = []
        for (let i = 0; i < row.length; i++) {
            const rowLetter = row[i]
            for (let j = 1; j <= number; j++) {
                seatList.push({
                    auditorium_id: auditorium_id,
                    row: rowLetter,
                    number: j,
                    type: type,
                    status: status
                })
            }
        }
        const newSeat = await Seat.bulkCreate(seatList)
        res.status(201).json({
            message: 'Tạo ghế thành công',
            total: newSeat.length,
            seats: newSeat,
            newSeat
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'error create seat' })
    }
}

async function updateSeat(req, res) {
    const { id, auditorium_id, row, number, type, status } = req.body
    console.log(id)
    console.log(auditorium_id)
    console.log(row)
    console.log(number)
    console.log(type)
    console.log(status)
    try {
        if (!type && !status) {
            return res.status(400).json({ message: "Vui lòng cung cấp ít nhất type hoặc status để cập nhật" })
        }

        if (id) {
            // Update 1 ghế cụ thể
            const seat = await Seat.findByPk(id);
            if (!seat) return res.status(404).json({ message: "Ghế không tồn tại" })

            if (auditorium_id) seat.auditorium_id = auditorium_id
            if (row) seat.row = row
            if (number) seat.number = number
            if (type) seat.type = type
            if (status) seat.status = status

            await seat.save();
            return res.status(200).json({ message: "Cập nhật ghế thành công" })
        } else {
            // Update nhiều ghế theo hàng
            if (!auditorium_id || !row) {
                return res.status(400).json({ message: "Vui lòng cung cấp auditorium_id và row để cập nhật hàng ghế" })
            }

            const [updatedCount] = await Seat.update(
                { type, status },
                {
                    where: { auditorium_id, row }
                }
            )

            if (updatedCount === 0) return res.status(404).json({ message: "Không tìm thấy ghế để cập nhật" })

            return res.status(200).json({ message: `Cập nhật thành công ${updatedCount} ghế` })
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Lỗi khi cập nhật ghế" })
    }
}

async function deleteSeat(req, res) {
    try {
        const { auditorium_id } = req.params
        const existingAuditorium = await Seat.findAll({
            where: { auditorium_id: auditorium_id }
        })
        if (!existingAuditorium) return res.status(404).json({ message: 'Seat not found' })

        await Seat.destroy({
            where: { auditorium_id: auditorium_id }
        })
        res.status(200).json({ message: 'Xoá ghế thành công' })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'error delete seat' })
    }
}

module.exports = {
    getSeats,
    createSeatForAuditorium,
    updateSeat,
    deleteSeat
}