'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class patient_lab_test extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      patient_lab_test.belongsTo(models.patients, { foreignKey: 'pid', as: 'patients' })
      patient_lab_test.belongsTo(models.users, { foreignKey: 'user_id', as: 'users' })
    }
  };
  patient_lab_test.init({
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
    reffred_by: DataTypes.STRING(100),
    discount: DataTypes.INTEGER(10),
    test_date: DataTypes.DATE,
    status: {
      type: DataTypes.INTEGER(2),
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'patient_lab_test',
  });
  return patient_lab_test;
};