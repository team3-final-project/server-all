const router = require("express").Router();
const DoctorController = require("../controllers/DoctorController");
const authentication = require('../middlewares/authentication')

router.post("/", DoctorController.loginDoctor);

router.use(authentication)
router.get('/detail', DoctorController.detailDoctor)
// dst

module.exports = router;
