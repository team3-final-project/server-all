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
      date: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: `Date is required!`
          },
          isDate: {
            args: true,
            msg: `Wrong date format YYYY-MM-DD!`
          },
          isAfter: {
            args: `${new Date()}`,
            msg: `Date cannot be before today's date!`
          }
        }
      },
      type_test: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: `Type test is required!`
          }
        }
      },
      file: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: `File is required!`
          }
        }
      },
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
