'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FoodSize extends Model {
    static associate(models) {
      FoodSize.belongsTo(models.Food, { foreignKey: 'foodId', as: 'food' })
    }
  }
  FoodSize.init({
    foodId: DataTypes.INTEGER,
    size: DataTypes.STRING,
    price: DataTypes.FLOAT,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'FoodSize',
    tableName: 'FoodSizes'
  });
  return FoodSize;
};