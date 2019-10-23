const jwt = require("jsonwebtoken");
const secret = require("../../config/secrets");

function authenticate(req, res, next) {
  const id = req.params.id;
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, secret.jwtSecret);

  if (token && Number(id) === decoded.admin_id) {
    next();
  } else {
    next({
      code: 401,
      message: "You are not authorized to make this request"
    });
  }
}

module.exports = authenticate;
