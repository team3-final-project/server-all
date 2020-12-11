const router = require("express").Router();
const HospitalController = require("../controllers/HospitalController");

router.post("/", HospitalController.loginHospital);
// dst

module.exports = router;
