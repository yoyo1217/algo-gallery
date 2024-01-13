export const numRows = 50;
export const numCols = 50;

export const createRandomGrid = (): number[][] => {
  return Array.from({ length: numRows }, () =>
    Array.from({ length: numCols }, () => (Math.random() > 0.8 ? 1 : 0))
  );
};

export const createEmptyGrid = (): number[][] => {
  return new Array(numRows).fill(0).map(() => new Array(numCols).fill(0));
};

export const countNeighbors = (grid: number[][], x: number, y: number) => {
  let count = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;
      const xi = x + i;
      const yj = y + j;
      if (xi >= 0 && xi < numRows && yj >= 0 && yj < numCols) {
        count += grid[xi][yj] ? 1 : 0;
      }
    }
  }
  return count;
};

export const drawLife = (grid: number[][], life: number[][]) => {
  const newGrid = grid.map((row) => [...row]);

  const offsetRow = Math.floor(life.length / 2);
  const offsetCol = Math.floor(life[0].length / 2);

  const cellX = Math.floor(numRows / 2) - offsetRow;
  const cellY = Math.floor(numCols / 2) - offsetCol;

  for (let i = 0; i < life.length; i++) {
    for (let j = 0; j < life[0].length; j++) {
      if (life[i][j] === 1) {
        newGrid[i + cellX][j + cellY] = 1;
      }
    }
  }

  return newGrid;
};
