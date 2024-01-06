import 'dotenv/config';
import express from "express";
import cors from "cors";
import coinMarketCapRouter from './CoinMarketCap/CoinMarketCap';
import userAssetsRouter from './UserAssets/UserAssets'; 

const app = express();
app.use(cors());
app.use(express.json());
const port = 3001;

// ROUTER LIST
app.use('/api/cmc', coinMarketCapRouter);
app.use('/api/user-assets', userAssetsRouter); 

app.get("/", (req, res) => res.send("Welcome to thankplease!"));
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
