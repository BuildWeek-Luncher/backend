const express = require("express");
const router = express.Router();

const Schools = require("../../data/models/schools");

// middleware
const validateSchool = require("../middleware/validateSchool");

// GET all schools
router.get("/", async (req, res) => {
  try {
    const schools = await Schools.get();
    res.status(200).json(schools);
  } catch (error) {
    res.status(400).json({ message: "Could not get schools" });
  }
});

// GET school by ID
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const school = await Schools.get(id);

  if (!school) {
    res
      .status(400)
      .json({ message: "School with specified ID does not exist" });
  } else {
    res.status(200).json(school);
  }
});

// PUT to update school
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { donation } = req.body;
  if (!donation) {
    res.status(400).json({ message: "Please provide a donation amount" });
  } else {
    const [fundsRaised] = await Schools.addFunds(id, donation);
    res.status(200).json(fundsRaised);
  }
});

module.exports = router;
