import { LiaQuestionSolid } from "react-icons/lia";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Faqs } from "../../../../utils/data";

const FaqsPage = () => {
  return (
    <section className="container mx-auto xl:w-[70%] py-12 px-4 sm:px-6">
      <div className="flex flex-col items-center mb-12">
        <LiaQuestionSolid
          color="#EC3B3B"
          size={64}
          className="text-[#EC3B3B] mx-auto mb-6 animate-float"
        />
        <h1 className="text-[#DAE6EA] text-center text-2xl lg:text-4xl font-bold pb-4 bg-gradient-to-r from-[#DAE6EA] to-[#EC3B3B] bg-clip-text">
          Frequently Asked Questions
        </h1>
        <p className="text-center text-[#DAE6EA]/80 text-sm lg:text-base max-w-2xl">
          Got questions? We've got answers. Explore our FAQ section to learn more
          about how our crypto brokerage works, including trading, account
          management, funding options, security protocols, and more.
        </p>
      </div>

      <Accordion 
        type="single" 
        collapsible 
        className="w-full space-y-4"
      >
        {Faqs.map((faq) => (
          <AccordionItem 
            key={faq.id} 
            value={faq.id}
            className="border border-[#07153B] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:border-[#EC3B3B]/50"
          >
            <AccordionTrigger 
              className={`font-semibold text-lg text-[#DAE6EA] px-6 py-4 hover:text-[#EC3B3B] transition-colors duration-300 bg-[#07153B]/70 hover:bg-[#07153B]`}
            >
              <span className="text-left">{faq.question}</span>
            </AccordionTrigger>
            <AccordionContent 
              className="px-6 py-4 text-[#DAE6EA]/90 bg-[#07153B]/40 border-t border-[#EC3B3B]/20 transition-all duration-500 data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up"
            >
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default FaqsPage;