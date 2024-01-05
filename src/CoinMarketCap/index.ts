import axios from "axios";
import express from "express";

const router = express.Router();
const API_KEY = "06d90b90-3866-443e-89e6-1e694c9019d2";

router.get("/", async (req, res) => {
  try {
    const url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";
    const headers = {
      "X-CMC_PRO_API_KEY": API_KEY,
      Accept: "application/json",
    };

    // Axios request
    const cmcResponse = await axios.get(url, { headers });
    res.json(cmcResponse.data); // Access the data property of the response
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error fetching data" });
  }
});

export default router;
