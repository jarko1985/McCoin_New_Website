import { BlocksRow } from '@/components/market-explorer/BlocksRow'
import BlocksTable from '@/components/market-explorer/BlocksTable'

const MarketExplorerPage = () => {
  return (
    <div className='mx-auto xl:w-[70%] py-12'>
    <BlocksRow/>
    <BlocksTable/>
    </div>
  )
}

export default MarketExplorerPage