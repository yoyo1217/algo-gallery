import Image from "next/image";
import Link from "next/link";

const Card = () => {
  return (
    <div className="border duration-500 hover:scale-105 shadow-xl">
      <Link href="/monte-carlo-simulator">
        <Image
          src="/monte.png"
          className="h-80 w-72 object-cover rounded-t-xl"
          width={200}
          height={200}
          alt="Picture of monte carlo simulator screenshot"
          priority
        />
        <div className="px-4 py-3 w-72">
          <p className="text-lg font-bold text-black truncate block capitalize text-center">
            Monte Carlo Simulator
          </p>
        </div>
      </Link>
    </div>
  );
};
export default Card;
