'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.addConstraint('patient_lab_test', {
			fields: ['pid'],
			type: 'foreign key',
			name: 'plt_pid_fkey',
			references: {
				table: 'patients',
				field: 'pid'
			},
			onUpdate: 'NO ACTION',
			onDelete: 'CASCADE',
		})
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.removeConstraint('patient_lab_test', 'plt_pid_fkey')
	}
};
