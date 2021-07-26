'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('patient_payment_history', {
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
      amount: {
        type: Sequelize.INTEGER(10),
        allowNull: false
      },
      payment_type: {
        type: Sequelize.ENUM("Cash", "Card", "Check", "Netbankig"),
        allowNull: false,
        
      },
      payment_slip: Sequelize.STRING(255),
      payment_date: Sequelize.DATE,
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
    await queryInterface.dropTable('patient_payment_history');
  }
};