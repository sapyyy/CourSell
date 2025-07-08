const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config");

// middleware to handle auth
async function adminMiddleware(req, res, next) {
  const authVal = req.headers.authorization;
  const admin = jwt.verify(authVal, jwtSecret);

  // trying to check whether the jwt token is valid
  if (admin.username) {
    next();
  } else {
    res.status(400).send("jwt error");
  }
}

module.exports = adminMiddleware;
