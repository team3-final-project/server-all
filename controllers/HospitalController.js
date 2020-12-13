const {
  Hospital,
  HospitalRecord,
  Patient,
  sequelize,
} = require("../models/index");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");

class HospitalController {
  static async loginHospital(req, res, next) {
    const payload = {
      name: req.body.name,
      password: req.body.password,
    };
    try {
      const data = await Hospital.findOne({
        where: { name: payload.name },
      });
      if (!data) {
        throw { msg: "Invalid name or password!", status: 401 };
      } else if (!comparePassword(payload.password, data.password)) {
        throw { msg: "Invalid name or password!", status: 401 };
      } else {
        const access_token = signToken({
          id: data.id,
          name: data.name,
          address: data.address,
        });
        const newData = {
          id: data.id,
          name: data.name,
          access_token: access_token,
        };
        res.status(200).json(newData);
      }
    } catch (err) {
      next(err);
    }
  }

  static async getHospitalProfile(req, res, next) {
    try {
      const data = await HospitalRecord.findAll({
        where: { HospitalId: req.hospitalLoggedIn.id },
        attributes: [
          "HospitalId",
          [
            sequelize.fn("COUNT", sequelize.col("HospitalId")),
            "Jumlah Patient",
          ],
        ],
        group: ["HospitalId"],
      });
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async getPatientsList(req, res, next) {
    try {
      const data = await Patient.findAll({
        // where: {
        //   HospitalId: req.hospitalLoggedIn.id,
        // },
        include: [HospitalRecord],
      });

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = HospitalController;
