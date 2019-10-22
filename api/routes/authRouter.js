const express = require("express");
const router = express.Router();

// Auth Utilities
const bcrypt = require("bcrypt");
const generateToken = require("../generateToken");

// Models
const Admins = require("../../data/models/admins");

// Middleware
const validateRegister = require("../middleware/validateRegister");
const validateLogin = require("../middleware/validateLogin");

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
router.get("/admins", async (req, res) => {
  const admins = await Admins.get();

  res.status(200).json(admins);
});

module.exports = router;
