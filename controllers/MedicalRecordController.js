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
      const DoctorId = req.doctorLoggedIn.id;
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

  static async getMedicalRecord(req, res, next) {
    try {
      const { PatientId } = req.body;
      const DoctorId = req.doctorLoggedIn.id;
      const medicalRecords = await MedicalRecord.findAll({
        where: { PatientId, DoctorId },
        order: [["updatedAt", "DESC"]],
      });
      if (!medicalRecords.length) {
        throw { msg: `Error not found!`, status: 404 };
      } else {
        res.status(200).json(medicalRecords);
      }
    } catch (err) {
      next(err);
    }
  }

  static async editMedicalRecord(req, res, next) {
    try {
      let id = +req.params.id;
      const { date, diagnose, medicine_name, dosis, jumlah_obat } = req.body;
      let medicalRecordObj = {
        date,
        diagnose,
        medicine_name,
        dosis,
        jumlah_obat,
      };
      const updatedMedicalRecord = await MedicalRecord.update(
        medicalRecordObj,
        {
          where: { id },
          returning: true,
        }
      );
      res.status(200).json(updatedMedicalRecord[1][0]);
    } catch (err) {
      next(err);
    }
  }

  static async deleteMedicalRecord(req, res, next) {
    try {
      let id = +req.params.id;
      const deletedMedicalRecord = await MedicalRecord.destroy({
        where: { id },
      });
      res.status(200).json({
        msg: `Successfully delete a medical record!`,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = MedicalRecordController;
