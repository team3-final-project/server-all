const router = require("express").Router();
const MedicalRecordController = require("../controllers/MedicalRecordController");
const { authenticationDoctor } = require("../middlewares/authentication");
const authorizationMedicalRecord = require("../middlewares/authorization");

router.use(authenticationDoctor);
router.post("/", MedicalRecordController.addMedicalRecord);
router.get("/", MedicalRecordController.getMedicalRecord);
router.get("/:id", MedicalRecordController.getMedicalRecordById);
router.put("/:id", authorizationMedicalRecord, MedicalRecordController.editMedicalRecord);
router.delete("/:id", authorizationMedicalRecord, MedicalRecordController.deleteMedicalRecord);
router.get("/patient/:id", MedicalRecordController.getPatientById);

module.exports = router;
