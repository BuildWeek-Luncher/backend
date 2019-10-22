const Admins = require("../../data/models/admins");
const bcrypt = require("bcrypt");

async function validateLogin(req, res, next) {
  const { username, password } = req.body;
  try {
    var user = await Admins.getBy({ username: username });
    if (user && bcrypt.compareSync(password, user.password)) {
      next();
    } else {
      next({ code: 400, message: "Invalid Credentials" });
    }
  } catch (error) {
    next({
      code: 400,
      message: "Could not find admin with specified username"
    });
  }
}

module.exports = validateLogin;
