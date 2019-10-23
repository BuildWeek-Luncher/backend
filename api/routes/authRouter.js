const express = require("express");
const router = express.Router();

// Auth Utilities
const bcrypt = require("bcrypt");
const generateToken = require("../generateToken");

// Models
const Admins = require("../../data/models/admins");
const Schools = require("../../data/models/schools");

// Middleware
const validateRegister = require("../middleware/validateRegister");
const validateLogin = require("../middleware/validateLogin");
const validateSchool = require("../middleware/validateSchool");

// POST to register new admin
router.post("/register", validateRegister, async (req, res) => {
  const admin = req.body;
  admin.password = bcrypt.hashSync(admin.password, 8);

  await Admins.insert(admin);

  const { username } = admin;
  const newUser = await Admins.getBy({ username });
  res.status(201).json(newUser);
});

// POST to login
router.post("/login", validateLogin, async (req, res) => {
  const userData = req.body;
  const user = await Admins.getBy({ username: userData.username });

  const token = generateToken(user);

  res.status(200).json({ user, token });
});

// GET all admins
router.get("/", async (req, res) => {
  try {
    const admins = await Admins.get();

    res.status(200).json(admins);
  } catch (error) {
    res.status(400).json({ message: "Could not get admins" });
  }
});

// POST to add new school to admin by ID
router.post("/:admin_id/school", validateSchool, async (req, res) => {
  const id = req.params.admin_id;
  const school = req.body;
  await Schools.insert({ ...school, admin_id: id });
  const newSchool = await Schools.getBy({ school_name: school.school_name });
  res.status(201).json(newSchool);
});

module.exports = router;
