import "./ButtonStyles.scss";
import { Link } from "react-router-dom";

interface OrangeButtonProps {
  size?: "tiny" | "small" | "medium" | "large" | "huge";
  width?: number;
  buttonText: string;
  type?: "submit" | "reset" | "button" | undefined;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  href?: string;
  selectedProp?: string | null;
  className?: string;
}

export function OrangeButton(props: OrangeButtonProps): JSX.Element {
  const { buttonText, type = "submit", size = "medium", width, onClick, href, selectedProp, className } = props;

  function handleSelected() {
    if (selectedProp === null) {
      return "none-selected";
    } else if (selectedProp !== null) {
      return selectedProp + "-selected selected-button";
    }
  }

  return (
    <div className={`orangeButtonContainer ${handleSelected()}`}>
      <Link to={href ? href : ""}>
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
      </Link>
    </div>
  );
}
