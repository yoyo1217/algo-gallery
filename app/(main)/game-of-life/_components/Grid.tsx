import { numCols } from "../_utils";
import Cell from "./Cell";

type GridProps = {
  grid: number[][];
  setGrid: React.Dispatch<React.SetStateAction<number[][]>>;
};

const Grid: React.FC<GridProps> = ({ grid, setGrid }) => {
  const toggleCellState = (row: number, col: number) => {
    const newGrid = grid.map((rows, i) =>
      rows.map((cell, j) => {
        if (i === row && j === col) return cell ? 0 : 1;
        return cell;
      })
    );
    setGrid(newGrid);
  };

  return (
    <div
      className="grid py-3"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${numCols}, minmax(0, 1fr))`,
      }}
    >
      {grid.map((rows, i) =>
        rows.map((alive, j) => (
          <Cell
            key={`${i}-${j}`}
            alive={!!alive}
            toggleCellState={() => toggleCellState(i, j)}
          />
        ))
      )}
    </div>
  );
};

export default Grid;
