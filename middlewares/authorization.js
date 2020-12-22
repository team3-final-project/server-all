const { MedicalRecord } = require("../models/index");

async function authorizationMedicalRecord(req, res, next) {
  try {
    let id = +req.params.id;
    const medicalRecord = await MedicalRecord.findByPk(id);
    console.log(medicalRecord, '<<< medicalRecordAuthorize');
    if (!medicalRecord) {
      throw { msg: `Error not found!`, status: 404 };
    } else if (medicalRecord.DoctorId === req.doctorLoggedIn.id) {
      next();
    } else {
      throw { msg: `Not authorized!`, status: 401 };
    }
  } catch (err) {
    next(err);
  }
}

module.exports = authorizationMedicalRecord;
