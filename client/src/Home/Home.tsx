import { useState, useEffect } from "react";
import "./Home.scss";
import { ActionSelect } from "../ActionSelect/ActionSelect";
import { MultiForm } from "../MultiForm/MultiForm";

export type TransactionType = "add" | "increase" | "decrease" | "remove" | null;

export function Home(): JSX.Element {
  const [transactionType, setTransactionType] = useState<TransactionType>("add")

  useEffect(() => {
    console.log("FROM HOME transactionType:", transactionType)
  }, [transactionType]);

  return (
    <div id="home">    
      <ActionSelect transactionType={transactionType} setTransactionType={setTransactionType} />
      <MultiForm transactionType={transactionType} />
    </div>
  );
}
