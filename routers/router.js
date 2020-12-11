const router = require("express").Router();
const routerDoctor = require("./routerDoctor");
const routerHospital = require("./routerHospital");
const routerPatient = require("./routerPatient");
const routerMedicalRecord = require("./routerMedicalRecord");
const routerHospitalRecord = require("./routerHospitalRecord");

// Doctor
router.use("/doctor", routerDoctor);

// Hospital
router.use("/hospital", routerHospital);

// Patient
router.use("/patient", routerPatient);

// MedicalRecord
router.use("/medical-record", routerMedicalRecord);

// HospitalRecord
router.use("/hospital-record", routerHospitalRecord);

module.exports = router;
