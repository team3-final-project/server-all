"use strict";

const { hashPassword } = require("../helpers/bcrypt");
const doctorData = [
  {
    name: "Adly Maulana",
    password: hashPassword(`1234`),
    specialist: "Dokter Anak",
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Doctors", doctorData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Doctors", null, {});
  },
};
