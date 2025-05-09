import LegalHeader from '@/components/shared/LegalHeader'
import TermsContent from '@/components/terms-and-conditions/TermsContent';
import React from 'react'

const TermsAndConditionsPage = () => {
  return (
    <div>
        <LegalHeader title1='MCCOIN' title2='TERMS OF USE' description='Last Updated: 20 November 2023 | Effective Date: 20 November 2023'/>
        <TermsContent/>
    </div>
  )
}

export default TermsAndConditionsPage;