'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Food extends Model {
    static associate(models) {
      Food.hasMany(models.FoodSize, { foreignKey: 'foodId', as: 'sizes' })
    }
  }
  Food.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Food',
    tableName: 'Foods',
  });
  return Food;
};