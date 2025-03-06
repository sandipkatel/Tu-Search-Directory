const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  password: "sijan123",
  host: "localhost",
  port: "5432",
  database: "tu_search_directory",
});

module.exports = pool;

// const Pool = require("pg").Pool;
// const pool = new Pool({
//   user: "postgres",
//   password: "1234",
//   host: "2403:3800:3204:16bc:ecf5:70b:9ba5:b9d6",
//   port: "5432",
//   database: "tu_search_directory",
//   ssl: false,
// });

// module.exports = pool;
