'use strict';

const data = [{
  date: '12/12/2020',
  type_test: 'test 1',
  file: 'file',
  PatientId: 1,
  HospitalId: 1,
  createdAt: new Date(),
  updatedAt: new Date()
}]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("HospitalRecords", data, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("HospitalRecords", null, {});
  }
};
