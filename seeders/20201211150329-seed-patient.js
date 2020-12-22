"use strict";

const patientData = [
  {
    nik: "123456789",
    name: "Jajang Suherman",
    email: "jajangsuherman@gmail.com",
    birth_date: "1996-09-25",
    address: "Jl. cisitu baru, Bandung",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    nik: "123456780",
    name: "John Doe",
    email: "johndoe@mail.com",
    birth_date: "1990-07-17",
    address: "Jl. S. Parman, Jakarta Barat",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    nik: "123456782",
    name: "Sisca Junitia",
    email: "siscae@mail.com",
    birth_date: "1995-07-17",
    address: "Jl. Gajahmada V, Jakarta Barat",
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Patients", patientData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Patients", null, {});
  },
};
