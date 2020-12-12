const { verifyToken } = require("../helpers/jwt");
const { Doctor, Patient, Hospital } = require("../models/index");

async function authenticationDoctor(req, res, next) {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      throw { msg: `Authentication failed!`, status: 401 };
    } else {
      const decoded = verifyToken(access_token);
      const { name } = decoded;
      const doctor = await Doctor.findOne({ where: { name } });
      if (!doctor) {
        throw { msg: `Authentication failed!`, status: 401 };
      } else {
        req["doctorLoggedIn"] = decoded;
        next();
      }
    }
  } catch (err) {
    next(err);
  }
}

async function authenticationHospital(req, res, next) {
  try {
    const { access_token } = req.headers;
    console.log(access_token, '<<<< access_token di authen');
    if (!access_token) {
      throw { msg: `Authentication failed!`, status: 401 };
    } else {
      const decoded = verifyToken(access_token);
      const { name } = decoded;
      const hospital = await Hospital.findOne({ where: { name } });
      if (!hospital) {
        throw { msg: `Authentication failed!`, status: 401 };
      } else {
        req["hospitalLoggedIn"] = decoded;
        next();
      }
    }
  } catch (err) {
    next(err);
  }
}

async function authenticationPatient(req, res, next) {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      throw { msg: `Authentication failed!`, status: 401 };
    } else {
      const decoded = verifyToken(access_token);
      const { nik, name } = decoded;
      const patient = await Patient.findOne({ where: { nik: nik, name: name } });
      console.log(patient)
      if (!patient) {
        console.log('bukan')
        throw { msg: `Authentication failed!`, status: 401 };
      } else {
        console.log('4')
        req["patientLoggedIn"] = decoded;
        next();
      }
    }
  } catch (err) {
    next(err);
  }
}

module.exports = { authenticationDoctor, authenticationPatient, authenticationHospital };

