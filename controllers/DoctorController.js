const { Doctor, MedicalRecord, Patient } = require("../models/index");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");

class DoctorController {
  static async loginDoctor(req, res, next) {
    console.log('masuk')
    try {
      const { name, password } = req.body;
      const payload = {
        name,
        password,
      };
      const doctor = await Doctor.findOne({ where: { name: payload.name } });
      if (!doctor) {
        throw { msg: `Invalid name or password!`, status: 401 };
      } else if (!comparePassword(payload.password, doctor.password)) {
        throw { msg: `Invalid name or password!`, status: 401 };
      } else {
        const access_token = signToken({
          id: doctor.id,
          name: doctor.name,
        });
        res
          .status(200)
          .json({ id: doctor.id, name: doctor.name, access_token });
      }
    } catch (err) {
      // console.log(err, '<<< errr');
      next(err);
    }
  }

  static async detailDoctor(req, res, next) {
    try {
      const name = req.doctorLoggedIn.name;
      const doctor = await Doctor.findOne({
        where: { name },
        order: [["createdAt", "ASC"]],
      });
      res.status(200).json(doctor);
    } catch (err) {
      // next(err);
    }
  }

  static async getPatientsList(req, res, next) {
    try {
      const data = await Patient.findAll({
        // order: [['id', 'desc']],
        // where: {
        //   DoctorId: req.doctorLoggedIn.id,
        // },
        include: [MedicalRecord],
      });
      res.status(200).json(data); // Output Array of Object
    } catch (err) {
      // next(err);
    }
  }

  static async addNewPatient(req, res, next) {
    try {
      const { nik, name, email, birth_date, address } = req.body;
      let patientObj = {
        nik,
        name,
        email,
        birth_date,
        address,
      };
      const patient = await Patient.create(patientObj);
      res.status(201).json(patient);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = DoctorController;
