const express = require("express");
const router = express.Router();
const pool = require("../utils/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // Add JWT package

// JWT secret key - should be in environment variables in production
const JWT_SECRET = "your-secret-key";

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

// Middleware to check admin status
const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({
      success: false,
      message: "Access denied. Admin rights required.",
    });
  }
  next();
};

router.post("/login", async (req, res) => {
  const { Email, Password } = req.body;

  try {
    // Check if user exists
    const userQuery = "SELECT * FROM users WHERE email = $1";
    const userResult = await pool.query(userQuery, [Email]);

    if (userResult.rows.length === 0) {
      return res.json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const user = userResult.rows[0];

    // Compare password
    const isMatch = await bcrypt.compare(Password, user.password);

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        isAdmin: user.isadmin,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Return response with token
    res.json({
      success: true,
      message: "Login successful",
      token,
      redirect: user.isadmin ? "/admin/dashboard" : "/",
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.post("/signup", async (req, res) => {
  const { Email, Password } = req.body;

  try {
    // Check if email already exists
    const emailQuery = "SELECT * FROM users WHERE email = $1";
    const emailResult = await pool.query(emailQuery, [Email]);

    if (emailResult.rows.length > 0) {
      return res.json({
        success: false,
        message: "Email already exists",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(Password, 10);

    // Insert new user into the database
    const insertQuery =
      "INSERT INTO users (email, password, isadmin) VALUES ($1, $2, $3) RETURNING *";
    const isAdmin = Email === "admin@example.com";
    const newUserResult = await pool.query(insertQuery, [
      Email,
      hashedPassword,
      isAdmin,
    ]);

    const newUser = newUserResult.rows[0];

    // Generate JWT token for new user
    const token = jwt.sign(
      {
        userId: newUser.id,
        email: newUser.email,
        isAdmin: newUser.isadmin,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      success: true,
      message: "Signup successful",
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        isadmin: newUser.isadmin,
      },
      redirect: isAdmin ? "/admin/dashboard" : "/",
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

// Protected route example for admin dashboard
router.get("/admin/dashboard", verifyToken, isAdmin, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to admin dashboard",
    user: req.user,
  });
});

module.exports = router;
