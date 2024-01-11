import "./ButtonStyles.scss";

interface OrangeButtonProps {
  size?: "tiny" | "small" | "medium" | "large" | "huge";
  width?: number;
  buttonText: string;
  type?: "submit" | "reset" | "button" | undefined;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  selectedProp?: string | null;
}

export function OrangeButton(props: OrangeButtonProps): JSX.Element {
  const { buttonText, type = "submit", size = "medium", width, onClick, selectedProp } = props;

  function handleSelected() {
    if (selectedProp === null) {
      return "none-selected";
    } else if (selectedProp !== null) {
      return selectedProp + "-selected";
    }
  }

  return (
    <div className={`orangeButtonContainer ${handleSelected()}`}>
      <button
        onClick={onClick}
        className={`orangeButton size-${size} ${buttonText.toLowerCase()}-button
        ${handleSelected()}`}
        type={type}
        style={width ? { width: `${width * 2}rem` } : {}}>

        <div className={`${buttonText}-text buttonText`}>{buttonText}</div>
      </button>
    </div>
  );
}
