import axios from "axios";
import express from "express";

const router = express.Router();
const API_KEY = process.env.COIN_MARKET_CAP_API_KEY;

/**
 * GET /api/coinmarketcap
 * Get the latest cryptocurrency listings from CoinMarketCap
 * This route gets the most basic data for each cryptocurrency
 * @returns {object} - The latest cryptocurrency listings
 * @throws {object} - Error message
 * 
 */
router.get("/latest", async (req, res) => {
  try {
    const url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";
    const headers = {
      "X-CMC_PRO_API_KEY": API_KEY,
      Accept: "application/json",
    };

    // Axios request
    const cmcResponse = await axios.get(url, { headers });
    res.json(cmcResponse.data);
    console.log('CMC BASIC RESPONSE SUCCESS!')
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error fetching data" });
  }
});

export default router;
