'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('patient_lab_test', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pid: {
        type: Sequelize.INTEGER(10),
        allowNull: false
      },
      user_id: {
        type: Sequelize.INTEGER(10),
        allowNull: false
      },
      reffred_by: Sequelize.STRING(100),
      discount: Sequelize.INTEGER(10),
      test_date: Sequelize.DATE,
      status: {
        type: Sequelize.INTEGER(2),
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('patient_lab_test');
  }
};