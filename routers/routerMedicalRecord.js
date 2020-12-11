const router = require("express").Router();
const MedicalRecordController = require("../controllers/MedicalRecordController");
const authenticationDoctor = require("../middlewares/authentication");

router.use(authenticationDoctor);
router.post("/", MedicalRecordController.addMedicalRecord);
// dst

module.exports = router;
