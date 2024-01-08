import { useState } from "react";
import { OrangeButton } from "../Buttons/OrangeButton";
import "../GlobalStyles.scss";
import "./NewAssetForm.scss";

export function NewAssetForm(): JSX.Element {
  const [user, setUser] = useState("Mo"); // TODO: BUILD INTO AUTH SYSTEM
  const [ticker, setTicker] = useState("");
  const [isNewTotal, setIsNewTotal] = useState(true);
  const [quantity, setQuantity] = useState("");
  const [transactionType, setTransactionType] = useState("Add New Asset");

  // HANDLE SUBMISSION:
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const currentTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const currentDate = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    const currentTime = new Date().toTimeString().split(" ")[0]; // HH:MM:SS

    // Convert quantity to a number
    const numericQuantity = parseFloat(quantity) || 0;

    console.log("user is:", user);
    console.log("ticker is:", ticker);
    console.log("quantity:", quantity);
    console.log("isNewTotal (should be true):", isNewTotal);
    console.log("dateOfTransaction:", currentDate);
    console.log("timeOfTransaction:", currentTime);
    console.log("timeZoneOfTransaction:", currentTimeZone);
    console.log("transactionType (should be Add New Asset):", transactionType);

    const payload = {
      user,
      ticker,
      quantity: numericQuantity,
      isNewTotal,
      dateOfTransaction: currentDate,
      timeOfTransaction: currentTime,
      timeZoneOfTransaction: currentTimeZone,
      transactionType,
    };
    try {
      const response = await fetch("http://localhost:3001/api/user-assets/new-user-asset", {
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
  };

  // HANDLE TICKER CHANGE:
  const handleTickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTicker(e.target.value.toUpperCase());
  };

  return (
    <div id="newAssetFormComponent" className="">
      <form id="newAssetForm" className="column" onSubmit={handleSubmit}>
        <input type="text" value={ticker} onChange={handleTickerChange} placeholder="Ticker" />
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value === null ? "0" : e.target.value)}
          placeholder="Starting Amount"
        />
        <OrangeButton type="submit" buttonText="SUBMIT" size="small" width={5} />
      </form>
    </div>
  );
}
