'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class prescriptions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      prescriptions.belongsTo(models.patients, { foreignKey: 'pid', as: 'patients' })
      prescriptions.belongsTo(models.users, { foreignKey: 'user_id', as: 'users' })
    }
  };
  prescriptions.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    pid:{
      type:DataTypes.INTEGER(10),
      allowNull:false
    },
    user_id:{
      type:DataTypes.INTEGER(10),
      allowNull:false
    },
    symptoms: DataTypes.STRING(255),
    disease: DataTypes.STRING(255),
    medicine_name: DataTypes.STRING(255),
    dosage: DataTypes.STRING(150),
    quantity: DataTypes.STRING(100),
    doctor_note: DataTypes.STRING(255),
    dose: DataTypes.STRING(255),
    dont: DataTypes.STRING(255),
  }, {
    sequelize,
    modelName: 'prescriptions',
  });
  return prescriptions;
};