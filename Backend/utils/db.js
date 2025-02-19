const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  password: "sijan123",
  host: "localhost",
  port: "5432",
  database: "tu_search_directory",
});

module.exports = pool;
