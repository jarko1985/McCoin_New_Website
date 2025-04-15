import Image from "next/image"
import { StepsData } from "../../../utils/data"

const Steps = () => {
  return (
    <section className="container mx-auto xl:w-[70%] py-12 px-4 sm:px-6">
      <h1 className="text-center text-[#DAE6EA] font-[600] text-3xl sm:text-4xl xl:text-[2.225rem]">
        Steps to Start Trading
      </h1>
      <p className="text-center text-[#DAE6EA] font-[400] text-lg sm:text-xl xl:text-[1.5rem] mt-6 mb-18 max-w-3xl mx-auto">
        To start trading with McCoin, all you need to do is to follow these simple steps
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {StepsData.map((step) => (
          <div 
            key={step.id} 
            className="
              p-6 bg-gradient-to-r from-[#050E27] to-[#07153b]
              rounded-lg flex flex-col
              h-full min-h-[250px]
              group transition-all duration-300 ease-in-out
              hover:shadow-lg hover:shadow-[#07153b]/50
              hover:-translate-y-1 hover:border hover:border-[#2a3e6d]/30
              relative
              before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_center,_#3d5a9c/10%,transparent)]
              before:opacity-0 before:transition-opacity before:duration-500
              hover:before:opacity-100
            "
          >
            <div className="flex justify-between items-start z-10">
              <div className="
                transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                group-hover:scale-110 group-hover:rotate-6
              ">
                <Image 
                  src={step.iconSRC} 
                  alt="icon image"
                />
              </div>
              <div className="
                relative
                transition-all duration-500 ease-[cubic-bezier(0.68,-0.6,0.32,1.6)]
                group-hover:-translate-y-10 group-hover:scale-125
                overflow-visible
              ">
                <Image 
                  src={step.imgSRC} 
                  alt="number image"
                  className="
                    drop-shadow-lg
                    group-hover:drop-shadow-xl
                  "
                />
              </div>
            </div>
            <div className="mt-4 flex-grow flex flex-col z-10">
              <h2 className="
                text-[#DAE6EA] font-[600] text-xl mb-3
                transition-colors duration-300
                group-hover:text-white
              ">
                {step.title}
              </h2>
              <p className="
                text-[#8A939B] text-base
                transition-colors duration-500
                group-hover:text-[#a0b3c8]
              ">
                {step.subTitle}
              </p>
            </div>
            <div className="
              absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-[#3d5a9c] to-transparent
              opacity-0 transition-opacity duration-300
              group-hover:opacity-100
            "></div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Steps