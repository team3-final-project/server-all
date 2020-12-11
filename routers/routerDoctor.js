const router = require("express").Router();
const DoctorController = require("../controllers/DoctorController");

router.post("/", DoctorController.loginDoctor);
// dst

module.exports = router;
