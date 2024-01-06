import 'dotenv/config';
import express from "express";
import cors from "cors";
import userAssetsRouter from './UserAssets/UserAssets'; 
import coinMarketCapRouter from './CoinMarketCap/CoinMarketCap';
import coinGeckoRouter from './CoinGecko/CoinGecko';

const app = express();
app.use(cors());
app.use(express.json());
const port = 3001;

// ROUTER LIST
app.use('/api/user-assets', userAssetsRouter); 
app.use('/api/cmc', coinMarketCapRouter);
app.use('/api/coingecko', coinGeckoRouter);

app.get("/", (req, res) => res.send("Welcome to thankplease!"));
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
