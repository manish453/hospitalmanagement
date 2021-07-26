'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class chemist extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	};
	chemist.init({
		id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING(100),
			allowNull: false
		},
		price: DataTypes.INTEGER(2),
		stock: DataTypes.INTEGER(1),
		status: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			defaultValue: 1
		},
		mfg_date: DataTypes.DATE,
		expiry_date: DataTypes.DATE

	}, {
		freezeTableName: true,
		sequelize,
		modelName: 'chemist',
	});
	return chemist;
};