"use client";
import { ChangeEvent, useEffect, useRef, useState } from "react";

const MonteCarloSimulator = () => {
  const radius = 180;
  const centerX = 180;
  const centerY = 180;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [numDot, setNumDot] = useState<number | "">(500);
  const [totalDot, setTotalDot] = useState<number>(0);
  const [innerDot, setInnerDot] = useState<number>(0);
  const [outerDot, setOuterDot] = useState<number>(0);

  const isInsideCircle = (x: number, y: number) => {
    const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
    return distance <= radius;
  };

  const handleDrawDot = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (context && canvas !== null && numDot) {
      for (let i = 0; i < numDot; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const color = isInsideCircle(x, y) ? "green" : "red";
        color === "green"
          ? setInnerDot((prev) => prev + 1)
          : setOuterDot((prev) => prev + 1);
        context.fillStyle = color;
        context.fillRect(x, y, 2, 2);
      }
      setTotalDot((prevDot) => prevDot + numDot);
    }
  };

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (context && canvas) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      // draw square
      context.beginPath();
      context.rect(0, 0, radius * 2, radius * 2);
      context.stroke();

      // draw circle
      context.beginPath();
      context.arc(centerX, centerY, radius, 0, Math.PI * 2);
      context.stroke();
    }
  };

  const resetDot = () => {
    drawCanvas();
    setInnerDot(0);
    setOuterDot(0);
    setTotalDot(0);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNumDot(value === "" ? "" : Number(value));
  };

  useEffect(() => {
    drawCanvas();
  }, []);

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <h1 className="text-2xl font-bold p-6">Monte Carlo Simulator</h1>
      <canvas ref={canvasRef} width={radius * 2} height={radius * 2}></canvas>
      <input
        className="rounded-md border-2 border-sky-500 bg-grey-100 border-solid"
        type="number"
        min="1"
        max="1000"
        value={numDot}
        onChange={handleInputChange}
      ></input>
      <button
        className="p-2 border bg-blue-700 hover:bg-blue-800 focus:outline-none text-white rounded-full"
        onClick={handleDrawDot}
      >
        Draw dots
      </button>
      <button
        className="p-2 border bg-blue-700 hover:bg-blue-800 focus:outline-none text-white rounded-full"
        onClick={resetDot}
      >
        Reset
      </button>
      <div>
        pi approximation:{" "}
        {totalDot === 0
          ? 0
          : Math.floor(((4 * innerDot) / totalDot) * 10000) / 10000}
      </div>
      <div>
        InnerDots: {innerDot} OuterDots: {outerDot} totalDots: {totalDot}
      </div>
    </div>
  );
};

export default MonteCarloSimulator;
