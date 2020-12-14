const router = require("express").Router();
const DoctorController = require("../controllers/DoctorController");
const { authenticationDoctor } = require("../middlewares/authentication");

router.post("/", DoctorController.loginDoctor);

router.use(authenticationDoctor)
router.get("/detail", DoctorController.detailDoctor);
router.get("/patients", DoctorController.getPatientsList);

module.exports = router;
