"use client";

interface TableDataProps {
  value: number | string;
  isHighlighted?: boolean;
}

const TableData: React.FC<TableDataProps> = ({
  value,
  isHighlighted = false,
}) => {
  return (
    <td
      className={`border border-green-600 px-4 py-2 ${
        isHighlighted ? "text-red-600" : ""
      }`}
    >
      {value}
    </td>
  );
};
export default TableData;
