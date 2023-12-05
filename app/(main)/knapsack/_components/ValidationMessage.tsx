"use client";

interface ValidationMessageProps {
  isVisible: boolean;
  message: string;
}

const ValidationMessage: React.FC<ValidationMessageProps> = ({
  isVisible,
  message,
}) => (
  <p className={`text-red-600 ${isVisible ? "" : "invisible"}`}>{message}</p>
);

export default ValidationMessage;
