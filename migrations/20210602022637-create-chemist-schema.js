'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('chemist', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name:{
        type:Sequelize.STRING(100),
        allowNull:false
      },
      price:Sequelize.INTEGER(2),
      stock: Sequelize.INTEGER(1),
      status: {
        type: Sequelize.INTEGER(1),
        allowNull: false,
        defaultValue: 1
      },
      mfg_date: Sequelize.DATE,
      expiry_date:Sequelize.DATE,
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
    await queryInterface.dropTable('chemist');
  }
};