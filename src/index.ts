import { Pool } from "pg";
import express from "express";
import cors from "cors";

interface TransactionRequest {
  ticker: string;
  quantity: string;
  isNewTotal: boolean;
  dateOfTransaction: string;
  timeOfTransaction: string;
  timeZoneOfTransaction: string;
}

const app = express();
app.use(cors()); // Enable CORS for all routes
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
  const {
    ticker,
    quantity,
    isNewTotal,
    dateOfTransaction,
    timeOfTransaction,
    timeZoneOfTransaction,
  }: TransactionRequest = req.body;

  try {
    const totalHolding = parseFloat(quantity);
    // Use isNewTotal to determine whether to add or replace the total holding
    await addOrUpdateAsset(
      ticker,
      totalHolding,
      isNewTotal,
      dateOfTransaction,
      timeOfTransaction,
      timeZoneOfTransaction
    );
    res.json({ message: "Transaction recorded successfully." });
  } catch (error) {
    console.error("Heckin' Error!:", error);
    res.status(500).json({ error: "*insert Dennis Nedry finger waggle*" });
  }
});


async function addOrUpdateAsset(
  ticker: string,
  totalHolding: number,
  isNewTotal: boolean,
  dateOfTransaction: string,
  timeOfTransaction: string,
  timeZoneOfTransaction: string
) {
  const client = await pool.connect();

  try {
    const checkRes = await client.query("SELECT * FROM user_assets WHERE ticker = $1", [ticker]);
    if (checkRes.rows.length > 0) {
      // If isNewTotal is true, replace the current total with the new value
      // Otherwise, add the new amount to the existing total
      const currentTotalHolding = parseFloat(checkRes.rows[0].total_holding);
      const newTotalHolding = isNewTotal ? currentTotalHolding + totalHolding : totalHolding;

      await client.query(
        "UPDATE user_assets SET total_holding = $1, date_of_transaction = $2, time_of_transaction = $3, timezone = $4 WHERE ticker = $5",
        [newTotalHolding, dateOfTransaction, timeOfTransaction, timeZoneOfTransaction, ticker]
      );
    } else {
      await client.query(
        "INSERT INTO user_assets (ticker, total_holding, date_of_transaction, time_of_transaction, timezone) VALUES ($1, $2, $3, $4, $5)",
        [ticker, totalHolding, dateOfTransaction, timeOfTransaction, timeZoneOfTransaction]
      );
    }
    console.log("Successfully added or updated asset:", ticker);
    console.log("Total holding:", totalHolding);
    console.log("Date of transaction:", dateOfTransaction);
    console.log("Time of transaction:", timeOfTransaction);
    console.log("Timezone of transaction:", timeZoneOfTransaction);
  } catch (error) {
    console.error("Error in addOrUpdateAsset:", error);
    throw error;
  } finally {
    client.release();
  }
}
