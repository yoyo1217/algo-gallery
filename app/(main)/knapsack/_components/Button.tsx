"use client";

interface ButtonProps {
  onClick: () => void;
  className: string;
  disabled: boolean;
  text: string;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  className,
  disabled,
  text,
}) => {
  return (
    <button
      onClick={onClick}
      className={`p-2 text-white rounded ${className}`}
      disabled={disabled}
    >
      {text}
    </button>
  );
};
export default Button;
