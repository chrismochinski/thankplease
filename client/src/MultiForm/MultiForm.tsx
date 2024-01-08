import { useState } from "react";
import "../GlobalStyles.scss";
import "./MultiForm.scss";
import { OrangeButton } from "../Buttons/OrangeButton";

export function MultiForm(): JSX.Element {
  const [user, setUser] = useState("Mo"); // TODO: BUILD INTO AUTH SYSTEM
  const [ticker, setTicker] = useState("");
  const [quantity, setQuantity] = useState("");
  const [isNewTotal, setIsNewTotal] = useState(false);
  const [transactionType, setTransactionType] = useState(""); // Add New Asset, Increase, Decrease, Remove Asset
  const [transactionSource, setTransactionSource] = useState(""); // coinbase, binance, kraken, stepn, sweat, etc
  const [transactionActivity, setTransactionActivity] = useState(""); // buy, run, mine, mint, etc
  const [transactionNotes, setTransactionNotes] = useState(""); // "Bought on Coinbase while I was cooking some bacon for my pet snake"

  // HANDLE SUBMISSION:
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Get current date and time
    const currentTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const currentDate = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    const currentTime = new Date().toTimeString().split(" ")[0]; // HH:MM:SS

    // Convert quantity to a
    const numericQuantity = parseFloat(quantity) || 0;

    console.log("user is:", user);
    console.log("ticker is:", ticker);
    console.log("quantity:", quantity);
    console.log("isNewTotal:", isNewTotal);
    console.log("dateOfTransaction:", currentDate);
    console.log("timeOfTransaction:", currentTime);
    console.log("timeZoneOfTransaction:", currentTimeZone);
    console.log("transactionType:", transactionType);
    console.log("transactionSource:", transactionSource);
    console.log("transactionActivity:", transactionActivity);
    console.log("transactionNotes:", transactionNotes);

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
    <div id="multiFormComponent" className="">
      <form id="multiForm" className="column" onSubmit={handleSubmit}>
        <input type="text" value={ticker} onChange={handleTickerChange} placeholder="Ticker*" />
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Increase Amount*"
        />
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Decrease Amount*"
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
        <input
          type="text"
          value={transactionNotes}
          onChange={(e) => setTransactionNotes(e.target.value)}
          placeholder="Notes"
        />
        <OrangeButton size="medium" buttonText="SUBMIT" width={6} />
      </form>
    </div>
  );
}
