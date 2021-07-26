'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('prescriptions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pid:{
        type:Sequelize.INTEGER(10),
        allowNull:false
      },
      user_id:{
        type:Sequelize.INTEGER(10),
        allowNull:false
      },
      symptoms: Sequelize.STRING(255),
      disease: Sequelize.STRING(255),
      medicine_name: Sequelize.STRING(255),
      dosage: Sequelize.STRING(150),
      quantity: Sequelize.STRING(100),
      doctor_note: Sequelize.STRING(255),
      dose: Sequelize.STRING(255),
      dont: Sequelize.STRING(255),
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
    await queryInterface.dropTable('prescriptions');
  }
};