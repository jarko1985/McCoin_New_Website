import BlocksRow from '@/components/market-explorer/BlocksRow';
import BlocksTable from '@/components/market-explorer/BlocksTable';
import Disclaimer from '@/components/market-explorer/Disclaimer';

const page = () => {
  return (
    <div>
      <BlocksRow />
      <BlocksTable />
      <Disclaimer />
    </div>
  );
};

export default page;
