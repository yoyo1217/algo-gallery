import TableRow from "./TableRow";

type TableProps = {
  headers: string[];
  data: number[][];
  highlightCell?: { row: number; column: number };
};

const Table: React.FC<TableProps> = ({ headers, data, highlightCell }) => {
  return (
    <table className="table-auto border-collapse border border-green-800 shadow-lg">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th
              key={index}
              className="border border-green-600 px-2 py-2 text-green-600"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <TableRow
            key={rowIndex}
            data={row}
            highlightIndex={
              highlightCell && highlightCell.row === rowIndex
                ? highlightCell.column + 1
                : undefined
            }
          />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
