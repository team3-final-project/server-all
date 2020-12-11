"use strict";

const patientData = [
  {
    nik: "123456789",
    name: "Patient 1",
    email: "patient@mail.com",
    birth_date: "25-09-1996",
    address: "Jl. Tanjung Duren, Jakarta Barat",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Patients", patientData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Patients", null, {});
  },
};
