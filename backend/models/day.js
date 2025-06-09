'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Day extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Day.hasMany(models.Showtime, { foreignKey: 'dayId', onDelete: 'CASCADE' })
    }
  }
  Day.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Day',
  });
  return Day;
};