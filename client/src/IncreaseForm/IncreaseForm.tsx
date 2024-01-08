import { useState } from "react";
import "../GlobalStyles.scss";
import "./IncreaseForm.scss";
import { OrangeButton } from "../Buttons/OrangeButton";

export function IncreaseForm(): JSX.Element {
  const [ticker, setTicker] = useState("");
  const [quantity, setQuantity] = useState("");
  const [isNewTotal, setIsNewTotal] = useState(false);
  const [transactionType, setTransactionType] = useState(""); // increase, decrease, transfer, etc
  const [transactionSource, setTransactionSource] = useState(""); // coinbase, binance, kraken, stepn, sweat, etc
  const [transactionActivity, setTransactionActivity] = useState(""); // buy, run, mine, mint, etc

  // HANDLE SUBMISSION:
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Get current date and time
    const currentTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const currentDate = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    const currentTime = new Date().toTimeString().split(" ")[0]; // HH:MM:SS

    // Convert quantity to a number
    const numericQuantity = parseFloat(quantity) || 0;

    console.log("ticker is:", ticker);
    console.log("quantity:", quantity);
    console.log("isNewTotal:", isNewTotal);
    console.log("dateOfTransaction:", currentDate);
    console.log("timeOfTransaction:", currentTime);
    console.log("timeZoneOfTransaction:", currentTimeZone);

    const payload = {
      ticker,
      quantity: numericQuantity,
      isNewTotal,
      transactionType,
      dateOfTransaction: currentDate,
      timeOfTransaction: currentTime,
      timeZoneOfTransaction: currentTimeZone,
      transactionSource,
      transactionActivity,
    };
    try {
      const response = await fetch("http://localhost:3001/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      console.log("data:", data);
    } catch (error) {
      console.error("error:", error);
    }
    clearFields();
  };

  // CLEAR FIELDS:
  const clearFields = () => {
    setTicker("");
    setQuantity("");
    setIsNewTotal(false);
  };

  // HANDLE SWITCH: //revisit swtitch
  const handleAddTotalSwitch = () => {
    console.log("switched!");
    console.log("SETTING TO:", !isNewTotal);
    setIsNewTotal(!isNewTotal);
  };

  // HANDLE TICKER CHANGE:
  const handleTickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTicker(e.target.value.toUpperCase());
  };

  return (
    <div id="increaseFormComponent" className="">
      <form id="increaseForm" className="column" onSubmit={handleSubmit}>
        <input type="text" value={ticker} onChange={handleTickerChange} placeholder="Ticker" />
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Amount"
        />
        <input
          type="text"
          value={transactionType}
          onChange={(e) => setTransactionType(e.target.value)}
          placeholder="Type"
        />
        <input
          type="text"
          value={transactionSource}
          onChange={(e) => setTransactionSource(e.target.value)}
          placeholder="Source"
        />
        <input
          type="text"
          value={transactionActivity}
          onChange={(e) => setTransactionActivity(e.target.value)}
          placeholder="Activity"
        />
        <OrangeButton size="medium" buttonText="SUBMIT" width={6} />
      </form>
    </div>
  );
}
