

type ButtonArrowProps = {
  text: string;
  onClick: () => void;
};

const ButtonArrow: React.FC<ButtonArrowProps> = ({ text, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="group cursor-pointer relative inline-flex items-center justify-center overflow-hidden my-6 border-2 border-[#EC3B3B] px-6 font-medium text-[#EC3B3B] shadow-md transition duration-300 ease-out"
    >
      <span className="ease absolute inset-0 flex h-full w-full -translate-x-full items-center justify-center bg-[#EC3B3B] text-white duration-300 group-hover:translate-x-0">
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          ></path>
        </svg>
      </span>
      <span className="ease absolute flex h-full w-full transform items-center justify-center text-[#EC3B3B] transition-all duration-300 group-hover:translate-x-full">
        {text}
      </span>
      <span className="invisible relative">{text}</span>
    </button>
  );
};

export default ButtonArrow;