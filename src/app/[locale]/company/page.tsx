"use client";
import Image from "next/image";
import LOGO from '@/../public/images/logo.svg';
import COMPANY from '@/../public/images/company_red_roof.png'
import ButtonArrow from "@/components/custom/ButtonArrow";
import { useRouter } from "next/navigation";


const CompanyPage = () => {
    const router = useRouter();
  return (
    <section className="container py-12 xl:w-[70%] mx-auto flex flex-col items-center">
      <div className="flex items-center justify-center gap-4">
        <h1 className="text-[#DAE6EA] lg:text-3xl text-lg">
          Invest in
        </h1>
        <Image src={LOGO} alt="Logo Image" width={200} height={100} className="h-auto" />
      </div>
      <h1 className="text-[#DAE6EA] text-center lg:text-3xl text-lg mt-2">
        Way to Trade
      </h1>
      <h2 className="text-[#DAE6EA] text-center mt-6 max-w-2xl text-lg lg:text-2xl ">
        McCoin empowers crypto traders with  <span className="text-[#EC3B3B] font-bold">fast, reliable </span> trading and a
        <span className="text-[#EC3B3B] font-bold"> user-friendly</span> hub for seamless communication and learning.
      </h2>
   <ButtonArrow  text="Get in Touch" onClick={()=>router.push('/contact')}/>
    <div>
        <Image width={300} height={100}  src={COMPANY} alt="company image"
        className="object-contain"
        sizes="(max-width: 768px) 100vw, 50vw"/>
    </div>
    </section>
  );
};

export default CompanyPage;