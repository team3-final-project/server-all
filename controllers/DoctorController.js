const { Doctor, MedicalRecord, Patient } = require("../models/index");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");

class DoctorController {
  static async loginDoctor(req, res, next) {
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
      next(err);
    }
  }

  static async getPatientsList(req, res, next) {
    try {
      const data = await MedicalRecord.findAll({
        where: {
          DoctorId: req.doctorLoggedIn.id,
        },
        include: [Patient],
      });
      const patients = [];
      data.forEach((el) => {
        let flag = false;
        for (let i = 0; i < patients.length - 1; i++) {
          if (el.id === patients[i].id) {
            flag = true;
          }
        }
        if (!flag) {
          patients.push(el.Patient);
        }
      });

      res.status(200).json(patients);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = DoctorController;
