'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Combo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Combo.belongsToMany(models.Food, {
        through: 'ComboFoods',
        as: 'foods',
        foreignKey: 'comboId'
      })

      Combo.belongsToMany(models.Drink, {
        through: 'ComboDrinks',
        as: 'drinks',
        foreignKey: 'comboId'
      })

    }
  }
  Combo.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price_old: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price_new: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    }
  }, {
    sequelize,
    modelName: 'Combo',
    tableName: 'Combos'
  });
  return Combo;
};