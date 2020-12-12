const { Patient, HospitalRecord, MedicalRecord } = require("../models/index");
const { signToken } = require("../helpers/jwt")

class PatientController {

  static async loginPatient(req, res, next) {
    try {
      const data = req.body
      const result = await Patient.findOne({ where: {
          nik: data.nik,
          name: data.name
        }
      })

      if(!result) {
        throw { msg: 'Check again your identification data', status: 401 }
      } else {
        const access_token = signToken({
          id: result.id,
          nik: result.nik,
          name: result.name
        })
        res.status(200).json({access_token})
      }
    } catch (err) {
      next(err);
    }
  }

  static async readPatient(req, res, next) {
    try {
      const patient = req.patientLoggedIn
      const patientData = await Patient.findOne({
        where: {nik: patient.nik},
        include: [HospitalRecord, MedicalRecord]
      })
      res.status(200).json({patientData})
    } catch (err) {
      next(err)
    }
  }
  
}

module.exports = PatientController;
