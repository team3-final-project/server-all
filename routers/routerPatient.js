const router = require("express").Router();
const PatientController = require("../controllers/PatientController");
const { authenticationPatient } = require("../middlewares/authentication");

router.post("/", PatientController.loginPatient);
router.get("/", authenticationPatient, PatientController.readPatient);

module.exports = router;
