import axios from "axios";
import express from "express";

const router = express.Router();
const API_KEY = process.env.COINGECKO_API_KEY;


router.get("/list", async (req, res) => {
  try {
    const url = "https://api.coingecko.com/api/v3/coins/list";
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
