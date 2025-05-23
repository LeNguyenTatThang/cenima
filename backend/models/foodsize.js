'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FoodSize extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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