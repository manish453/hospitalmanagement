'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class patient_history extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      patient_history.belongsTo(models.patients, { foreignKey: 'pid', as: 'patients' })
      patient_history.belongsTo(models.users, { foreignKey: 'user_id', as: 'users' })
    }
  };
  patient_history.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    pid: {
      type: DataTypes.INTEGER(10),
      allowNull: false
    }, 
    user_id: {
      type: DataTypes.INTEGER(10),
      allowNull: false
    },
    visited_date: DataTypes.DATE,
    next_date: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'patient_history',
  });
  return patient_history;
};