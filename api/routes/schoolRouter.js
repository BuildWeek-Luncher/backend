const express = require("express");
const router = express.Router();

const Schools = require("../../data/models/schools");

// middleware
const validateSchool = require("../middleware/validateSchool");
const authenticate = require("../middleware/authenticate");

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

// POST to make a donation
router.post("/:id", async (req, res) => {
  const id = req.params.id;
  const { donation } = req.body;
  if (!donation) {
    res.status(400).json({ message: "Please provide a donation amount" });
  } else {
    const [fundsRaised] = await Schools.addFunds(id, donation);
    res.status(200).json(fundsRaised);
  }
});

// PUT to edit school by admin ID
router.put("/:id", authenticate, async (req, res) => {
  const id = req.params.id;
  const changes = req.body;

  if (changes.funds_raised || changes.id || changes.admin_id) {
    res.status(400).json({ message: "Not allowed to edit this information" });
  } else {
    try {
      const oldSchool = await Schools.getBy({ admin_id: id });
      await Schools.update(id, changes);
      const newSchool = await Schools.getBy({ admin_id: id });
      res.status(200).json({ was: oldSchool, now: newSchool });
    } catch (error) {
      res
        .status(400)
        .json({ message: "Could not update school with specified ID" });
    }
  }
});

// DELETE to delete school by admin ID
router.delete("/:id", authenticate, async (req, res) => {
  const id = req.params.id;
  try {
    const school = await Schools.getBy({ admin_id: id });
    await Schools.remove(school.admin_id);
    res.status(200).json({ message: "School was sucessfully deleted" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "School with admin ID could not be deleted" });
  }
});

module.exports = router;
