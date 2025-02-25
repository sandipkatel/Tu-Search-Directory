const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  password: "1234",
  host: "localhost",
  port: "5432",
  database: "tu_search_directory",
});

module.exports = pool;

// const Pool = require("pg").Pool;
// const pool = new Pool({
//   user: "postgres",
//   password: "1234",
//   host: "2403:3800:3204:858:402b:9d1f:b5b5:6eb3",
//   port: "5432",
//   database: "tu_search_directory",
//   ssl: false,
// });

// module.exports = pool;
