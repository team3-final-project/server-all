'use strict';

const data = [{
  date: '2020-12-12',
  type_test: 'Covid Test',
  file: 'https://firebasestorage.googleapis.com/v0/b/med-tracker-9f773.appspot.com/o/files%2F5e7dff_e4b4e61250a44c15824c449c6e068fc5_mv2.jpg?alt=media&token=83d0f8b9-7fa1-4a10-b39b-9c0e30eda1d8',
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
