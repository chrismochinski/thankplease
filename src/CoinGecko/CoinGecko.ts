import axios from "axios";
import express from "express";

const router = express.Router();

router.get("/list", async (req, res) => {
  try {
    const url = "https://api.coingecko.com/api/v3/coins/list";

    // Axios request
    const coinGeckoResponse = await axios.get(url);
    res.json(coinGeckoResponse.data);
    console.log('CoinGecko aaaaaaaaaaall of the data success!')
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error fetching data" });
  }
});

export default router;
