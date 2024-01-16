import express from "express";
import { request } from "http";
import { Pool } from "pg";

interface NewUserAssetRequest {
  user: string;
  ticker: string;
  quantity: number;
  isNewTotal: boolean;
  transactionType: string;
  dateOfTransaction: string;
  timeOfTransaction: string;
  timeZoneOfTransaction: string;
  transactionNotes: string;
}

// Initialize the router
const router = express.Router();

// Create a new PostgreSQL pool
const pool = new Pool({
  user: "chrismochinski",
  host: "localhost",
  database: "thankplease",
  port: 5432,
});



async function addNewUserAsset(ticker: string, quantity: number, user: number) {
  const client = await pool.connect();
  try {
    const checkRes = await client.query(
      "SELECT * FROM user_assets WHERE ticker = $1 AND user_id = $2", //revisit ERROR? UPDATE?
      [ticker, user]
    );
    if (checkRes.rows.length > 0) {
      await client.query(
        "UPDATE user_assets SET total_holding = $1 WHERE ticker = $2 AND user_id = $3",
        [quantity, ticker, user]
      );
    } else {
      await client.query(
        "INSERT INTO user_assets (user_id, ticker, total_holding) VALUES ($1, $2, $3)",
        [user, ticker, quantity]
      );
    }
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}

async function recordTransaction(requestData: NewUserAssetRequest, user: number) {
  const client = await pool.connect();
  try {
    console.log('requestData.notes', requestData.transactionNotes)
    await client.query(
      `
      INSERT INTO user_transactions 
      (user_id, transaction_ticker, transaction_quantity, transaction_is_new_total, transaction_type, transaction_date_time, transaction_time_zone, notes) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        user,
        requestData.ticker,
        requestData.quantity,
        requestData.isNewTotal,
        requestData.transactionType,
        new Date(`${requestData.dateOfTransaction} ${requestData.timeOfTransaction}`),
        requestData.timeZoneOfTransaction,
        requestData.transactionNotes,
      ]
    );
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}

/**
 * 
 */
router.post("/add-asset", async (req, res) => {
  const requestData: NewUserAssetRequest = req.body;

  try {
    const userRes = await pool.query("SELECT id FROM users WHERE username = $1", [requestData.user]);
    console.log('request data user', requestData)
    if (userRes.rows.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }
    const user = userRes.rows[0].id;

    await recordTransaction(requestData, user);
    await addNewUserAsset(requestData.ticker, requestData.quantity, user);

    res.json({ message: "Transaction and asset record updated successfully." });
  } catch (error) {
    console.error("Error in transaction route:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;