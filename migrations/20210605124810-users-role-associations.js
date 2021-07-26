'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.addConstraint('users', {
			fields: ['role_id'],
			type: 'foreign key',
			name: 'roles_fkey',
			references: {
				table: 'roles',
				field: 'role_id'
			},
			onUpdate: 'NO ACTION',
			onDelete: 'CASCADE',
		})
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.removeConstraint('users', 'roles_fkey')
	}
};
