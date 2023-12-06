"use client";

interface ValidationMessageProps {
  isVisible: boolean;
  message: string;
}

const ValidationMessage: React.FC<ValidationMessageProps> = ({
  isVisible,
  message,
}) => (
  <span className={`text-red-600 ${isVisible ? "" : "invisible"}`}>
    {message}
  </span>
);

export default ValidationMessage;
