"use strict";

const { hashPassword } = require("../helpers/bcrypt");
const hospitalData = [
  {
    name: "Hospital 1",
    password: hashPassword(`1234`),
    address: "Jl. Tanjung Duren, Jakarta Barat",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Hospital 2",
    password: hashPassword(`1234`),
    address: "Jl. Makaliwe, Jakarta Barat",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Hospitals", hospitalData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Hospitals", null, {});
  },
};
