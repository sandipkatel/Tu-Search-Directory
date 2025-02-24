const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { path } = req.body; // get the path from request body
    res.json({
      success: true,
      message: "Navigating",
      redirect: path, // send back the path for redirection
    });
  } catch (error) {
    console.error("Navigation error:", error);
    res
      .status(500)
      .json({ success: false, message: "Error processing request" });
  }
});

module.exports = router;
