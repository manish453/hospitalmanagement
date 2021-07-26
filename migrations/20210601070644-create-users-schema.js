'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      user_id: {
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
      phone:{
        type:Sequelize.STRING(50),
        allowNull:false
      },
      gender:Sequelize.STRING(20),
      age: Sequelize.INTEGER(2),
      photo: Sequelize.STRING(100),
      address: Sequelize.STRING(255),
      qualification: Sequelize.STRING(100),
      specialization: Sequelize.STRING(50),
      sift_timing: Sequelize.STRING(30),
      designation:Sequelize.STRING(50),
      documents:Sequelize.STRING(255),
      center_id: {
        type:Sequelize.INTEGER(10),
        allowNull:false
      },
      role_id: {
        type:Sequelize.INTEGER(10),
        allowNull:false
      },
      isverified:{
         type: Sequelize.INTEGER(1),
         allowNull: false,
         defaultValue:0
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
    await queryInterface.dropTable('users');
  }
};