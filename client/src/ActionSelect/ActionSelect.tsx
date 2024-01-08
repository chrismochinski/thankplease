import { OrangeButton } from "../Buttons/OrangeButton";
import "./ActionSelect.scss";

export function ActionSelect(): JSX.Element {
  const handleClickNew = () => {
    console.log("clicked new");
  };

  const handleClickIncrease = () => {
    console.log("clicked increase");
  };

  const handleClickDecrease = () => {
    console.log("clicked decrease");
  };

  const handleClickRemove = () => {
    console.log("clicked remove");
  };

  return (
    <div className="actionSelectContainer">
      <OrangeButton buttonText="ADD" width={6} onClick={handleClickNew} />
      <OrangeButton buttonText="INCREASE" width={6} onClick={handleClickIncrease} />
      <OrangeButton buttonText="DECREASE" width={6} onClick={handleClickDecrease} />
      <OrangeButton buttonText="REMOVE" width={6} onClick={handleClickRemove} />
    </div>
  );
}
