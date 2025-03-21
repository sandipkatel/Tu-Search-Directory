// const Pool = require("pg").Pool;
// const pool = new Pool({
//   user: "postgres",
//   password: "8910",
//   host: "localhost",
//   port: "5432",
//   database: "tu_search_directory",
// });

// module.exports = pool;

// const Pool = require("pg").Pool;
// const pool = new Pool({
//   user: "postgres",
//   password: "1234",
//   host: "2403:3800:3204:16bc:a8ef:fbd7:bbb2:bfd",
//   port: "5432",
//   database: "tu_search_directory",
//   ssl: false,
// });

// module.exports = pool;

const Pool = require("pg").Pool;
const pool = new Pool({
  connectionString: process.env.DBMS_URL,
    ssl: {
    rejectUnauthorized: true
  }
});

module.exports = pool;