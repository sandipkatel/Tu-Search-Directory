const express = require("express");
const router = express.Router();
const pool = require("../utils/db");

router.get("/", async (req, res) => {
  try {
    const { query } = req.query;
    if (!query || query.trim() === "") {
      return res.json({ results: [] });
    }

    // Create a comprehensive search query that searches across multiple tables
    const searchQuery = `
        WITH personnel_results AS (
          SELECT 
            p.id, 
            p.name, 
            p.email, 
            p.position, 
            p.imageUrl,
            'personnel' AS type,
            CASE
              WHEN o.name IS NOT NULL THEN o.name
              WHEN f.name IS NOT NULL THEN f.name
              WHEN c.name IS NOT NULL THEN c.name
              WHEN d.name IS NOT NULL THEN d.name
              WHEN cd.name IS NOT NULL THEN cd.name
              ELSE NULL
            END AS affiliation
          FROM personnel p
          LEFT JOIN central_office o ON p.org_id = o.org_id
          LEFT JOIN institute_faculties f ON p.faculty_id = f.id
          LEFT JOIN campus c ON p.campus_id = c.id
          LEFT JOIN department d ON p.dept_id = d.id
          LEFT JOIN central_department cd ON p.c_dept_id = cd.id
          WHERE 
            p.name ILIKE $1 OR
            p.email ILIKE $1 OR
            p.position ILIKE $1
        ),
        department_results AS (
          SELECT 
            id,
            name,
            contact,
            'department' AS type,
            (SELECT c.name FROM campus c WHERE c.id = d.c_id) AS affiliation
          FROM department d
          WHERE name ILIKE $1 OR contact ILIKE $1
        ),
        central_dept_results AS (
          SELECT 
            id,
            name,
            contact,
            website,
            'central_department' AS type,
            (SELECT o.name FROM central_office o WHERE o.org_id = cd.org_id) AS affiliation
          FROM central_department cd
          WHERE name ILIKE $1 OR contact ILIKE $1 OR website ILIKE $1
        ),
        campus_results AS (
          SELECT 
            id,
            name,
            location,
            website,
            'campus' AS type,
            (SELECT f.name FROM institute_faculties f WHERE f.id = c.ho_id) AS affiliation
          FROM campus c
          WHERE name ILIKE $1 OR location ILIKE $1 OR website ILIKE $1
        ),
        faculty_results AS (
          SELECT 
            id,
            name,
            'faculty' AS type,
            (SELECT o.name FROM central_office o WHERE o.org_id = f.org_id) AS affiliation
          FROM institute_faculties f
          WHERE name ILIKE $1
        ),
        program_results AS (
          SELECT 
            p.id,
            p.name,
            p.about,
            'program' AS type,
            per.name AS affiliation
          FROM program p
          LEFT JOIN personnel per ON p.director_id = per.id
          WHERE p.name ILIKE $1 OR p.about ILIKE $1
        )
          SELECT * FROM personnel_results
        UNION ALL
        SELECT id, name, null AS email, contact AS position, null AS imageUrl, type, affiliation FROM department_results
        UNION ALL
        SELECT id, name, website AS email, contact AS position, null AS imageUrl, type, affiliation FROM central_dept_results
        UNION ALL
        SELECT id, name, website AS email, location AS position, null AS imageUrl, type, affiliation FROM campus_results
        UNION ALL
        SELECT id, name, null AS email, null AS position, null AS imageUrl, type, affiliation FROM faculty_results
        UNION ALL
        SELECT id, name, about AS email, null AS position, null AS imageUrl, type, affiliation FROM program_results
        ORDER BY type, name
        LIMIT 50;

        `;
    console.log(query);
    const results = await pool.query(searchQuery, [`%${query}%`]);
    res.json({ results: results.rows });
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ error: "An error occurred during search" });
  }
});
module.exports = router;
