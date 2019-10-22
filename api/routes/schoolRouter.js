const express = require("express");
const router = express.Router();

const Schools = require("../../data/models/schools");

router.get("/schools", async (req, res) => {
  try {
    const schools = await Schools.get();
    res.status(200).json(schools);
  } catch (error) {
    res.status(400).json({ message: "Could not get schools" });
  }
});

module.exports = router;
