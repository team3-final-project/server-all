const jwt = require("jsonwebtoken");

function signToken(payload) {
  const token = jwt.sign(payload, process.env.SECRET);
  return token;
}

function verifyToken(access_token) {
  const decoded = jwt.verify(access_token, process.env.SECRET);
  return decoded;
}

module.exports = { signToken, verifyToken };
