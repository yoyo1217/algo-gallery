"use client";

import useOutsideClick from "@/hooks/useOutsideClick";
import { useRef } from "react";

interface HamburgerProps {
  isOpen: boolean;
  toggle: React.Dispatch<React.SetStateAction<boolean>>;
}

const Hamburger: React.FC<HamburgerProps> = ({ isOpen, toggle }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useOutsideClick(menuRef, () => {
    if (isOpen) toggle(false);
  });

  return (
    <div
      className="flex flex-col justify-between w-8 h-6 cursor-pointer"
      onClick={() => {
        toggle((prev) => !prev);
      }}
      ref={menuRef}
    >
      <div
        className={`h-1 bg-white transition-transform duration-300 ${
          isOpen ? "transform rotate-45 translate-y-2.5" : ""
        }`}
      ></div>
      <div
        className={`h-1 bg-white transition-opacity duration-300 ${
          isOpen ? "opacity-0" : "opacity-100"
        }`}
      ></div>
      <div
        className={`h-1 bg-white transition-transform duration-300 ${
          isOpen ? "transform -rotate-45 -translate-y-2.5" : ""
        }`}
      ></div>
    </div>
  );
};
export default Hamburger;
