'use strict';

const data = [{
  date: '12/12/2020',
  type_test: 'test 2',
  file: 'file',
  PatientId: 1,
  HospitalId: 2,
  createdAt: new Date(),
  updatedAt: new Date()
}, {
  date: '12/12/2020',
  type_test: 'test 3',
  file: 'file',
  PatientId: 2,
  HospitalId: 2,
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
