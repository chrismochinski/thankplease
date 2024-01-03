import { Pool } from "pg";
import express from "express";
import test from "node:test";

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

async function addOrUpdateAsset(ticker: string, totalHolding: number = 0) {
  const client = await pool.connect();

  try {
    // Check if the asset already exists
    const checkRes = await client.query("SELECT * FROM user_assets WHERE ticker = $1", [ticker]);

    if (checkRes.rows.length > 0) {
      // Asset exists, update its total_holding by adding the new amount
      const currentTotalHolding = parseFloat(checkRes.rows[0].total_holding);
      const newTotalHolding = currentTotalHolding + totalHolding;
      await client.query("UPDATE user_assets SET total_holding = $1 WHERE ticker = $2", [
        newTotalHolding,
        ticker,
      ]);
    } else {
      // Asset does not exist, insert it with the provided total_holding (default 0)
      await client.query("INSERT INTO user_assets (ticker, total_holding) VALUES ($1, $2)", [
        ticker,
        totalHolding,
      ]);
    }
  } catch (error) {
    console.error("Error in addOrUpdateAsset:", error);
  } finally {
    client.release();
  }
}

addOrUpdateAsset("HNT", 32);
