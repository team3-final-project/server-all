const router = require("express").Router();
const HospitalRecordController = require("../controllers/HospitalRecordController");

router.post("/", HospitalRecordController.addHospitalRecord);
router.delete("/:id", HospitalRecordController.deleteHospitalRecord)

module.exports = router;
