"use client";

import TableData from "./TableData";

interface TableRowProps {
  data: number[];
  highlightIndex?: number;
}

const TableRow: React.FC<TableRowProps> = ({ data, highlightIndex }) => {
  return (
    <tr>
      {data.map((value, index) => (
        <TableData
          key={index}
          value={value}
          isHighlighted={index === highlightIndex}
        />
      ))}
    </tr>
  );
};

export default TableRow;
