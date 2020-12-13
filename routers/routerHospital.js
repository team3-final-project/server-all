const router = require("express").Router();
const HospitalController = require("../controllers/HospitalController");
const { authenticationHospital } = require("../middlewares/authentication");

router.post("/login", HospitalController.loginHospital);
router.post("/patients", authenticationHospital, HospitalController.addNewPatient)
router.get("/", authenticationHospital, HospitalController.getHospitalProfile);
router.get("/patients", authenticationHospital, HospitalController.getPatientsList)

module.exports = router;
