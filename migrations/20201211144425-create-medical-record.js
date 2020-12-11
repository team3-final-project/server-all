"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("MedicalRecords", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      date: {
        type: Sequelize.STRING,
      },
      diagnose: {
        type: Sequelize.STRING,
      },
      medicine_name: {
        type: Sequelize.STRING,
      },
      dosis: {
        type: Sequelize.INTEGER,
      },
      jumlah_obat: {
        type: Sequelize.INTEGER,
      },
      PatientId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Patients",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      DoctorId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Doctors",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("MedicalRecords");
  },
};
