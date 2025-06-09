'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('PriceTypes', [
      { name: 'Thành viên / Người lớn', createdAt: new Date(), updatedAt: new Date() },
      { name: 'U22', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Trẻ em / Người cao tuổi', createdAt: new Date(), updatedAt: new Date() },
    ], {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('PriceTypes', null, {})
  }
};
