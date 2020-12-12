const router = require("express").Router();
const HospitalRecordController = require("../controllers/HospitalRecordController");
const { authenticationHospital } = require("../middlewares/authentication")

router.post("/", authenticationHospital, HospitalRecordController.addHospitalRecord);
router.delete("/:id", authenticationHospital, HospitalRecordController.deleteHospitalRecord)

module.exports = router;
