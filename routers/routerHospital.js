const router = require("express").Router();
const HospitalController = require("../controllers/HospitalController");
const { authenticationHospital } = require("../middlewares/authentication");

router.post("/login", HospitalController.loginHospital);
router.get("/", authenticationHospital, HospitalController.getHospitalProfile);
router.post("/add", authenticationHospital, HospitalController.addPatient);
router.get("/patients", authenticationHospital, HospitalController.getPatientsList);

module.exports = router;
