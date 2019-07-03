const jwt = require("jsonwebtoken");

const i = "FriendFinder @ LambdaSchool"; //Issuer
const a = "http://localhost:3300/api"; // Audience

const secretKey = "super secret" || process.env.SECRET;

function generateToken(user) {
  const payload = {
    id: user._id,
    s: user.username,
  };

  const signOptions = {
    issuer: i,
    audience: a,
    expiresIn: "12h"
    // algorithm: "RS256"
  };

  return jwt.sign(payload, secretKey, signOptions);
}

function verifyToken(token) {
  const verifyOptions = {
    issuer: i,
    audience: a,
    expiresIn: "12h"
    // algorithm: ["RS256"]
  };

  return jwt.verify(token, secretKey, verifyOptions);
}

module.exports = {
  generateToken,
  verifyToken,
  secretKey
};
