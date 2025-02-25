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
//   host: "2403:3800:3204:858:d1b:a13b:e4e5:8801",
//   port: "5432",
//   database: "tu_search_directory",
//   ssl: false,
// });

// module.exports = pool;
