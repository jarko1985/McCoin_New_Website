import { notFound } from 'next/navigation'
import { ArrowLeft, Hash, Clock, HardDrive, CircleDollarSign, Scale, Link as LinkIcon } from 'lucide-react'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'

interface BlockData {
  hash: string
  ver: number
  prev_block: string
  mrkl_root: string
  time: number
  bits: number
  fee: number
  nonce: number
  n_tx: number
  size: number
  block_index: number
  main_chain: boolean
  height: number
  weight: number
  tx: {
    hash: string
    size: number
    time: number
    fee: number
    result: number
  }[]
}

export default async function BlockDetails({ params }: { params: Promise<{ rawHash: string }>; }) {
  const { rawHash } = await params;
  const blockHash = rawHash.replace(/-/g, '');
  let blockData: BlockData | null = null

  try {
    const response = await fetch(`https://blockchain.info/rawblock/${blockHash}`)
    if (!response.ok) throw new Error('Block not found')
    blockData = await response.json()
  } catch (error) {
    notFound()
  }

  if (!blockData) return notFound()

  const formattedHash = `${blockData.hash.substring(0, 4)}-${blockData.hash.substring(blockData.hash.length - 4)}`
  const minedTime = new Date(blockData.time * 1000)
  const formattedTime = formatDistanceToNow(minedTime, { addSuffix: true })
  const totalSent = blockData.tx.reduce((sum, tx) => sum + (tx.result || 0), 0) / 1e8
  const totalFees = blockData.tx.reduce((sum, tx) => sum + (tx.fee || 0), 0) / 1e8

  return (
    <div className="min-h-screen bg-[#DAE6EA]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back button and title */}
        <div className="mb-8">
          <Link href="/market-explorer" className="flex items-center text-[#07153b] hover:text-[#EC3B3B] transition">
            <ArrowLeft className="mr-2" size={20} />
            <h1 className="text-2xl font-bold">Block #{blockData.height}</h1>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Block info */}
          <div className="lg:col-span-1 bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-6 text-[#07153b]">Block Information</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-[#EC3B3B]/10 p-2 rounded-full mr-4">
                  <Hash className="text-[#EC3B3B]" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Hash</p>
                  <p className="font-mono text-[#07153b] break-all">{formattedHash}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-[#EC3B3B]/10 p-2 rounded-full mr-4">
                  <Clock className="text-[#EC3B3B]" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Timestamp</p>
                  <p className="text-[#07153b]">{minedTime.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">{formattedTime}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-[#EC3B3B]/10 p-2 rounded-full mr-4">
                  <HardDrive className="text-[#EC3B3B]" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Size</p>
                  <p className="text-[#07153b]">{(blockData.size / 1024).toFixed(2)} KB</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-[#EC3B3B]/10 p-2 rounded-full mr-4">
                  <CircleDollarSign className="text-[#EC3B3B]" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Sent</p>
                  <p className="text-[#07153b]">{totalSent.toFixed(8)} BTC</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-[#EC3B3B]/10 p-2 rounded-full mr-4">
                  <Scale className="text-[#EC3B3B]" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Fees</p>
                  <p className="text-[#07153b]">{totalFees.toFixed(8)} BTC</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-[#EC3B3B]/10 p-2 rounded-full mr-4">
                  <LinkIcon className="text-[#EC3B3B]" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Transactions</p>
                  <p className="text-[#07153b]">{blockData.n_tx}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Transactions */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6 border-b border-[#DAE6EA]">
              <h2 className="text-xl font-semibold text-[#07153b]">Transactions ({blockData.n_tx})</h2>
            </div>

            <div className="divide-y divide-[#DAE6EA]">
              {blockData.tx.map((transaction) => {
                const txValue = transaction.result / 1e8
                const txFee = transaction.fee / 1e8
                const formattedTxHash = `${transaction.hash.substring(0, 6)}...${transaction.hash.substring(transaction.hash.length - 4)}`

                return (
                  <div key={transaction.hash} className="p-4 hover:bg-[#DAE6EA]/10 transition">
                    <Link href={`/tx/${transaction.hash}`} className="block">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="bg-[#EC3B3B]/10 p-2 rounded-full mr-3">
                            <Hash className="text-[#EC3B3B]" size={16} />
                          </div>
                          <div>
                            <p className="font-mono text-sm text-[#07153b]">{formattedTxHash}</p>
                            <p className="text-xs text-gray-500">
                              {new Date(transaction.time * 1000).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-[#07153b] font-medium">{txValue.toFixed(8)} BTC</p>
                          <p className="text-xs text-gray-500">Fee: {txFee.toFixed(8)} BTC</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}