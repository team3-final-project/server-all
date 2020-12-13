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
      const profile = await Hospital.findByPk(req.hospitalLoggedIn.id)
      res.status(200).json({data: data, profile: profile});
    } catch (err) {
      next(err);
    }
  }

  static async addNewPatient(req, res, next) {
    const HospitalId = req.hospitalLoggedIn
    const { nik, name, email, birth_date, address, type_test, file, date } = req.body;

    try {
      const addedPatient = await Patient.create({
        nik,
        name,
        email,
        birth_date,
        address
      })

      PatientId = addedPatient.id

      const createRecord = await HospitalRecord.create({
        type_test,
        file,
        date,
        PatientId,
        HospitalId
      })

      res.status(201).json(createRecord)
      
    } catch (err) {
      
    }
  }

  static async getPatientsList(req, res, next) {
    try {
      const data = await Patient.findAll({
        include: [HospitalRecord],
      });

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = HospitalController;
