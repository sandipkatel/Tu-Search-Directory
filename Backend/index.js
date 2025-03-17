// Load env variables
require('dotenv').config();

const express = require("express");
const app = express();
const cors = require("cors");
const searchRoutes = require("./routes/searchRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const navigateRoutes = require("./routes/navigateRoutes");
const treeRoutes = require("./routes/treeRoutes");

//middleware
app.use(cors());
app.use(express.json());

// Route for the root path
app.get('/', (req, res) => {
  res.send('TU Search Directory API is running');
});

//routes
app.use("/api/search", searchRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", adminRoutes);
app.use("/api/navigate", navigateRoutes);
app.use("/api/tree", treeRoutes);


// Start server (works for both local and Vercel)
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
}


// Export for Vercel Production Server
module.exports = app;
