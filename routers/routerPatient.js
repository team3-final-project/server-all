const router = require("express").Router();
const PatientController = require("../controllers/PatientController");

router.post("/", PatientController.loginPatient);
// dst

module.exports = router;
