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
const authenticate = require("../middleware/authenticate");

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
  const admin = await Admins.getBy({ username: userData.username });

  const token = generateToken(admin);

  res.status(200).json({ admin, token });
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

// GET admin by ID
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const [admin] = await Admins.get(id);
    if (!admin) {
      res
        .status(400)
        .json({ message: "Admin with specified ID does not exist" });
    } else {
      res.status(200).json(admin);
    }
  } catch (error) {
    res.status(400).json({ message: "Could not find admin with specified ID" });
  }
});

// POST to add new school to admin by ID
router.post("/:id/school", authenticate, validateSchool, async (req, res) => {
  const id = req.params.id;
  const school = req.body;
  try {
    await Schools.insert({ ...school, admin_id: id });
    const newSchool = await Schools.getBy({ school_name: school.school_name });
    res.status(201).json(newSchool);
  } catch (error) {
    res.status(400).json({ message: "Failed to add school" });
  }
});

// PUT to update admin by ID
router.put("/:id", authenticate, async (req, res) => {
  const id = req.params.id;
  const changes = req.body;

  try {
    const admin = await Admins.update(id, changes);
    res.status(200).json(admin);
  } catch (error) {}
});

// DELETE admin by ID

router.delete("/:id", authenticate, async (req, res) => {
  const id = req.params.id;
  try {
    await Admins.remove(id);
    res
      .status(200)
      .json({ message: "Admin account has been successfully deleted" });
  } catch (error) {
    res.status(400).json({ message: "Could not delete account" });
  }
});

module.exports = router;
