import { Pool } from "pg";
import express from "express";

interface TransactionRequest {
  ticker: string;
  quantity: string;
  isNewTotal: boolean;
  dateOfTransaction: string;
  timeOfTransaction: string;
  timeZoneOfTransaction: string;
}

const app = express();
const port = 3001;

app.get("/", (req, res) => res.send("Welcome to thankplease!"));
app.use(express.json());
app.listen(port, () => console.log(`Server running on http://localhost:${port} wut it dooooooooo`));

const pool = new Pool({
  user: "chrismochinski",
  host: "localhost",
  database: "thankplease",
  port: 5432,
});

app.post("/api/transactions", async (req: express.Request, res: express.Response) => {
  const { ticker, quantity, isNewTotal }: TransactionRequest = req.body;

  try {
    const totalHolding = parseFloat(quantity);
    // Use isNewTotal to determine whether to add or replace the total holding
    await addOrUpdateAsset(ticker, totalHolding, isNewTotal);
    res.json({ message: "Transaction recorded successfully." });
  } catch (error) {
    console.error("Heckin' Error!:", error);
    res.status(500).json({ error: "*insert Dennis Nedry finger waggle*" });
  }
});

async function addOrUpdateAsset(ticker: string, totalHolding: number, isNewTotal: boolean) {
  const client = await pool.connect();

  try {
    const checkRes = await client.query("SELECT * FROM user_assets WHERE ticker = $1", [ticker]);
    if (checkRes.rows.length > 0) {
      const currentTotalHolding = parseFloat(checkRes.rows[0].total_holding);
      const newTotalHolding = isNewTotal ? totalHolding : currentTotalHolding + totalHolding;
      await client.query("UPDATE user_assets SET total_holding = $1 WHERE ticker = $2", [
        newTotalHolding,
        ticker,
      ]);
    } else {
      await client.query("INSERT INTO user_assets (ticker, total_holding) VALUES ($1, $2)", [
        ticker,
        totalHolding,
      ]);
    }
  } catch (error) {
    console.error("Error in addOrUpdateAsset:", error);
    throw error; // rethrow the error for proper error handling in the route
  } finally {
    client.release();
  }
}
