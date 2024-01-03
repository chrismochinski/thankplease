import { Pool } from "pg";
import express from "express";

const app = express();
const port = 3001;

app.get("/", (req, res) => res.send("Welcome to thankplease!"));

app.listen(port, () => console.log(`Server running on http://localhost:${port} wut it dooooooooo`));

const pool = new Pool({
  user: "chrismochinski",
  host: "localhost",
  database: "thankplease",
  port: 5432,
});

async function testQuery(queryText: string) {
  const client = await pool.connect();
  try {
    const res = await client.query(queryText);
    console.log(res.rows);
  } finally {
    client.release();
  }
}

testQuery("SELECT * FROM users WHERE id = $1");
