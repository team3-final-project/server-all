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
      diagnose: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: `Diagnose is required!`
          }
        }
      },
      medicine_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: `Medicine name is required!`
          }
        }
      },
      dosis: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: {
            args: [0],
            msg: 'Dosis must be greater than or equal 0!'
          },
          isNumeric: {
            args: true,
            msg: 'Dosis is required and must be an integer!'
          }
        }
      },
      jumlah_obat: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: {
            args: [0],
            msg: 'Amount of meds must be greater than or equal 0!'
          },
          isNumeric: {
            args: true,
            msg: 'Amount of meds is required and must be an integer!'
          }
        }
      },
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
