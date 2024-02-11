import { useState, useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import { OrangeButton } from "../Buttons/OrangeButton";
import "./Market.scss";

export function Market(): JSX.Element {
  const [isLoading, setIsLoading] = useState(true);
  const [coinData, setCoinData] = useState<any>([]);
  const [error, setError] = useState("");

  const fetchCoinGeckoMarketData = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/coingecko/markets");
      const data = await response.json();
      if (Array.isArray(data)) {
        setCoinData(data);
        console.log("HERE BE DATA:", data);
      } else {
        setError("Failed to fetch market data 🙁");
        console.error("Error in response:", data);
      }
    } catch (error) {
      setError("Error fetching crypto data");
      console.error("Error fetching crypto data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("loading and fetching...");
    fetchCoinGeckoMarketData();
  }, []);

  return (
    <div className="marketPageWrapper">
      <div className="tableWrapper">
        <div className="cornerBackButtonWrapper">
          <OrangeButton
            buttonText="back"
            size="tiny"
            href="/"
            leftIcon={<ChevronLeft size={18} />}
          />
        </div>
        <h1 className="title afacad">Current Market Stats</h1>
        <OrangeButton buttonText="REFRESH" size="small" onClick={fetchCoinGeckoMarketData} />

        <div className="tableDataWrapper">
          {/* display the id, symbol, and current_price for each item in array, which is always a total of 20 items, in a TABLE */}

          {isLoading && <p className="loadingText">Loading...</p>}
          {error && <p className="errorText">{error}</p>}
          {!isLoading && !error && (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Symbol</th>
                  <th>Current Price</th>
                </tr>
              </thead>
              <tbody>
                {coinData.map((coin: any) => (
                  <tr key={coin.id}>
                    <td>{coin.id}</td>
                    <td>{coin.symbol}</td>
                    <td>{coin.current_price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
