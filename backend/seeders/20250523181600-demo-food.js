'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const now = new Date().toISOString()
    const foods = await queryInterface.bulkInsert('Foods', [
      { name: 'Bắp rang bơ', image: 'popcorn.jpg', createdAt: now, updatedAt: now },
      { name: 'Snack', image: 'snack.jpg', createdAt: now, updatedAt: now }
    ], { returning: true });

    await queryInterface.bulkInsert('FoodSizes', [
      { foodId: foods[0].id, size: 'Vừa', price: 35000, status: true, createdAt: now, updatedAt: now },
      { foodId: foods[0].id, size: 'Lớn', price: 45000, status: true, createdAt: now, updatedAt: now },
      { foodId: foods[1].id, size: 'Mặc định', price: 25000, status: true, createdAt: now, updatedAt: now }
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('FoodSizes', null, {});
    await queryInterface.bulkDelete('Foods', null, {});
  }
};
