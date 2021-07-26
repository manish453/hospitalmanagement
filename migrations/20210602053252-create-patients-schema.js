'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('patients', {
      pid: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(50),
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
      password: Sequelize.STRING(150),
      phone: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      gender: Sequelize.STRING(20),
      age: Sequelize.INTEGER(2),
      address: Sequelize.STRING(255),
      city: Sequelize.STRING(20),
      blood_group: Sequelize.STRING(10),
      insurance_id: Sequelize.STRING(100),
      know_any_staff: Sequelize.STRING(4),
      center_id: {
        type: Sequelize.INTEGER(2),
        allowNull: false
      },
      admit_status: Sequelize.INTEGER(2),
      admit_date: Sequelize.DATE,
      relieve_date: Sequelize.DATE,
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
    await queryInterface.dropTable('patients');
  }
};