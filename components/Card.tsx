import Image from "next/image";
import Link from "next/link";

interface CardProps {
  title: string;
  link: string;
  imageUrl: string;
}

const Card = ({ title, link, imageUrl }: CardProps) => {
  return (
    <div className="border duration-500 hover:scale-105 shadow-xl">
      <Link href={link}>
        <Image
          src={imageUrl}
          className="h-80 w-72 object-cover rounded-t-xl"
          width={200}
          height={200}
          alt="Picture of monte carlo simulator screenshot"
          priority
        />
        <div className="px-4 py-3 w-72">
          <p className="text-lg font-bold text-black truncate block capitalize text-center">
            {title}
          </p>
        </div>
      </Link>
    </div>
  );
};
export default Card;
