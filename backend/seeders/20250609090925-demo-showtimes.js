'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date()

    const dayNames = [
      "Thứ 2, 4, 5",
      "Thứ 3",
      "Thứ 6, 7, CN",
      "Ngày lễ",
      "Ngày tri ân",
      "Sau 22h (thành viên)"
    ]
    const dayRecords = dayNames.map(name => ({ name, createdAt: now, updatedAt: now }))
    await queryInterface.bulkInsert('Days', dayRecords)

    const days = await queryInterface.sequelize.query(
      `SELECT id, name FROM "Days"`,
      { type: Sequelize.QueryTypes.SELECT }
    )

    const dayMap = {}
    days.forEach(day => {
      dayMap[day.name] = day.id
    })

    const showtimeRecords = [
      { time: "Trước 17:00", day: "Thứ 2, 4, 5" },
      { time: "Sau 17:00", day: "Thứ 2, 4, 5" },
      { time: "Happy Day", day: "Thứ 3" },
      { time: "Trước 17:00", day: "Thứ 6, 7, CN" },
      { time: "Sau 17:00", day: "Thứ 6, 7, CN" },
      { time: "", day: "Ngày lễ" },
      { time: "", day: "Ngày tri ân" },
      { time: "", day: "Sau 22h (thành viên)" }
    ]

    const showtimesToInsert = showtimeRecords.map(s => ({
      time: s.time,
      dayId: dayMap[s.day],
      createdAt: now,
      updatedAt: now
    }))

    await queryInterface.bulkInsert('Showtimes', showtimesToInsert);

    // Fetch Showtimes
    const showtimes = await queryInterface.sequelize.query(
      `SELECT id, time, "dayId" FROM "Showtimes"`,
      { type: Sequelize.QueryTypes.SELECT }
    )

    const priceTypes = await queryInterface.sequelize.query(
      `SELECT id, name FROM "PriceTypes"`,
      { type: Sequelize.QueryTypes.SELECT }
    )

    const ticketData = {
      "Thứ 2, 4, 5": {
        "Trước 17:00": [75000, 55000, 55000],
        "Sau 17:00": [80000, 55000, 55000]
      },
      "Thứ 3": {
        "Happy Day": [55000, 55000, 55000]
      },
      "Thứ 6, 7, CN": {
        "Trước 17:00": [85000, 65000, 65000],
        "Sau 17:00": [95000, 65000, 65000]
      },
      "Ngày lễ": {
        "": [100000, 100000, 65000]
      },
      "Ngày tri ân": {
        "": [50000, 50000, 50000]
      },
      "Sau 22h (thành viên)": {
        "": [60000, 50000, 50000],
      }
    }

    const prices = []
    for (const showtime of showtimes) {
      const priceList = ticketData[days.find(d => d.id === showtime.dayId).name][showtime.time]
      for (let i = 0; i < priceTypes.length; i++) {
        prices.push({
          price: priceList[i],
          showtimeId: showtime.id,
          priceTypeId: priceTypes[i].id,
          createdAt: now,
          updatedAt: now
        })
      }
    }

    await queryInterface.bulkInsert('Prices', prices)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Prices', null, {})
    await queryInterface.bulkDelete('Showtimes', null, {})
    await queryInterface.bulkDelete('Days', null, {})
  }
}