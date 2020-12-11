"use strict";
const { Model, ValidationError } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Hospital extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Hospital.hasMany(models.HospitalRecord);
    }
  }
  Hospital.init(
    {
      name: DataTypes.STRING,
      password: DataTypes.STRING,
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Hospital",
    }
  );
  return Hospital;
};
