const { MedicalRecord } = require("../models/index");

class MedicalRecordController {
  static async addMedicalRecord(req, res, next) {
    try {
      const {
        date,
        diagnose,
        medicine_name,
        dosis,
        jumlah_obat,
        PatientId,
      } = req.body;
      const DoctorId = req.userLoggedIn.id;
      let medicalRecordObj = {
        date,
        diagnose,
        medicine_name,
        dosis,
        jumlah_obat,
        PatientId: +PatientId,
        DoctorId: +DoctorId,
      };
      const medicalRecord = await MedicalRecord.create(medicalRecordObj);
      res.status(201).json(medicalRecord);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = MedicalRecordController;
