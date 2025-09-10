import PrivacyPolicyContent from '@/components/privacy-policy/PrivacyPolicyContent'
import LegalHeader from '@/components/shared/LegalHeader'
import { getTranslations } from 'next-intl/server'

const page = async () => {
  const t = await getTranslations('PrivacyPolicy.header')
  
  return (
    <>
    <LegalHeader title1={t('title1')} title2={t('title2')} description={t('lastUpdated')}/>
    <PrivacyPolicyContent/>
    </>
  )
}

export default page