"use strict";

const { hashPassword } = require("../helpers/bcrypt");
const hospitalData = [
  {
    name: "RS Borromeus",
    password: hashPassword(`1234`),
    address: "Jl. Ir.H. Juanda, Bandung",
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Hospitals", hospitalData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Hospitals", null, {});
  },
};
