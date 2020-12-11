const router = require("express").Router();
const HospitalRecordController = require("../controllers/HospitalRecordController");

router.post("/", HospitalRecordController.addHospitalRecord);
// dst

module.exports = router;
