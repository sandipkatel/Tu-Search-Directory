const express = require("express");
const router = express.Router();
const pool = require("../utils/db");

const getTreeData = async () => {
  const client = await pool.connect();

  try {
    // Get central office (root node)
    const centralOfficeQuery =
      "SELECT org_id as id, name, address FROM central_office";
    const centralOfficeResult = await client.query(centralOfficeQuery);

    const treeData = [];

    // For each central office, build the tree
    for (const office of centralOfficeResult.rows) {
      const officeNode = {
        id: `co-${office.id}`,
        name: office.name,
        type: "Central Office",
        address: office.address,
        children: [],
      };

      // Get faculties for this central office
      const facultiesQuery =
        "SELECT id, name FROM institute_faculties WHERE org_id = $1";
      const facultiesResult = await client.query(facultiesQuery, [office.id]);

      for (const faculty of facultiesResult.rows) {
        const facultyNode = {
          id: `faculty-${faculty.id}`,
          name: faculty.name,
          type: "Faculty",
          children: [],
        };

        // Get campuses for this faculty
        const campusesQuery =
          "SELECT id, name, location, website FROM campus WHERE ho_id = $1";
        const campusesResult = await client.query(campusesQuery, [faculty.id]);

        for (const campus of campusesResult.rows) {
          const campusNode = {
            id: `campus-${campus.id}`,
            name: campus.name,
            type: "Campus",
            location: campus.location,
            website: campus.website,
            children: [],
          };

          // Get departments for this campus
          const deptsQuery =
            "SELECT id, name, contact FROM department WHERE c_id = $1";
          const deptsResult = await client.query(deptsQuery, [campus.id]);

          for (const dept of deptsResult.rows) {
            const deptNode = {
              id: `dept-${dept.id}`,
              name: dept.name,
              type: "Department",
              contact: dept.contact,
              children: [],
            };

            // Get personnel for this department
            const personnelQuery =
              "SELECT id, name, email, position FROM personnel WHERE dept_id = $1";
            const personnelResult = await client.query(personnelQuery, [
              dept.id,
            ]);

            for (const person of personnelResult.rows) {
              deptNode.children.push({
                id: `personnel-${person.id}`,
                name: person.name,
                type: "Personnel",
                email: person.email,
                position: person.position,
              });
            }

            campusNode.children.push(deptNode);
          }

          facultyNode.children.push(campusNode);
        }

        officeNode.children.push(facultyNode);
      }

      // Get central departments for this central office
      const centralDeptsQuery =
        "SELECT id, name, contact, location, website FROM central_department WHERE org_id = $1";
      const centralDeptsResult = await client.query(centralDeptsQuery, [
        office.id,
      ]);

      for (const cdept of centralDeptsResult.rows) {
        const cdeptNode = {
          id: `cdept-${cdept.id}`,
          name: cdept.name,
          type: "Central Department",
          contact: cdept.contact,
          location: cdept.location,
          website: cdept.website,
          children: [],
        };

        // Get personnel for this central department
        const personnelQuery =
          "SELECT id, name, email, position FROM personnel WHERE c_dept_id = $1";
        const personnelResult = await client.query(personnelQuery, [cdept.id]);

        for (const person of personnelResult.rows) {
          cdeptNode.children.push({
            id: `personnel-${person.id}`,
            name: person.name,
            type: "Personnel",
            email: person.email,
            position: person.position,
          });
        }

        // Add to office directly, not under a faculty
        officeNode.children.push(cdeptNode);
      }

      // Get programs with directors from this organization
      const programsQuery = `
            SELECT p.id, p.name, p.about, per.name as director_name, per.id as director_id 
            FROM program p
            JOIN personnel per ON p.director_id = per.id
            WHERE per.org_id = $1
          `;
      const programsResult = await client.query(programsQuery, [office.id]);

      if (programsResult.rows.length > 0) {
        const programsNode = {
          id: `programs-${office.id}`,
          name: "Programs",
          type: "Programs Group",
          children: [],
        };

        for (const program of programsResult.rows) {
          programsNode.children.push({
            id: `program-${program.id}`,
            name: program.name,
            type: "Program",
            about: program.about,
            director: program.director_name,
            director_id: program.director_id,
          });
        }

        officeNode.children.push(programsNode);
      }

      treeData.push(officeNode);
    }

    return treeData;
  } finally {
    client.release();
  }
};

router.get("/", async (req, res) => {
  try {
    const treeData = await getTreeData();
    console.log("Fetched tree data:", treeData);
    res.json(treeData);
  } catch (error) {
    console.error("Error fetching tree data:", error);
    res.status(500).json({ error: "Failed to fetch tree data" });
  }
});

module.exports = router;
