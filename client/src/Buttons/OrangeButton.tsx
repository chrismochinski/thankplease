import "./ButtonStyles.scss";

interface OrangeButtonProps {
  size?: "tiny" | "small" | "medium" | "large" | "huge";
  width?: number;
  buttonText: string;
  type?: "submit" | "reset" | "button" | undefined;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  selectedProp?: string | null;
  className?: string;
}

export function OrangeButton(props: OrangeButtonProps): JSX.Element {
  const { buttonText, type = "submit", size = "medium", width, onClick, selectedProp, className } = props;

  function handleSelected() {
    if (selectedProp === null) {
      return "none-selected";
    } else if (selectedProp !== null) {
      return selectedProp + "-selected selected-button";
    }
  }

  return (
    <div className={`orangeButtonContainer ${handleSelected()}`}>
      <button
        onClick={onClick}
        className={`${className} orangeButton size-${size} ${buttonText.toLowerCase()}-button
        ${handleSelected()} ${
          selectedProp !== null &&
          selectedProp + "-selected" !== `${buttonText.toLowerCase()}-selected`
            ? "not-selected"
            : ""
        }`}
        type={type}
        style={width ? { width: `${width * 2}rem` } : {}}>
        <div className={`${buttonText.toLowerCase()}-text buttonText`}>{buttonText}</div>
      </button>
    </div>
  );
}
