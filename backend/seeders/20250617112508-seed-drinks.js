'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Drinks', [
      {
        id: 1,
        name: 'Pepsi',
        price: 15000,
        image: 'https://www.shutterstock.com/image-photo/mykolaiv-ukraine-june-9-2021-600nw-2027510024.jpg',
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'Coca',
        price: 18000,
        image: 'https://quick-live.eu-central-1.linodeobjects.com/media/images/COCA_DETAIL_SABBSHM.format-jpeg.jpegquality-75.jpg',
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Drinks', null, {})
  }
}
