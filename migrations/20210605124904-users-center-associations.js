'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.addConstraint('users', {
			fields: ['center_id'],
			type: 'foreign key',
			name: 'center_fkey',
			references: {
				table: 'centers',
				field: 'center_id'
			},
			onUpdate: 'NO ACTION',
			onDelete: 'CASCADE',
		})
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.removeConstraint('users', 'center_fkey')
	}
};
