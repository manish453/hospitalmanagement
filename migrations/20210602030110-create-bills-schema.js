'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('bills', {
      bill_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pid: {
        type: Sequelize.INTEGER(10),
        allowNull:false
      },
      doctor_charge: {
        type: Sequelize.INTEGER(5),
        allowNull:false
      },
      room_charge: {
        type: Sequelize.INTEGER(5),
        allowNull:false
      },
      nursing_charge: {
        type: Sequelize.INTEGER(5),
        allowNull:false
      },
      lab_charge: {
        type: Sequelize.INTEGER(5),
        allowNull:false
      },
      fluid_charge: {
        type: Sequelize.INTEGER(5),
        allowNull:false
      },
      other_charge: {
        type: Sequelize.INTEGER(5),
        allowNull:false
      },
      status: {
        type: Sequelize.INTEGER(1),
        allowNull: false,
        defaultValue: 1
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
    await queryInterface.dropTable('bills');
  }
};