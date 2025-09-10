import LegalHeader from '@/components/shared/LegalHeader'
import TermsContent from '@/components/terms-and-conditions/TermsContent';
import { getTranslations } from 'next-intl/server'

const page = async () => {
  const t = await getTranslations('TermsAndConditions.header')
  return (
    <>
    <LegalHeader title1={t('title1')} title2={t('title2')} description={t('lastUpdated')}/>
    <TermsContent/>
    </>
  )
}

export default page