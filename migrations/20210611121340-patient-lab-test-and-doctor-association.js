'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.addConstraint('patient_lab_test', {
			fields: ['user_id'],
			type: 'foreign key',
			name: 'plt_user_id_fkey',
			references: {
				table: 'users',
				field: 'user_id'
			},
			onUpdate: 'NO ACTION',
			onDelete: 'CASCADE',
		})
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.removeConstraint('patient_lab_test', 'plt_user_id_fkey')
	}
};
