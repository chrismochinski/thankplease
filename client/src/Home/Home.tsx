import { useState, useEffect } from "react";
import "./Home.scss";
import { ActionSelect } from "../ActionSelect/ActionSelect";
import { MultiForm } from "../MultiForm/MultiForm";
import { OrangeButton } from "../Buttons/OrangeButton";

export type TransactionType = "add" | "increase" | "decrease" | "remove" | null;

export function Home(): JSX.Element {
  const [transactionType, setTransactionType] = useState<TransactionType>("add");

  useEffect(() => {
    console.log("FROM HOME transactionType:", transactionType);
  }, [transactionType]);

  return (
    <div id="home">
      <ActionSelect transactionType={transactionType} setTransactionType={setTransactionType} />
      <MultiForm transactionType={transactionType} />
      <div className="m-large">
        <OrangeButton buttonText="MARKET DATA" width={8} href="/market" />
      </div>
    </div>
  );
}
