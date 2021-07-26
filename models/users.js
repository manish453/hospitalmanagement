'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class users extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			users.belongsTo(models.centers, { foreignKey: 'center_id', as: "centers" })
			users.belongsTo(models.roles, { foreignKey: 'role_id', as: 'roles' })
			users.hasMany(models.patient_history, { foreignKey: 'user_id', as: 'patient_history' })
			users.hasMany(models.patient_lab_test, { foreignKey: 'user_id', as: 'patient_lab_test' })
			users.hasMany(models.prescriptions, { foreignKey: 'user_id', as: 'prescriptions' })
		}
	};
	users.init({
		user_id: {
			type: DataTypes.INTEGER(10),
			primaryKey: true,
			autoIncrement: true
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
		photo: DataTypes.STRING(100),
		address: DataTypes.STRING(255),
		qualification: DataTypes.STRING(100),
		specialization: DataTypes.STRING(50),
		sift_timing: DataTypes.STRING(30),
		designation: DataTypes.STRING(50),
		documents: DataTypes.STRING(255),
		center_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false
		},
		role_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false
		},
		isverified: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			defaultValue: 0
		},
		status: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			defaultValue: 1
		}
	}, {
		sequelize,
		modelName: 'users',
	});
	return users;
};