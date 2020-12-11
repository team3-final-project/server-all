const router = require("express").Router();
const HospitalController = require("../controllers/HospitalController");

router.post("/login", HospitalController.loginHospital);
router.get("/", HospitalController.getHospitalProfile);
// dst

module.exports = router;
