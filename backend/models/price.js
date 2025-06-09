'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Price extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Price.belongsTo(models.Showtime, { foreignKey: 'showtimeId' })
      Price.belongsTo(models.PriceType, { foreignKey: 'priceTypeId' })
    }
  }
  Price.init({
    price: DataTypes.INTEGER,
    showtimeId: DataTypes.INTEGER,
    priceTypeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Price',
  });
  return Price;
};