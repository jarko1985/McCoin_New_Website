import ContactForm from "@/components/forms/ContactForm"
import PATTERN from '@/../public/images/pattern-2.svg'
import Image from "next/image"

const ContactPage = () => {
  return (
    <section className="container mx-auto xl:w-[70%] py-12">
        <h1 className="text-[#DAE6EA] lg:text-4xl text-xl text-center pb-4">Contact Us</h1>
        <p className="text-[#DAE6EA] text-center lg:text-xl text-lg pb-12">Please fill in the below information, Our Customer service team will contact you at the earliest</p>
        <ContactForm/>
        <div className="w-full pt-12">
          <Image className="w-full" src={PATTERN} width={600} height={300} alt="Patten Image"/>
        </div>
    </section>
  )
}

export default ContactPage;