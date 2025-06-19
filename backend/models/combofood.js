'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ComboFood extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ComboFood.belongsTo(models.Combo, { foreignKey: 'comboId' })
      ComboFood.belongsTo(models.Food, { foreignKey: 'foodId' })

    }
  }
  ComboFood.init({
    comboId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    foodId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'ComboFood',
    tableName: 'ComboFoods'
  });
  return ComboFood;
};