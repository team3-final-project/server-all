const { Doctor } = require("../models/index");
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
      const doctor = await Doctor.findAll({
        order: [["createdAt", "ASC"]]
      });
      res.status(200).json(doctor);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = DoctorController;
