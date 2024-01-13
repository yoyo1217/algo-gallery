"use client";

import { useEffect, useState } from "react";
import Grid from "./_components/Grid";
import {
  countNeighbors,
  createEmptyGrid,
  createRandomGrid,
  drawLife,
  numCols,
  numRows,
} from "./_utils";
import Loading from "./_components/Loading";
import { glinder, gliderGun } from "./pattern";
import Link from "next/link";
import Modal from "./_components/Modal";
import Button from "./_components/Button";

const nextGeneration = (grid: number[][]): number[][] => {
  const newGrid = createEmptyGrid();

  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      const neighbors = countNeighbors(grid, i, j);
      const cell = grid[i][j];

      if (cell && (neighbors < 2 || neighbors > 3)) {
        newGrid[i][j] = 0; // Cell dies
      } else if (!cell && neighbors === 3) {
        newGrid[i][j] = 1; // Cell becomes alive
      } else {
        newGrid[i][j] = cell; // Cell remains in its current state
      }
    }
  }

  return newGrid;
};

type SearchParams = {
  searchParams: Record<string, string> | null | undefined;
};

const GameOfLife = ({ searchParams }: SearchParams) => {
  const [grid, setGrid] = useState(() => createRandomGrid());
  const [isLoading, setIsLoading] = useState(true);
  const [running, setRunning] = useState(false);
  const show = searchParams?.show;

  function cleanGrid() {
    setGrid(createEmptyGrid());
  }

  function drawRandomGrid() {
    setGrid(createRandomGrid());
  }

  function drawLifeGrid(life: number[][]) {
    setGrid((currentGrid) => createEmptyGrid());
    setGrid((currentGrid) => {
      return drawLife(createEmptyGrid(), life);
    });
  }

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      setGrid((grid) => nextGeneration(grid));
    }, 100);
    return () => clearInterval(interval);
  }, [grid, running]);

  useEffect(() => {
    setGrid(createRandomGrid());
    setIsLoading(false);
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <h1 className="text-2xl font-bold p-6">Game of Life</h1>
      <div className="flex py-3 gap-x-2">
        <Button
          label={running ? "Stop" : "Start"}
          onClick={() => setRunning((r) => !r)}
        />
        <Button label="Clean" onClick={cleanGrid} />
        <Button label="Random" onClick={drawRandomGrid} />
        <Link
          className="px-4 py-2 bg-blue-500 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          href="/game-of-life?show=true"
        >
          Life Lexicon List
        </Link>
        {show && <Modal drawLifeGrid={drawLifeGrid} />}
      </div>
      <Grid grid={grid} setGrid={setGrid} />
    </div>
  );
};

export default GameOfLife;
