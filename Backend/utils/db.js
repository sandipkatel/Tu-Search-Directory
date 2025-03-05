// const Pool = require("pg").Pool;
// const pool = new Pool({
//   user: "postgres",
//   password: "8910",
//   host: "localhost",
//   port: "5432",
//   database: "tu_search_directory",
// });

// module.exports = pool;

const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  password: "1234",
  host: "2403:3800:3204:16e3:e917:6772:faba:fc5",
  port: "5432",
  database: "tu_search_directory",
  ssl: false,
});

module.exports = pool;
