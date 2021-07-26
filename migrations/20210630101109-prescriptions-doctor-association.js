'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.addConstraint('prescriptions', {
			fields: ['user_id'],
			type: 'foreign key',
			name: 'user_id_prescriptions_fkey',
			references: {
				table: 'users',
				field: 'user_id'
			},
			onUpdate: 'NO ACTION',
			onDelete: 'CASCADE',
		})
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.removeConstraint('prescriptions', 'user_id_prescriptions_fkey')
	}
};
