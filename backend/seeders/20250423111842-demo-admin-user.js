'use strict';
const bcrypt = require('bcryptjs');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('Ken@2023', 10);

    await queryInterface.bulkInsert('Accounts', [{
      name: 'Lê Nguyễn Tất Thắng',
      email: 'lenguyentatthang.dev@gmail.com',
      password: hashedPassword,
      points: 0,
      role: 'admin',
      status: 'active',
      profile_picture: null,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Accounts', {
      email: 'lenguyentatthang.dev@gmail.com'
    }, {});
  }
};
