import PATTERN from '@/../public/images/pattern-2.svg'
import Image from "next/image"
import TypewriterEffect from '../custom/TypeWriterEffect';

interface LegalHeaderProps {
  title1: string;
  title2: string;
  description: string;   
}
const LegalHeader = ({title1,title2,description}:LegalHeaderProps) => {
  return (
    <section className='bg-[#050E27] py-12'>
        <h1 className='lg:text-[3rem] text-[1.25rem] font-[600] text-[#DAE6EA] text-center lg:mb-4 mb-2'><span className='text-[#EC3B3B] pr-2'>{title1}</span>{title2}</h1>
       <TypewriterEffect fullText={description} />
    <div className="w-full pt-12">
      <Image className="w-full" src={PATTERN} width={600} height={300} alt="Patten Image"/>
    </div>
</section>
  )
}

export default LegalHeader;