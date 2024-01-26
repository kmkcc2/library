'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      name: 'Adam',
      login: 'admin',
      password: '$2a$12$6lWBj00KcZ75MBVxjFIoR./9MWCn5T3K0eiTI19EWv2rjmTStgC1a', // password: password
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, { login: 'admin' })
  }
};
