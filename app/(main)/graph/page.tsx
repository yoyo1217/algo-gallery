"use client";

import { useEffect, useRef, useState } from "react";

interface Node {
  x: number;
  y: number;
  label: string;
}

interface Edge {
  from: number;
  to: number;
}

const nodes: Node[] = [
  { x: 400, y: 100, label: "0" },
  { x: 100, y: 200, label: "1" },
  { x: 50, y: 300, label: "2" },
  { x: 150, y: 300, label: "3" },
  { x: 400, y: 200, label: "4" },
  { x: 300, y: 300, label: "5" },
  { x: 250, y: 400, label: "6" },
  { x: 350, y: 400, label: "7" },
  { x: 500, y: 300, label: "8" },
  { x: 450, y: 400, label: "9" },
  { x: 550, y: 400, label: "10" },
  { x: 700, y: 200, label: "11" },
  { x: 650, y: 300, label: "12" },
  { x: 750, y: 300, label: "13" },
  { x: 700, y: 400, label: "14" },
];

const edges: Edge[] = [
  { from: 0, to: 1 },
  { from: 1, to: 2 },
  { from: 1, to: 3 },
  { from: 0, to: 4 },
  { from: 4, to: 5 },
  { from: 5, to: 6 },
  { from: 5, to: 7 },
  { from: 4, to: 8 },
  { from: 8, to: 9 },
  { from: 8, to: 10 },
  { from: 0, to: 11 },
  { from: 11, to: 12 },
  { from: 11, to: 13 },
  { from: 13, to: 14 },
];

const Graph: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  const drawNode = (
    ctx: CanvasRenderingContext2D,
    node: Node,
    color: string = "white",
    index: number
  ) => {
    ctx.beginPath();
    ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#003300";
    ctx.stroke();

    ctx.font = "16px serif";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(String(index), node.x, node.y);
  };

  const drawEdge = (
    ctx: CanvasRenderingContext2D,
    from: Node,
    to: Node,
    radius: number
  ) => {
    const angle = Math.atan2(to.y - from.y, to.x - from.x);

    const x1 = from.x + radius * Math.cos(angle);
    const y1 = from.y + radius * Math.sin(angle);

    const x2 = to.x - radius * Math.cos(angle);
    const y2 = to.y - radius * Math.sin(angle);

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  const initGraph = (ctx: CanvasRenderingContext2D, node: Node) => {
    ctx.beginPath();
    ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#003300";
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.stroke();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (ctx) {
      nodes.forEach((node) => initGraph(ctx, node));
      const nodeRadius = 20;

      edges.forEach((edge) => {
        drawEdge(ctx, nodes[edge.from], nodes[edge.to], nodeRadius);
      });
    }
  }, []);

  const handleAnimation = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (ctx) {
      const delay = 500;
      let index = 0;
      const animateNode = () => {
        if (index < nodes.length) {
          const node = nodes[index];
          drawNode(ctx, node, "#f87171", index);
          index++;
          setTimeout(animateNode, delay);
        } else {
          setIsDrawing(false);
        }
      };
      animateNode();
    }
  };

  const resetGraph = (
    canvasRef: React.RefObject<HTMLCanvasElement>,
    nodes: Node[]
  ) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (ctx) {
      nodes.forEach((node) => initGraph(ctx, node));
      edges.forEach((edge) => {
        drawEdge(ctx, nodes[edge.from], nodes[edge.to], 20);
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex py-2 gap-x-2">
        <button
          onClick={() => handleAnimation(canvasRef)}
          className="p-2 rounded-md text-white bg-gray-800 hover:opacity-80 disabled:opacity-30"
          disabled={isDrawing}
        >
          DFS
        </button>
        <button
          onClick={() => resetGraph(canvasRef, nodes)}
          className="p-2 rounded-md text-white bg-gray-800 hover:opacity-80 disabled:opacity-30"
          disabled={isDrawing}
        >
          Reset
        </button>
      </div>
      <canvas ref={canvasRef} width={800} height={800}></canvas>
    </div>
  );
};
export default Graph;
