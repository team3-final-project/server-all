"use strict";
const { Model, ValidationError } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MedicalRecord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MedicalRecord.belongsTo(models.Doctor);
      MedicalRecord.belongsTo(models.Patient);
    }
  }
  MedicalRecord.init(
    {
      date: DataTypes.STRING,
      diagnose: DataTypes.STRING,
      medicine_name: DataTypes.STRING,
      dosis: DataTypes.INTEGER,
      jumlah_obat: DataTypes.INTEGER,
      PatientId: DataTypes.INTEGER,
      DoctorId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "MedicalRecord",
    }
  );
  return MedicalRecord;
};
