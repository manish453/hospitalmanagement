'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class patient_payment_history extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      patient_payment_history.belongsTo(models.patients, { foreignKey: 'pid', as: 'patients' })
    }
  };
  patient_payment_history.init({
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
    amount: {
      type: DataTypes.INTEGER(10),
      allowNull: false
    },
    payment_type: {
      type: DataTypes.ENUM("Cash", "Card", "Check", "Netbankig"),
      allowNull: false
    },
    payment_slip: DataTypes.STRING(255),
    payment_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'patient_payment_history',
  });
  return patient_payment_history;
};