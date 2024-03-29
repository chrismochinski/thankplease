// src/routes/CoinGecko/CoinGecko.js
import axios from "axios";
import express from "express";

const router = express.Router();

router.get("/markets", async (req, res) => {
  try {
    const url = "https://api.coingecko.com/api/v3/coins/markets";
    const params = {
      vs_currency: "usd",
      order: "market_cap_desc",
      per_page: 20,
      page: 1,
      sparkline: false,
      locale: "en",
    };

    const coinGeckoResponse = await axios.get(url, { params });
    res.json(coinGeckoResponse.data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error fetching data you poo poo face" });
  }
});

export default router;
