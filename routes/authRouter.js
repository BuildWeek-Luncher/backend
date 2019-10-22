const express = require("express");
const router = express.Router();

// Models
const Admins = require("../data/models/admins");

// Middleware
const validateRegister = require("../routes/middleware/validateRegister");

router.post("/register", validateRegister, async (req, res) => {
  const admin = req.body;

  const newUser = await Admins.insert(admin);
  console.log(newUser);
  res.status(201).json(newUser);
});

router.get("/admins", async (req, res) => {
  const admins = await Admins.get();

  res.status(200).json(admins);
});

module.exports = router;
