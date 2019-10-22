const Admins = require("../../data/models/admins");
async function validateRegister(req, res, next) {
  const admin = req.body;
  const userExists = await Admins.getBy({ username: admin.username });

  if (userExists) {
    next({ code: 400, message: "Username is already taken" });
  } else if (
    !admin.username ||
    !admin.password ||
    !admin.email ||
    !admin.first_name ||
    !admin.last_name
  ) {
    next({
      code: 400,
      message:
        "Please provide a username, password, email, first and last name to register"
    });
  } else {
    next();
  }
}

module.exports = validateRegister;
