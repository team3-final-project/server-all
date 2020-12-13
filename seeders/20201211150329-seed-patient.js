"use strict";

const patientData = [
  {
    nik: "123456789",
    name: "Patient 1",
    email: "patient1@mail.com",
    birth_date: "1996-09-25",
    address: "Jl. Tanjung Duren, Jakarta Barat",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    nik: "23235568",
    name: "Patient 2",
    email: "patient2@mail.com",
    birth_date: "1998-07-17",
    address: "Jl. S. Parman, Jakarta Barat",
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
