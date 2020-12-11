const router = require("express").Router();
const MedicalRecordController = require("../controllers/MedicalRecordController");

router.post("/", MedicalRecordController.addMedicalRecord);
// dst

module.exports = router;
