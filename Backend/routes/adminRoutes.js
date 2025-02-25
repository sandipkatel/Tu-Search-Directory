// src/routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const pool = require("../utils/db"); // Your PostgreSQL connection config
// Generic error handler
const handleErrors = (res, error) => {
  console.error("Database error:", error);
  res.status(500).json({ error: "Internal server error" });
};

// Central Office Routes
router.get("/central-office", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM central_office");
    res.json(result.rows);
  } catch (error) {
    handleErrors(res, error);
  }
});

router.post("/central-office", async (req, res) => {
  const { name, address } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO central_office (name, address) VALUES ($1, $2) RETURNING *",
      [name, address]
    );
    res.json(result.rows[0]);
  } catch (error) {
    handleErrors(res, error);
  }
});

// Institute/Faculties Routes
router.get("/institute-faculties", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM institute_faculties");
    res.json(result.rows);
  } catch (error) {
    handleErrors(res, error);
  }
});

router.post("/institute-faculties", async (req, res) => {
  const { org_id, name } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO institute_faculties (org_id, name) VALUES ($1, $2) RETURNING *",
      [org_id, name]
    );
    res.json(result.rows[0]);
  } catch (error) {
    handleErrors(res, error);
  }
});

// Generic CRUD operations for all entities
const createEntityRoutes = (entityName, tableName) => {
  // GET all
  router.get(`/${entityName}`, async (req, res) => {
    try {
      const result = await pool.query(`SELECT * FROM ${tableName}`);
      res.json(result.rows);
    } catch (error) {
      handleErrors(res, error);
    }
  });

  // POST new
  router.post(`/${entityName}`, async (req, res) => {
    try {
      const columns = Object.keys(req.body).join(", ");
      const values = Object.keys(req.body)
        .map((_, i) => `$${i + 1}`)
        .join(", ");
      const query = `INSERT INTO ${tableName} (${columns}) VALUES (${values}) RETURNING *`;
      const result = await pool.query(query, Object.values(req.body));
      res.json(result.rows[0]);
    } catch (error) {
      handleErrors(res, error);
    }
  });

  // PUT update
  router.put(`/${entityName}/:id`, async (req, res) => {
    try {
      const updates = Object.keys(req.body)
        .map((key, i) => `${key} = $${i + 1}`)
        .join(", ");
      const query = `UPDATE ${tableName} SET ${updates} WHERE id = $${
        Object.keys(req.body).length + 1
      } RETURNING *`;
      const result = await pool.query(query, [
        ...Object.values(req.body),
        req.params.id,
      ]);
      res.json(result.rows[0]);
    } catch (error) {
      handleErrors(res, error);
    }
  });

  // DELETE
  router.delete(`/${entityName}/:id`, async (req, res) => {
    try {
      const result = await pool.query(
        `DELETE FROM ${tableName} WHERE id = $1 RETURNING *`,
        [req.params.id]
      );
      res.json(result.rows[0]);
    } catch (error) {
      handleErrors(res, error);
    }
  });
};

// Create routes for all entities
createEntityRoutes("central-department", "central_department");
createEntityRoutes("campus", "campus");
createEntityRoutes("department", "department");
createEntityRoutes("personnel", "personnel");
createEntityRoutes("program", "program");

module.exports = router;
