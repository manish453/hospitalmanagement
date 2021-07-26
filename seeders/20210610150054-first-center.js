module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('centers', [{
      name: 'Demo Hospital',
      email: 'demohospital@gmail.com',
      status: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('centers', null, {});
  }
};