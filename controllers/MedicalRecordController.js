const { MedicalRecord } = require("../models/index");

class MedicalRecordController {

  static async addMedicalRecord(req, res, next) {
    try {
      // ...
    } catch (err) {
      next(err);
    }
  }
  
}

module.exports = MedicalRecordController;
