const { HospitalRecord } = require("../models/index");

class HospitalRecordController {

  static async addHospitalRecord(req, res, next) {
    const HospitalId = req.hospitalLoggedIn.id
    const PatientId = req.patientLoggedIn.id

    const { type_test, file, date } = req.body
    try {
      const result = await HospitalRecord.create({
        type_test,
        file,
        date,
        PatientId,
        HospitalId
      })
      res.status(201).json({result})
    } catch (err) {
      next(err);
    }
  }

  static async deleteHospitalRecord(req, res, next) {
    const id = req.params.id
    try {
      const result = await HospitalRecord.destroy({ where: {
        id: id
      },
        returning: true
      })
      res.status(200).json({result})
    }
    catch(err) {
      next(err)
    }
  }

}

module.exports = HospitalRecordController;
