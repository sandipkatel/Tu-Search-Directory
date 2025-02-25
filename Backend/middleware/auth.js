const jwt = require("jsonwebtoken");
const JWT_SECRET = "your-secret-key"; // Should be in environment variables

// Middleware to verify token
const verifyToken = (req, res, next) => {
  // Get token from header
  const authHeader = req.headers.authorization;
  // console.log("authheader", req.headers);
  const token = authHeader && authHeader.split(" ")[1];

  // Check if token exists
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Access denied. No token provided." });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid token." });
  }
};

// Middleware to check admin status
const isAdmin = (req, res, next) => {
  if (!req.user || req.user.isAdmin !== true) {
    return res.status(403).json({
      success: false,
      message: "Access denied. Admin privileges required.",
    });
  }
  next();
};

module.exports = { verifyToken, isAdmin };
