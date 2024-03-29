import { useState } from "react";
import "../GlobalStyles.scss";
import "./MultiForm.scss";
import { OrangeButton } from "../Buttons/OrangeButton";
import { TransactionType } from "../Home/Home";
import { CornerRightUp } from "lucide-react";

interface MultiFormProps {
  transactionType: TransactionType;
}

export function MultiForm(props: MultiFormProps): JSX.Element {
  const { transactionType } = props;
  const [user, setUser] = useState("Mo"); // TODO: BUILD INTO AUTH SYSTEM
  const [ticker, setTicker] = useState("");
  const [quantity, setQuantity] = useState("");
  const [isNewTotal, setIsNewTotal] = useState(false);
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

    // Convert quantity to a number, zero if none provided
    const numericQuantity = parseFloat(quantity) || 0;

    const payload = {
      user,
      ticker,
      quantity: numericQuantity,
      isNewTotal,
      transactionType,
      dateOfTransaction: currentDate,
      timeOfTransaction: currentTime,
      timeZoneOfTransaction: currentTimeZone,
      transactionSource,
      transactionActivity,
      transactionNotes,
    };
    try {
      const response = await fetch("http://localhost:3001/api/add/add-asset", {
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

  // HANDLE SWITCH:
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
    <div id="multiFormComponent">
      <form
        id="multiForm"
        className={`column ${transactionType === null ? "no-transaction-type" : ""}`}
        onSubmit={handleSubmit}>
        <input
          id="tickerInput"
          className={transactionType === null ? "conditionalInput hidden" : "conditionalInput"}
          type="text"
          value={ticker}
          onChange={handleTickerChange}
          placeholder="Ticker*"
        />
        <input
          id="increaseQuantityInput"
          className={
            transactionType === "decrease" ||
            transactionType === "remove" ||
            transactionType === null
              ? "conditionalInput hidden"
              : "conditionalInput"
          }
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder={transactionType === "add" ? "Amount" : "Amount*"}
        />
        <input
          id="decreaseQuantityInput"
          className={
            transactionType === "increase" ||
            transactionType === "add" ||
            transactionType === "remove" ||
            transactionType === null
              ? "conditionalInput hidden"
              : "conditionalInput"
          }
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Decrease Amount*"
        />
        <input
          id="sourceInput"
          className={
            transactionType === "remove" || transactionType === null
              ? "conditionalInput hidden"
              : "conditionalInput"
          }
          type="text"
          value={transactionSource}
          onChange={(e) => setTransactionSource(e.target.value)}
          placeholder="Source"
        />

        <div className={transactionType !== null ? "selectReminder hidden" : "selectReminder"}>
          <p>
            Choose An Action <CornerRightUp color="currentColor" strokeWidth={1.5} />
          </p>
        </div>

        <input
          id="activityInput"
          className={
            transactionType === "add" || transactionType === "remove" || transactionType === null
              ? "conditionalInput hidden"
              : "conditionalInput"
          }
          type="text"
          value={transactionActivity}
          onChange={(e) => setTransactionActivity(e.target.value)}
          placeholder="Activity"
        />
        <input
          id="notesInput"
          className={transactionType === null ? "conditionalInput hidden" : "conditionalInput"}
          type="text"
          value={transactionNotes}
          onChange={(e) => setTransactionNotes(e.target.value)}
          placeholder="Notes"
        />
        <div
          id="switchInput"
          className={
            transactionType === "add" ||
            transactionType === "remove" ||
            transactionType === "decrease" ||
            transactionType === null
              ? "switchContainer hidden"
              : "switchContainer"
          }>
          <div className="switchLabel">
            <span className={!isNewTotal ? "activeLabel" : ""}>Total</span>
          </div>
          <label className="switch">
            <input type="checkbox" checked={isNewTotal} onChange={() => handleAddTotalSwitch()} />
            <span className="slider"></span>
          </label>
          <div className="switchLabel">
            <span className={isNewTotal ? "activeLabel" : ""}>Add</span>
          </div>
        </div>

        <OrangeButton
          size="medium"
          buttonText="SUBMIT"
          width={6}
          className={transactionType === null ? "conditionalInput hidden" : "conditionalInput"}
        />
      </form>
    </div>
  );
}
