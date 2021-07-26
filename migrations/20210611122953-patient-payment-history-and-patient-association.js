'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.addConstraint('patient_payment_history', {
			fields: ['pid'],
			type: 'foreign key',
			name: 'pph_pid_fkey',
			references: {
				table: 'patients',
				field: 'pid'
			},
			onUpdate: 'NO ACTION',
			onDelete: 'CASCADE',
		})
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.removeConstraint('patient_payment_history', 'pph_pid_fkey')
	}
};
