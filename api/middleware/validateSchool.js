const Schools = require("../../data/models/schools");

async function validateSchool(req, res, next) {
  const school = req.body;
  if (
    !school ||
    !school.school_name ||
    !school.address ||
    !school.city ||
    !school.state ||
    !school.zipcode ||
    !school.funds_needed
  ) {
    next({ code: 400, message: "Please fill in all required fields" });
  } else {
    const existingSchool = await Schools.getBy({
      school_name: school.school_name
    });

    if (existingSchool) {
      next({
        code: 400,
        message: "School has already been registered"
      });
    } else {
      next();
    }
  }
}

module.exports = validateSchool;
