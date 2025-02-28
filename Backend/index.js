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

//routes
app.use("/search", searchRoutes);
app.use("/auth", authRoutes);
app.use("/api", adminRoutes);
app.use("/navigate", navigateRoutes);
app.use("/tree", treeRoutes);
app.listen(5000, () => {
  console.log("Server started on port 5000");
});
