import { useState } from "react";
import { OrangeButton } from "../Buttons/OrangeButton";
import "./ActionSelect.scss";
import { TransactionType } from "../Home/Home";

interface ActionSelectProps {
  transactionType: TransactionType;
  setTransactionType: (transactionType: TransactionType) => void;
}

export function ActionSelect(props: ActionSelectProps): JSX.Element {
  const { transactionType, setTransactionType } = props;
 
  const handleActionSelectClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const buttonText = e.currentTarget.innerText.toLowerCase();
    setTransactionType(buttonText as TransactionType);
  };
  
  return (
    <div className="actionSelectContainer">
      <OrangeButton buttonText="ADD" width={6} onClick={handleActionSelectClick} />
      <OrangeButton buttonText="INCREASE" width={6} onClick={handleActionSelectClick} />
      <OrangeButton buttonText="DECREASE" width={6} onClick={handleActionSelectClick} />
      <OrangeButton buttonText="REMOVE" width={6} onClick={handleActionSelectClick} />
    </div>
  );
}
