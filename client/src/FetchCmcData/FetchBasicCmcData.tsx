import { useState } from "react";
import { OrangeButton } from "../Buttons/OrangeButton";

export function FetchBasicCmcData(): JSX.Element {
  const [fetchBasicSuccess, setFetchBasicSuccess] = useState(false);

  const fetchBasicCryptoData = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/cmc/latest");
      const data = await response.json();
      console.log("Basic Crypto Data:", data); // Log the entire data object
      setFetchBasicSuccess(true);
    } catch (error) {
      console.error("Error fetching crypto data:", error);
      setFetchBasicSuccess(false);
    }
  };
  return (
    <div id="fetchedData" className="column">
      <OrangeButton
        buttonText="FETCH CMC DATA"
        width={8}
        onClick={fetchBasicCryptoData}
      />
      {fetchBasicSuccess && <p className="paragraph-text">Success! Check the console.</p>}{" "}
    </div>
  );
}
