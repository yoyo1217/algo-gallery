"use client";

interface LeftHeaderTableProps {
  headers: string[];
  data: number[][];
}

const LeftHeaderTable: React.FC<LeftHeaderTableProps> = ({ headers, data }) => {
  return (
    <table className="table-auto border border-green-800 shadow-lg">
      <tbody>
        {headers.map((header, index) => (
          <tr key={index}>
            <th
              key={index}
              className="border border-green-600 p-2 text-green-600"
            >
              {header}
            </th>
            {data.map((row, rowIndex) => (
              <td
                key={`${header}-${rowIndex}`}
                className="border border-green-600 px-4 py-2"
              >
                {row[index]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default LeftHeaderTable;
