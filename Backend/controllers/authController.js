const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../utils/db");

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

// Admin Signup Controller
const signup = async (req, res) => {
  const { name, username, email, contact, password, profilePicURL } = req.body;

  // Validation
  if (!name || !username || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please provide all required fields",
    });
  }

  try {
    // Check if email or username already exists
    const userCheck = await pool.query(
      "SELECT * FROM admins WHERE email = $1 OR username = $2",
      [email, username]
    );

    if (userCheck.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Email or username already in use",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert new admin
    const result = await pool.query(
      `INSERT INTO admins (name, username, email, contact, password, profile_pic_url) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING id, name, username, email, contact, profile_pic_url, is_admin`,
      [name, username, email, contact, hashedPassword, profilePicURL]
    );

    const admin = result.rows[0];

    // Generate JWT token
    const token = jwt.sign(
      { id: admin.id, email: admin.email, isAdmin: admin.is_admin },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(201).json({
      success: true,
      message: "Admin account created successfully",
      admin: { ...admin, token },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during registration",
    });
  }
};

// Admin Login Controller
const login = async (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please provide email and password",
    });
  }

  try {
    // Find admin by email
    const result = await pool.query("SELECT * FROM admins WHERE email = $1", [
      email,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const admin = result.rows[0];

    // Verify password
    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Remove password from admin object
    const { password: pwd, ...adminData } = admin;

    // Generate JWT token
    const token = jwt.sign(
      { id: admin.id, email: admin.email, isAdmin: admin.is_admin },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      admin: { ...adminData, token },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
};

// Get Admin Profile Controller
const getProfile = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, username, email, contact, profile_pic_url, is_admin FROM admins WHERE id = $1",
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    res.status(200).json({
      success: true,
      admin: result.rows[0],
    });
  } catch (error) {
    console.error("Profile fetch error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching profile",
    });
  }
};

module.exports = {
  signup,
  login,
  getProfile,
};
