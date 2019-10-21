const express = require("express");
const router = express.Router();

router.get("/users", async (req, res) => {
  res.status(200).json({ message: "user router running" });
});

module.exports = router;
