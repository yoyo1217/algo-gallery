"use client";

import { useEffect, useState } from "react";

interface CellProps {
  alive: boolean;
  toggleCellState: () => void;
}

const Cell: React.FC<CellProps> = ({ alive, toggleCellState }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cellClass = isMounted
    ? `w-5 h-5 border border-gray-800 ${alive ? "bg-green-500" : "bg-black"}`
    : `w-5 h-5 border border-gray-800`;

  return <div className={cellClass} onClick={toggleCellState}></div>;
};

export default Cell;
