'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.addConstraint('patients', {
			fields: ['center_id'],
			type: 'foreign key',
			name: 'center_id_fkey',
			references: {
				table: 'centers',
				field: 'center_id'
			},
			onUpdate: 'NO ACTION',
			onDelete: 'CASCADE',
		})
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.removeConstraint('patients', 'center_id_fkey')
	}
};
