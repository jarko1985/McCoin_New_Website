import Image from "next/image"
import UNDER_CONSRUCTION from "@/../public/images/pending1.png"
import Link from "next/link"

const UnderConstruction = () => {
  return (
    <section className="xl:w-[70%] py-8 mx-auto flex flex-col lg:px-0 px-4 lg:h-[80vh] h-[60vh] md:gap-3 gap-6">
        <div className="relative w-full">
        <Image src={UNDER_CONSRUCTION}  alt="Under Construction" className="w-full h-auto" />
        </div>
        <h1 className="text-center lg:text-4xl mt-12 text-yellow-500">Please come back again later....</h1>
        <Link href='/' className="w-[100px] bg-white text-[#07153b] mx-auto my-6 hover:text-white hover:bg-[#07153b] 
        border border-transparent px-3 py-2 rounded-sm text-center hover:border hover:border-white hover:scale-110 transition-transform duration-300">Home</Link>
    </section>
  )
}

export default UnderConstruction