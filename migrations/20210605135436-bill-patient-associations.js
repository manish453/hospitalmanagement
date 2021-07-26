'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.addConstraint('bills', {
			fields: ['pid'],
			type: 'foreign key',
			name: 'pid_fkey',
			references: {
				table: 'patients',
				field: 'pid'
			},
			onUpdate: 'NO ACTION',
			onDelete: 'CASCADE',
		})
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.removeConstraint('bills', 'pid_fkey')
	}
};
