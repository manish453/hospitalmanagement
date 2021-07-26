'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class centers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  centers.init({
    center_id: {
      type: DataTypes.INTEGER(10),
      primaryKey: true,
      allowNull:false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
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
    website: DataTypes.STRING(100),
    address: DataTypes.STRING(255),
    logo: DataTypes.STRING(100),
    beds: DataTypes.INTEGER(2),
    status: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			defaultValue: 1
		}

  }, {
    sequelize,
    modelName: 'centers',
  });
  return centers;
};