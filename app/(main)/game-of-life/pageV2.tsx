"use client";

import { useEffect, useRef, useState } from "react";
const size = 10;
const width = 80;
const height = 80;
const rainbowColors = [
  "#FF0000",
  "#FFA500",
  "#FFFF00",
  "#008000",
  "#0000FF",
  "#4B0082",
  "#EE82EE",
];

const GameOfLife = () => {
  const [isWorking, setIsWorking] = useState<boolean>(false);
  const [stepN, setStepN] = useState(0);
  // const isWorking = useRef(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvas = canvasRef.current;
  const ctx = canvas?.getContext("2d");

  const getRandomRainbowColor = () => {
    // const randomIndex = Math.floor(Math.random() * rainbowColors.length);
    // return rainbowColors[randomIndex];
    return "#008000";
  };
  const randomColor = getRandomRainbowColor();

  let field: number[][] = [];
  let nextField: number[][] = [];

  const clear = () => {
    for (let y = 0; y < height + 2; y++) {
      field[y] = [];
      nextField[y] = [];
      for (let x = 0; x < width + 2; x++) {
        field[y][x] = 0;
        nextField[y][x] = 0;
      }
    }
  };

  const random = () => {
    for (let y = 1; y < height + 1; y++) {
      for (let x = 1; x < width + 1; x++) {
        field[y][x] = Math.random() < 0.2 ? 1 : 0;
      }
    }
  };

  const render = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (ctx) {
      for (let y = 1; y < height + 1; y++) {
        for (let x = 1; x < width + 1; x++) {
          ctx.fillStyle = field[y][x] ? getRandomRainbowColor() : "#000";
          ctx.fillRect((x - 1) * size, (y - 1) * size, size, size);
        }
      }
    }
  };

  const step = () => {
    for (let y = 1; y < height + 1; y++) {
      for (let x = 1; x < width + 1; x++) {
        let count = 0;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            if (field[y + dy][x + dx]) {
              count++;
            }
          }
        }

        if (
          (field[y][x] && (count === 3 || count === 4)) ||
          (!field[y][x] && count === 3)
        ) {
          nextField[y][x] = 1;
        } else {
          nextField[y][x] = 0;
        }
      }
    }
    [field, nextField] = [nextField, field];
  };

  const drawLine = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (ctx) {
      ctx.beginPath();
      for (let y = 0; y <= size * height; y += size) {
        ctx.moveTo(0, y);
        ctx.lineTo(size * width, y);
      }
      for (let x = 0; x <= size * width; x += size) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, size * width);
      }

      ctx.strokeStyle = "#fff";
      ctx.stroke();
    }
  };

  const drawDot = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    const cellX = Math.floor(x / size);
    const cellY = Math.floor(y / size);

    if (field) field[cellY + 1][cellX + 1] = 1;

    ctx.fillStyle = getRandomRainbowColor();
    ctx.fillRect(cellX * size, cellY * size, size, size);
  };

  const drawLife = (ctx: CanvasRenderingContext2D, pattern: number[][]) => {
    const offsetX = Math.floor(pattern[0].length / 2);
    const offsetY = Math.floor(pattern.length / 2);

    const cellX = Math.floor(field[0].length / 2) - offsetX;
    const cellY = Math.floor(field.length / 2) - offsetY;

    for (let y = 0; y < pattern.length; y++) {
      for (let x = 0; x < pattern[y].length; x++) {
        if (pattern[y][x] === 1) {
          field[cellY + y][cellX + x] = 1;
          ctx.fillStyle = getRandomRainbowColor();
          ctx.fillRect(
            (cellX + x - 1) * size,
            (cellY + y - 1) * size,
            size,
            size
          );
        }
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (ctx && canvas) {
      canvas.width = size * width;
      canvas.height = size * height;
      clear();
      random();
      render();
      drawLine();
    }
  }, []);

  useEffect(() => {
    // init();
    let timeoutId: ReturnType<typeof setTimeout>;

    function tick() {
      timeoutId = setTimeout(tick, 100);
      if (isWorking) {
        step();
        setStepN((prev) => prev + 1);
        render();
        drawLine();
      }
    }
    if (isWorking) {
      tick();
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isWorking]);

  function toggleIsWorking() {
    setIsWorking(!isWorking);
  }

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <h1 className="text-2xl font-bold p-6">Game of Life</h1>
      <canvas
        className="p-10"
        ref={canvasRef}
        width={width * 2}
        height={height * 2}
      />
      <button
        className="p-2 border bg-blue-700 hover:bg-blue-800 focus:outline-none text-white rounded-full"
        onClick={toggleIsWorking}
      >
        {isWorking ? "Stop" : "Start"}
      </button>
    </div>
  );
};
export default GameOfLife;
