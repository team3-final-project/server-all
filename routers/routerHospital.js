const router = require("express").Router();
const HospitalController = require("../controllers/HospitalController");
const { authenticationHospital } = require("../middlewares/authentication");

router.post("/login", HospitalController.loginHospital);
router.get("/", authenticationHospital, HospitalController.getHospitalProfile);
// dst

module.exports = router;
