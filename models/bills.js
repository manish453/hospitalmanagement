'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class bills extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	};
	bills.init({
		bill_id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		pid: {
			type: DataTypes.INTEGER(10),
			allowNull: false
		},
		doctor_charge: {
			type: DataTypes.INTEGER(5),
			allowNull: false
		},
		room_charge: {
			type: DataTypes.INTEGER(5),
			allowNull: false
		},
		nursing_charge: {
			type: DataTypes.INTEGER(5),
			allowNull: false
		},
		lab_charge: {
			type: DataTypes.INTEGER(5),
			allowNull: false
		},
		fluid_charge: {
			type: DataTypes.INTEGER(5),
			allowNull: false
		},
		other_charge: {
			type: DataTypes.INTEGER(5),
			allowNull: false
		},
		status: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			defaultValue: 1
		}
	}, {
		sequelize,
		modelName: 'bills',
	});
	return bills;
};