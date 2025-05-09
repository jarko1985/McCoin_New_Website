import RiskDisclosureContent from '@/components/risk-disclosure/RiskDisclosureContent'
import LegalHeader from '@/components/shared/LegalHeader'
const RiskDisclosurePage = () => {
  return (
    <div>
        <LegalHeader title1='MCCOIN' title2='RISK DISCLOSURE STATEMENT' description='Last updated: 16 May 2025...'/>
        <RiskDisclosureContent/>
    </div>
  )
}

export default RiskDisclosurePage