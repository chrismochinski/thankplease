import { useState, useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import { OrangeButton } from "../Buttons/OrangeButton";
import "./Market.scss";

export function Market(): JSX.Element {
  const [isLoading, setIsLoading] = useState(true);
  const [coinData, setCoinData] = useState<any>([]);
  const [error, setError] = useState('');


  const fetchCoinGeckoMarketData = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/coingecko/markets");
      const data = await response.json();
      if (Array.isArray(data)) {
        setCoinData(data);
      } else {
        setError('Failed to fetch market data');
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
    console.log('loading and fetching...')
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
        <div className="tableDataWrapper">
          
        </div>
      </div>
    </div>
  );
}
