import Link from "next/link";
import Button from "./Button";
import { gliderGun, glinder } from "../pattern";
import { useEffect, useRef } from "react";

type ModalProps = {
  onClose: () => void;
  drawLifeGrid: (life: number[][]) => void;
};

const Modal: React.FC<ModalProps> = ({ onClose, drawLifeGrid }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        {
          onClose();
        }
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [onClose]);
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="p-8 border w-96 shadow-lg rounded-md bg-white" ref={ref}>
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900">Life Lexicon</h3>
          <div className="flex flex-col items-center justify-content gap-y-2 mt-2 px-7 py-3">
            <Button label="Glinder" onClick={() => drawLifeGrid(glinder)} />
            <Button
              label="Glinder Gun"
              onClick={() => drawLifeGrid(gliderGun)}
            />
          </div>
          <div className="flex justify-center mt-4">
            <Button label="Close" onClick={onClose} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
