'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('centers', {
      center_id: {
        type: Sequelize.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(100),
        unique: true,
        allowNull: false,
        set(val) {
          this.setDataValue("email", val.toLowerCase())
        },
        validate: { isEmail: true }
      },
      website: Sequelize.STRING(100),
      address: Sequelize.STRING(255),
      logo: Sequelize.STRING(100),
      beds: Sequelize.INTEGER(2),
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
    await queryInterface.dropTable('centers');
  }
};