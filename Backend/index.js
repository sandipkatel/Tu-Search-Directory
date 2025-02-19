const express = require("express");
const app = express();
const cors = require("cors");
const searchRoutes = require("./routes/searchRoutes");
const pool = require("./utils/db");

//middleware
app.use(cors());
app.use(express.json());

//routes
app.use("/search", searchRoutes);
app.listen(5000, () => {
  console.log("Server started on port 5000");
});
