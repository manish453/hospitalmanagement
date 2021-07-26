module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      name: 'Admin',
      email: 'admin@gmail.com',
      password:'$2b$05$db.SltKjzH4KzsGtQ7mMdeIJ/h5DBZHtPLSQ7HRbYY3TrdkfuAP32',
      phone: '9999508445',
      gender: 'Male',
      age: 25,
      photo:
        'https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg',
      address: 'New Delhi',
      center_id: 1,
      role_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};