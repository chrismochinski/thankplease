import express from "express";
import axios from "axios";
import { Pool } from "pg";

interface TransactionRequest {
    ticker: string;
    quantity: string;
    isNewTotal: boolean;
    dateOfTransaction: string;
    timeOfTransaction: string;
    timeZoneOfTransaction: string;
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


// Async function to handle asset updates or inserts
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

/**
 * POST /api/transactions
 * @param {string} ticker - The ticker symbol of the asset
 * @param {string} quantity - The total amount of the asset held
 * @param {boolean} isNewTotal - Whether the quantity is a new total or an amount to be added to the current total
 * @param {string} dateOfTransaction - The date of the transaction
 * @param {string} timeOfTransaction - The time of the transaction
 * @param {string} timeZoneOfTransaction - The timezone of the transaction
 * @returns {string} message - A message indicating whether the transaction was recorded successfully
 * @throws {string} error - An error message 
 */
router.post("/transactions", async (req, res) => {
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
    await addOrUpdateAsset(
      ticker.toUpperCase(), 
      totalHolding,
      isNewTotal,
      dateOfTransaction,
      timeOfTransaction,
      timeZoneOfTransaction
    );
    res.json({ message: "Transaction recorded successfully." });
  } catch (error) {
    console.error("Error in transaction route:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
