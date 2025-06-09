'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PriceType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PriceType.hasMany(models.Price, { foreignKey: 'priceTypeId', onDelete: 'CASCADE' })
    }
  }
  PriceType.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PriceType',
  });
  return PriceType;
};