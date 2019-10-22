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
    try {
      const { username } = admin;
      const existingUser = await Admins.getBy({ username: username });
      console.log("EXISTING USER:", existingUser);
      console.log("NEW USER:", admin);

      if (
        existingUser.username === admin.username ||
        existingUser.email === admin.email
      ) {
        next({
          code: 400,
          message:
            "Username/email is already taken, please provide valid credentials for all fields"
        });
      } else {
        next();
      }
    } catch (error) {
      next({ code: 400, message: "Could not create new user" });
    }
  }
}

module.exports = validateRegister;
