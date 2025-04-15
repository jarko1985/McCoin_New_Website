import React from "react";
type ButtonSquaresProps = {
    text: string;
    onClick: () => void;
  };
const ButtonSquares:React.FC<ButtonSquaresProps> = ({ text, onClick }) => {
  return (
    <button 
    onClick={onClick}
    className="group cursor-pointer relative min-h-[50px] w-40 overflow-hidden border-2 border-[#EC3B3B] bg-white text-[#EC3B3B] shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-0 before:w-1/4 before:bg-[#EC3B3B] before:duration-500 after:absolute after:bottom-0 after:right-0 after:h-0 after:w-1/4 after:bg-[#EC3B3B] after:duration-500 hover:text-white hover:before:h-full hover:after:h-full">
      <span className="top-0 flex h-full w-full items-center justify-center before:absolute before:bottom-0 before:left-1/4 before:z-0 before:h-0 before:w-1/4 before:bg-[#EC3B3B] before:duration-500 after:absolute after:right-1/4 after:top-0 after:z-0 after:h-0 after:w-1/4 after:bg-[#EC3B3B] after:duration-500 hover:text-white group-hover:before:h-full group-hover:after:h-full"></span>
      <span className="absolute bottom-0 left-0 right-0 top-0 z-10 flex h-full w-full items-center justify-center group-hover:text-white">
        {text}
      </span>
    </button>
  );
};

export default ButtonSquares;
