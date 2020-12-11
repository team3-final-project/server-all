const { verifyToken } = require("../helpers/jwt");
const { Doctor } = require("../models/index");

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

module.exports = authenticationDoctor;
