'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.addConstraint('patient_history', {
			fields: ['user_id'],
			type: 'foreign key',
			name: 'ph_user_id_fkey',
			references: {
				table: 'users',
				field: 'user_id'
			},
			onUpdate: 'NO ACTION',
			onDelete: 'CASCADE',
		})
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.removeConstraint('patient_history', 'ph_user_id_fkey')
	}
};
