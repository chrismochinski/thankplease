import "./ButtonStyles.scss";

interface OrangeButtonProps {
  size?: "tiny" | "small" | "medium" | "large" | "huge";
  width?: number;
  buttonText: string;
  type?: "submit" | "reset" | "button" | undefined;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function OrangeButton(props: OrangeButtonProps): JSX.Element {
  const { buttonText, type = "submit", size = "medium", width, onClick } = props;
  return (
    <div className="orangeButtonContainer">
      <button
        onClick={onClick}
        className={`orangeButton size-${size}`}
        type={type}
        style={width ? { width: `${width * 2}rem` } : {}}>
        {buttonText}
      </button>
    </div>
  );
}
