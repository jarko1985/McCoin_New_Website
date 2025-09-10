import RiskDisclosureContent from '@/components/risk-disclosure/RiskDisclosureContent'
import LegalHeader from '@/components/shared/LegalHeader'
import { getTranslations } from 'next-intl/server'


const page = async () => {
  const t = await getTranslations('RiskDisclosure.header')
  return (
    <>
    <LegalHeader title1={t('title1')} title2={t('title2')} description={t('lastUpdated')}/>
    <RiskDisclosureContent/>
    </>
  )
}

export default page