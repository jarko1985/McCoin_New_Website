import Image from "next/image"
import { TeamData } from "../../../utils/data"

const Team = () => {
  return (
    <section className="container py-16 mx-auto xl:w-[70%]">
      <div className="text-center mb-12">
        <h1 data-aos="fade-left" className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#DAE6EA] pb-3">
          Meet Our Team
        </h1>
        <p data-aos="fade-left" className="text-lg lg:text-xl text-[#DAE6EA]/80 max-w-2xl mx-auto">
          The brilliant minds driving our mission forward
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center px-4">
        {TeamData.map((card) => (
          <div 
            data-aos="flip-left"
            key={card.id} 
            className="group relative flex flex-col items-center p-6 rounded-xl bg-[#07153B] 
                      shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-[#07153B] hover:border-[#EC3B3B]/50"
          >
            {/* Glow effect */}
            {/* <div className="absolute inset-0 rounded-xl bg-[#EC3B3B]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div> */}
            
            {/* Image container with border animation */}
            <div className="relative mb-4 rounded-full p-1 bg-gradient-to-br from-[#EC3B3B] to-[#EC3B3B]/70 group-hover:rotate-3 transition-transform duration-300">
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-[#07153B]">
                <Image 
                  src={card.imgSrc} 
                  alt={card.name}
                  width={128}
                  height={128}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            
            {/* Content */}
            <div className="text-center z-10">
              <h4 className="text-xl font-bold text-[#DAE6EA] group-hover:text-[#EC3B3B] transition-colors duration-300">
                {card.name}
              </h4>
              <p className="text-[#EC3B3B] mb-3 font-medium">{card.position}</p>
              
              
              {/* Social links would go here */}
              <div className="flex justify-center mt-4 space-x-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                {/* Add social icons here */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Team