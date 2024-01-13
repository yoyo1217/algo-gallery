import Link from "next/link";
import Button from "./Button";
import { gliderGun, glinder } from "../pattern";

type ModalProps = {
  drawLifeGrid: (life: number[][]) => void;
};

const Modal: React.FC<ModalProps> = ({ drawLifeGrid }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="p-8 border w-96 shadow-lg rounded-md bg-white">
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
            <Link
              href="/game-of-life"
              className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Close
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
