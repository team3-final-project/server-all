"use strict";

const { hashPassword } = require("../helpers/bcrypt");
const doctorData = [
  {
    name: "Doctor 1",
    password: hashPassword(`1234`),
    specialist: "Dokter Umum",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Doctors", doctorData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Doctors", null, {});
  },
};
