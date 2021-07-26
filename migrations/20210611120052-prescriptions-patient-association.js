'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.addConstraint('prescriptions', {
			fields: ['pid'],
			type: 'foreign key',
			name: 'pid_prescriptions_fkey',
			references: {
				table: 'patients',
				field: 'pid'
			},
			onUpdate: 'NO ACTION',
			onDelete: 'CASCADE',
		})
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.removeConstraint('prescriptions', 'pid_prescriptions_fkey')
	}
};
