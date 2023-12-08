"use client";
import useOutsideClick from "@/hooks/useOutsideClick";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import Hamburger from "./Hamburger";
import { AnimatePresence, motion } from "framer-motion";
import { routes } from "@/utils/routes";

const Navbar = () => {
  // const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-gray-800 text-white py-4 relative">
      <div className=" flex items-center justify-between text-2xl md:text-5xl font-bold">
        <div className="pl-2">
          <Link href="/">Algo Gallery</Link>
        </div>
        <div className="flex items-center pr-3 gap-4">
          <Link href="https://github.com/yoyo1217/algo-gallery">
            <Image
              className="w-8 h-8 md:w-12 md:h-12"
              width={48}
              height={48}
              src="/github-mark-white.svg"
              alt="github Invertocat Logo"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
