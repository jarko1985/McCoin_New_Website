"use client";
import Image from "next/image"
import MONEY_1 from '@/../public/images/money-1.svg'
import MONEY_2 from '@/../public/images/money-2.svg'
import MONEY_3 from '@/../public/images/money-3.svg'
import MONEY_4 from '@/../public/images/money-4.svg'
import MONEY_5 from '@/../public/images/money-5.svg'


const RotatingIcons = () => {
    const icons = [
        { component: MONEY_1, id: 1 },
        { component: MONEY_2, id: 2 },
        { component: MONEY_3, id: 3 },
        { component: MONEY_4, id: 4 },
        { component: MONEY_5, id: 5 }
      ];
  return (
    <div className="flex items-center justify-center w-full py-16 md:py-24 z-10 relative bg-[#050e27]!">
    <ul className="flex flex-wrap justify-center gap-4 md:gap-8 w-full max-w-4xl mx-auto bg-[#050e27]!">
      {icons.map((icon, index) => (
        <li 
          key={icon.id} 
          className="w-[14%] min-w-[60px] aspect-square animate-flip bg-[#050e27]!"
          style={{ animationDelay: `${index * 0.2}s` }}
        >
          <div className="w-full h-full flex items-center justify-center perspective-1000 bg-[#050e27]!">
            <div className="relative w-full h-full transition-transform duration-1000 transform-style-preserve-3d bg-[#050e27]!">
              <div className="absolute inset-0 backface-hidden rounded-lg flex items-center justify-center p-2 bg-[#050e27]!">
                <Image
                  src={icon.component}
                  alt={`Icon ${icon.id}`}
                  width={35}
                  height={35}
                  className="w-full h-auto"
                  style={{ background: 'transparent' }}
                />
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>

    {/* Add this to your globals.css or CSS module */}
    <style jsx global>{`
      @keyframes flip {
        0% {
          transform: rotateY(0deg);
        }
        100% {
          transform: rotateY(360deg);
        }
      }
      .animate-flip {
        animation: flip 3s infinite linear;
      }
      .perspective-1000 {
        perspective: 1000px;
      }
      .transform-style-preserve-3d {
        transform-style: preserve-3d;
      }
      .backface-hidden {
        backface-visibility: hidden;
      }
    `}</style>
  </div>
  )
}

export default RotatingIcons