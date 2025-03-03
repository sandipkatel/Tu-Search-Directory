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
//   host: "2403:3800:3204:114b:24fe:475a:390e:5d0b",
//   port: "5432",
//   database: "tu_search_directory",
//   ssl: false,
// });

// module.exports = pool;
