'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ComboDrink extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ComboDrink.belongsTo(models.Combo, { foreignKey: 'comboId' })
      ComboDrink.belongsTo(models.Drink, { foreignKey: 'drinkId' })
    }
  }
  ComboDrink.init({
    comboId: DataTypes.INTEGER,
    drinkId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ComboDrink',
    tableName: 'ComboDrinks'
  });
  return ComboDrink;
};