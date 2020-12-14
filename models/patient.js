"use strict";
const { Model, ValidationError } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Patient.hasMany(models.MedicalRecord);
      Patient.hasMany(models.HospitalRecord);
    }
  }
  Patient.init(
    {
      nik: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: `nik should not be empty`,
          },
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: `name should not be empty`,
          },
        },
      },
      email: DataTypes.STRING,
      birth_date: DataTypes.STRING,
      address: DataTypes.STRING,
      DoctorId: DataTypes.INTEGER,
      HospitalId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Patient",
    }
  );
  return Patient;
};
