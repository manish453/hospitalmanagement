'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  roles.init({
    role_id: {
      type: DataTypes.INTEGER(10),
      primaryKey: true,
      allowNull:false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    status: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			defaultValue: 1
		}
  }, {
    sequelize,
    modelName: 'roles',
  });
  return roles;
};