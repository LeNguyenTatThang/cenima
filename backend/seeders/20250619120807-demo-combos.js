'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Combos', [
      {
        name: 'Combo 1',
        price_old: 110000,
        price_new: 95000,
        image: '/images/combo1.jpg',
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Combo 2',
        price_old: 130000,
        price_new: 105000,
        image: '/images/combo2.jpg',
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Combos', null, {})
  }
}
