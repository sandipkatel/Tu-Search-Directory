import { NextApiRequest, NextApiResponse } from "next";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let db: mysql.Connection | null = null;

  try {
    db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT) || 3306,
    });

    if (req.method === "GET") {
      const sql = "SELECT * FROM USER_DATA";
      const [rows] = await db.execute(sql);
      res.status(200).json(rows);
    } else if (req.method === "POST") {
      const { name, email, password, dob } = req.body;
      if (!name || !email || !password || !dob) {
        return res.status(400).json({ error: "All fields are required" });
      }

      const sql = `
        INSERT INTO USER_DATA (USER_NAME, USER_EMAIL, USER_PASSWORD, USER_DOB, ISADMIN)
        VALUES (?, ?, ?, ?, false)
      `;
      const [result]: any = await db.execute(sql, [name, email, password, dob]);
      res.status(201).json({
        message: "User added successfully",
        userId: result.insertId,
      });
    } else if (req.method === "DELETE") {
      const { id } = req.query;
      if (!id || isNaN(Number(id))) {
        return res
          .status(400)
          .json({ error: `Valid user ID is required: ${id}` });
      }

      const sql = "DELETE FROM USER_DATA WHERE ID = ?";
      const [result]: any = await db.execute(sql, [id]);
      if (result.affectedRows > 0) {
        res.status(200).json({ message: "User deleted successfully" });
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } else {
      res.setHeader("Allow", ["GET", "POST", "DELETE"]);
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
