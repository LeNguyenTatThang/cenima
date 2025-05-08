'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Auditorium extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Auditorium.belongsTo(models.Theater, { foreignKey: 'theater_id' })
      Auditorium.hasMany(models.Seat, { foreignKey: 'auditorium_id' })
    }
  }
  Auditorium.init({
    theater_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Auditorium',
    tableName: 'Auditoriums'
  });
  return Auditorium;
};