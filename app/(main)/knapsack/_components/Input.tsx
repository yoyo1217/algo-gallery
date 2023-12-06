"use client";

interface InputProps {
  id: string;
  outlineColor: string;
  value: number | string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxValue: number;
  onFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  id,
  outlineColor,
  value,
  onChange,
  maxValue,
  onFocus,
}) => {
  return (
    <input
      id={id}
      className={`w-[80%] p-2 rounded-lg border outline-${outlineColor} border-${outlineColor}`}
      type="number"
      max={maxValue}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
    />
  );
};
export default Input;
