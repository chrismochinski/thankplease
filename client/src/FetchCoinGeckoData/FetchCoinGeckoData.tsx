import { useState } from "react";
import { OrangeButton } from "../Buttons/OrangeButton";

export function FetchCoinGeckoList(): JSX.Element {
  const [fetchCoinGeckoListSuccess, setFetchCoinGeckoListSuccess] = useState(false);

  const fetchCoinGeckoListData = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/coingecko/list");
      const data = await response.json();
      console.log("CoinGecko List Data!:", data); // Log the entire data object
      setFetchCoinGeckoListSuccess(true);
    } catch (error) {
      console.error("Error fetching crypto data:", error);
      setFetchCoinGeckoListSuccess(false);
    }
  };
  return (
    <div id="fetchedData" className="column">
      <OrangeButton
        buttonText="COINGECKO LIST"
        width={8}
        onClick={fetchCoinGeckoListData}
      />
      {fetchCoinGeckoListSuccess && <p className="paragraph-text">Success! CONSOLE 👀 👉.</p>}{" "}
    </div>
  );
}
