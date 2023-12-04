"use client";
import useOutsideClick from "@/hooks/useOutsideClick";
import Link from "next/link";
import { useRef, useState } from "react";

const Navbar = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useOutsideClick(menuRef, () => {
    if (isOpen) setIsOpen(false);
  });

  return (
    <>
      <nav className="bg-gray-800 text-white p-4 relative" ref={menuRef}>
        <div className="container mx-auto flex items-center justify-between ">
          <Link href="/" className="text-xl font-bold">
            Algorithm Visualization
          </Link>
          <button onClick={() => setIsOpen(!isOpen)}>Menu</button>
        </div>
        {isOpen && (
          <div className="flex flex-col absolute top-16 right-0 bg-gray-700 p-4 rounded-lg shadow-md2">
            <Link href="/" className="mt-2">
              Home
            </Link>
            <Link href="/monte-carlo-simulator" className="mt-2">
              Monte Carlo Simulator
            </Link>
            <Link href="/knapsack" className="mt-2">
              Knapsack Simulator
            </Link>
          </div>
        )}
      </nav>
      {children}
    </>
  );
};
export default Navbar;
