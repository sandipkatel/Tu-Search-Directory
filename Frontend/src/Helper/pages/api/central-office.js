import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

export default async function handler(req, res) {
  let db = null;

  try {
    db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT) || 3306,
    });

    if (req.method === "GET") {
      // Fetch all CENTRAL_OFFICE records
      const sql = "SELECT * FROM CENTRAL_OFFICE";
      const [rows] = await db.execute(sql);
      res.status(200).json(rows);
    } else if (req.method === "POST") {
      // Create a new CENTRAL_OFFICE record
      const { NAME, ADDRESS } = req.body;
      if (!NAME || !ADDRESS) {
        return res.status(400).json({ error: "All fields are required" });
      }

      const sql = `
        INSERT INTO CENTRAL_OFFICE (NAME, ADDRESS)
        VALUES (?, ?)
      `;
      const [result] = await db.execute(sql, [NAME, ADDRESS]);
      res.status(201).json({
        message: "Central Office added successfully",
        officeId: result.insertId,
      });
    } else if (req.method === "PUT") {
      // Update an existing CENTRAL_OFFICE record
      const { ID, NAME, ADDRESS } = req.body;
      if (!ID || !NAME || !ADDRESS) {
        return res.status(400).json({ error: "All fields are required" });
      }

      const sql = `
        UPDATE CENTRAL_OFFICE
        SET NAME = ?, ADDRESS = ?
        WHERE ORG_ID = ?
      `;
      const [result] = await db.execute(sql, [NAME, ADDRESS, ID]);

      if (result.affectedRows > 0) {
        res
          .status(200)
          .json({ message: "Central Office updated successfully" });
      } else {
        res.status(404).json({ error: "Central Office not found" });
      }
    } else if (req.method === "DELETE") {
      // Delete a CENTRAL_OFFICE record
      const { ID } = req.query;
      if (!ID || isNaN(Number(ID))) {
        return res.status(400).json({ error: "Valid OFFICE_ID is required" });
      }

      const sql = "DELETE FROM CENTRAL_OFFICE WHERE OFFICE_ID = ?";
      const [result] = await db.execute(sql, [ID]);

      if (result.affectedRows > 0) {
        res
          .status(200)
          .json({ message: "Central Office deleted successfully" });
      } else {
        res.status(404).json({ error: "Central Office not found" });
      }
    } else {
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).json({ error: `Method ${req.method} not allowed` });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: err instanceof Error ? err.message : "Unknown error" });
  } finally {
    if (db) await db.end();
  }
}
