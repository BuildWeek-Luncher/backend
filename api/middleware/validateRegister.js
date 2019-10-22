const Admins = require("../../data/models/admins");
async function validateRegister(req, res, next) {
  const admin = req.body;
  if (
    !admin.username ||
    !admin.password ||
    !admin.email ||
    !admin.first_name ||
    !admin.last_name
  ) {
    next({ code: 400, message: "Please fill in all required fields" });
  } else {
    const existingUser = await Admins.getBy({ username: admin.username });

    if (existingUser) {
      next({
        code: 400,
        message:
          "Username/email is already taken, please provide valid credentials for all fields"
      });
    } else {
      next();
    }
  }
}

module.exports = validateRegister;
