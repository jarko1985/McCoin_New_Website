import ContactForm from '@/components/forms/ContactForm';
import PATTERN from '@/../public/images/pattern-2.svg';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

const ContactPage = async () => {
  const t = await getTranslations('Contact');
  
  return (
    <section className="container mx-auto xl:w-[70%] py-12">
      <h1 className="text-[#07153B] dark:text-[#DAE6EA] lg:text-4xl text-xl text-center pb-4">
        {t('title')}
      </h1>
      <p className="text-[#07153B] dark:text-[#DAE6EA] text-center lg:text-xl text-lg pb-12">
        {t('subtitle')}
      </p>
      <ContactForm />
      <div className="w-full pt-12">
        <Image className="w-full" src={PATTERN} width={600} height={300} alt="Patten Image" />
      </div>
    </section>
  );
};

export default ContactPage;
