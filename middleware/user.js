const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config");

// middleware to handle auth
async function userMiddleware(req, res, next) {
  const authVal = req.headers.authorization;
  const user = jwt.verify(authVal, jwtSecret);

  // trying to check whether the jwt token is valid
  if (user.username) {
    req.username = user.username;
    next();
  } else {
    // for any other case we throw a jwt error
    res.status(400).send("jwt error");
  }
}

module.exports = userMiddleware;
