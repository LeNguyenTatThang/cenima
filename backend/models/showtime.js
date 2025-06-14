'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Showtime extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Showtime.belongsTo(models.Day, { foreignKey: 'dayId' })
      Showtime.hasMany(models.Price, { foreignKey: 'showtimeId', onDelete: 'CASCADE' })
    }
  }
  Showtime.init({
    time: DataTypes.STRING,
    dayId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Showtime',
  });
  return Showtime;
};