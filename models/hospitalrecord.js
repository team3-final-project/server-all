"use strict";
const { Model, ValidationError } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class HospitalRecord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      HospitalRecord.belongsTo(models.Hospital);
      HospitalRecord.belongsTo(models.Patient);
    }
  }
  HospitalRecord.init(
    {
      date: DataTypes.STRING,
      type_test: DataTypes.STRING,
      file: DataTypes.STRING,
      PatientId: DataTypes.INTEGER,
      HospitalId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "HospitalRecord",
    }
  );
  return HospitalRecord;
};
