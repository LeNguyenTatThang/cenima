'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    const email = 'lenguyentatthang.dev@gmail.com';

    // Kiểm tra xem email đã tồn tại chưa
    const [accounts] = await queryInterface.sequelize.query(
      `SELECT id FROM "Accounts" WHERE email = '${email}' LIMIT 1`
    );

    // Nếu chưa tồn tại thì mới insert
    if (accounts.length === 0) {
      const hashedPassword = await bcrypt.hash('Ken@2023', 10);

      await queryInterface.bulkInsert('Accounts', [{
        name: 'Lê Nguyễn Tất Thắng',
        email: email,
        password: hashedPassword,
        points: 0,
        role: 'admin',
        status: 'active',
        profile_picture: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }], {});
    } else {
      console.log(`[Seed] Admin account "${email}" already exists. Skipping insert.`);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Accounts', {
      email: 'lenguyentatthang.dev@gmail.com'
    }, {});
  }
};
