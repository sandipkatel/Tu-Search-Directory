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
    const results = await pool.query(searchQuery, [`%${query}%`]);
    res.json({ results: results.rows });
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ error: "An error occurred during search" });
  }
});

// New endpoint to fetch hierarchical data for a specific entity
router.get("/hierarchy", async (req, res) => {
  try {
    const { type, id } = req.query;

    if (!type || !id) {
      return res.status(400).json({ error: "Type and ID are required" });
    }

    let hierarchyData = {};

    // Different query based on entity type
    switch (type) {
      case "personnel":
        const personnelQuery = `
          SELECT 
            p.*,
            co.org_id as central_office_id, 
            co.name as central_office_name,
            co.address as central_office_address,
            
            if.id as faculty_id,
            if.name as faculty_name,
            
            cd.id as central_dept_id,
            cd.name as central_dept_name,
            cd.contact as central_dept_contact,
            cd.location as central_dept_location,
            
            c.id as campus_id,
            c.name as campus_name,
            c.location as campus_location,
            
            d.id as dept_id,
            d.name as dept_name,
            d.contact as dept_contact
          FROM personnel p
          LEFT JOIN central_office co ON p.org_id = co.org_id
          LEFT JOIN institute_faculties if ON p.faculty_id = if.id
          LEFT JOIN central_department cd ON p.c_dept_id = cd.id
          LEFT JOIN campus c ON p.campus_id = c.id
          LEFT JOIN department d ON p.dept_id = d.id
          WHERE p.id = $1
        `;

        const personnelResult = await pool.query(personnelQuery, [id]);

        if (personnelResult.rows.length > 0) {
          const data = personnelResult.rows[0];

          // Build hierarchy object
          hierarchyData = {
            personnel: {
              id: data.id,
              name: data.name,
              email: data.email,
              position: data.position,
            },
          };

          // Add parent relationships if they exist
          if (data.central_office_id) {
            hierarchyData.central_office = {
              id: data.central_office_id,
              name: data.central_office_name,
              address: data.central_office_address,
            };
          }

          if (data.faculty_id) {
            hierarchyData.faculty = {
              id: data.faculty_id,
              name: data.faculty_name,
            };
          }

          if (data.central_dept_id) {
            hierarchyData.central_department = {
              id: data.central_dept_id,
              name: data.central_dept_name,
              contact: data.central_dept_contact,
              location: data.central_dept_location,
            };
          }

          if (data.campus_id) {
            hierarchyData.campus = {
              id: data.campus_id,
              name: data.campus_name,
              location: data.campus_location,
            };
          }

          if (data.dept_id) {
            hierarchyData.department = {
              id: data.dept_id,
              name: data.dept_name,
              contact: data.dept_contact,
            };
          }
        }
        break;

      case "department":
        const departmentQuery = `
          SELECT 
            d.*,
            c.id as campus_id, 
            c.name as campus_name,
            c.location as campus_location,
            
            if.id as faculty_id,
            if.name as faculty_name,
            
            co.org_id as central_office_id,
            co.name as central_office_name
          FROM department d
          JOIN campus c ON d.c_id = c.id
          JOIN institute_faculties if ON c.ho_id = if.id
          JOIN central_office co ON if.org_id = co.org_id
          WHERE d.id = $1
        `;

        const departmentResult = await pool.query(departmentQuery, [id]);

        if (departmentResult.rows.length > 0) {
          const data = departmentResult.rows[0];

          hierarchyData = {
            department: {
              id: data.id,
              name: data.name,
              contact: data.contact,
            },
            campus: {
              id: data.campus_id,
              name: data.campus_name,
              location: data.campus_location,
            },
            faculty: {
              id: data.faculty_id,
              name: data.faculty_name,
            },
            central_office: {
              id: data.central_office_id,
              name: data.central_office_name,
            },
          };
        }
        break;

      case "central_department":
        const centralDeptQuery = `
          SELECT 
            cd.*,
            co.org_id as central_office_id,
            co.name as central_office_name
          FROM central_department cd
          JOIN central_office co ON cd.org_id = co.org_id
          WHERE cd.id = $1
        `;

        const centralDeptResult = await pool.query(centralDeptQuery, [id]);

        if (centralDeptResult.rows.length > 0) {
          const data = centralDeptResult.rows[0];

          hierarchyData = {
            central_department: {
              id: data.id,
              name: data.name,
              contact: data.contact,
              location: data.location,
            },
            central_office: {
              id: data.central_office_id,
              name: data.central_office_name,
            },
          };
        }
        break;

      case "campus":
        const campusQuery = `
          SELECT 
            c.*,
            if.id as faculty_id,
            if.name as faculty_name,
            
            co.org_id as central_office_id,
            co.name as central_office_name
          FROM campus c
          JOIN institute_faculties if ON c.ho_id = if.id
          JOIN central_office co ON if.org_id = co.org_id
          WHERE c.id = $1
        `;

        const campusResult = await pool.query(campusQuery, [id]);

        if (campusResult.rows.length > 0) {
          const data = campusResult.rows[0];

          hierarchyData = {
            campus: {
              id: data.id,
              name: data.name,
              location: data.location,
            },
            faculty: {
              id: data.faculty_id,
              name: data.faculty_name,
            },
            central_office: {
              id: data.central_office_id,
              name: data.central_office_name,
            },
          };
        }
        break;

      case "faculty":
        const facultyQuery = `
          SELECT 
            if.*,
            co.org_id as central_office_id,
            co.name as central_office_name
          FROM institute_faculties if
          JOIN central_office co ON if.org_id = co.org_id
          WHERE if.id = $1
        `;

        const facultyResult = await pool.query(facultyQuery, [id]);

        if (facultyResult.rows.length > 0) {
          const data = facultyResult.rows[0];

          hierarchyData = {
            faculty: {
              id: data.id,
              name: data.name,
            },
            central_office: {
              id: data.central_office_id,
              name: data.central_office_name,
            },
          };
        }
        break;

      case "program":
        const programQuery = `
          SELECT 
            p.*,
            per.id as director_id,
            per.name as director_name,
            per.faculty_id,
            per.campus_id,
            per.dept_id,
            
            f.name as faculty_name,
            c.name as campus_name,
            d.name as dept_name,
            
            co.org_id as central_office_id,
            co.name as central_office_name
          FROM program p
          LEFT JOIN personnel per ON p.director_id = per.id
          LEFT JOIN institute_faculties f ON per.faculty_id = f.id
          LEFT JOIN campus c ON per.campus_id = c.id
          LEFT JOIN department d ON per.dept_id = d.id
          LEFT JOIN central_office co ON f.org_id = co.org_id
          WHERE p.id = $1
        `;

        const programResult = await pool.query(programQuery, [id]);

        if (programResult.rows.length > 0) {
          const data = programResult.rows[0];

          hierarchyData = {
            program: {
              id: data.id,
              name: data.name,
              about: data.about,
            },
          };

          if (data.director_id) {
            hierarchyData.personnel = {
              id: data.director_id,
              name: data.director_name,
            };

            if (data.faculty_id) {
              hierarchyData.faculty = {
                id: data.faculty_id,
                name: data.faculty_name,
              };
            }

            if (data.campus_id) {
              hierarchyData.campus = {
                id: data.campus_id,
                name: data.campus_name,
              };
            }

            if (data.dept_id) {
              hierarchyData.department = {
                id: data.dept_id,
                name: data.dept_name,
              };
            }

            if (data.central_office_id) {
              hierarchyData.central_office = {
                id: data.central_office_id,
                name: data.central_office_name,
              };
            }
          }
        }
        break;

      default:
        return res.status(400).json({ error: "Invalid entity type" });
    }

    res.json({ hierarchy: hierarchyData });
  } catch (error) {
    console.error("Hierarchy error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching hierarchy data" });
  }
});

module.exports = router;
