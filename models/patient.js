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
      nik: DataTypes.STRING,
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      birth_date: DataTypes.STRING,
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Patient",
    }
  );
  return Patient;
};
