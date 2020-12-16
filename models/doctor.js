"use strict";
const { Model, ValidationError } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Doctor.hasMany(models.MedicalRecord);
    }
  }
  Doctor.init(
    {
      name: DataTypes.STRING,
      password: DataTypes.STRING, 
      specialist: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Doctor",
    }
  );
  return Doctor;
};
