'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class patients extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      patients.belongsTo(models.centers, { foreignKey: 'center_id', as: "centers" })
      patients.hasMany(models.patient_history, { foreignKey: 'pid', as: 'patient_history' })
      patients.hasMany(models.patient_payment_history, { foreignKey: 'pid', as: 'patient_payment_history' })
      patients.hasMany(models.patient_lab_test, { foreignKey: 'pid', as: 'patient_lab_test' })
      patients.hasMany(models.prescriptions, { foreignKey: 'pid', as: 'prescriptions' })
      patients.hasMany(models.bills, { foreignKey: 'pid', as: 'bills' })
      
    }
  };
  patients.init({
    pid: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false

    },
    email: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
      set(val) {
        this.setDataValue("email", val.toLowerCase())
      },
      validate: { isEmail: true }
    },
    password: DataTypes.STRING(150),
    phone: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    gender: DataTypes.STRING(20),
    age: DataTypes.INTEGER(2),
    address: DataTypes.STRING(255),
    city: DataTypes.STRING(20),
    blood_group: DataTypes.STRING(10),
    insurance_id: DataTypes.STRING(100),
    know_any_staff: DataTypes.STRING(4),
    center_id:{
       type: DataTypes.INTEGER(2),
       allowNull:false
    },
    admit_status: DataTypes.INTEGER(2),
    admit_date: DataTypes.DATE,
    relieve_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'patients',
  });
  return patients;
};