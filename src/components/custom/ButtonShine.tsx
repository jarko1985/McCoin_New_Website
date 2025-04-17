import Link from "next/link";

type ButtonArrowProps = {
  text: string;
  href:string;
};

const ButtonShine: React.FC<ButtonArrowProps> = ({ text, href }) => {
  return (
    <Link
      href={href}
      className="before:ease cursor-pointer relative h-12 w-40 overflow-hidden border border-[#DAE6EA] bg-[#EC3B3B] text-[#DAE6EA] shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:before:-translate-x-40"
    >
      <span className="relative z-10">{text}</span>
    </Link>
  );
};

export default ButtonShine;
