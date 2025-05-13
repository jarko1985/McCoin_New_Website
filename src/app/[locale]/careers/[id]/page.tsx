// app/en/careers/[id]/page.tsx

import JobDetails from '@/components/careers/JobDetails'
import { availableJobs } from '../../../../../utils/data'


export default async function JobPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  // Await the params promise to get the route ID
  const { id } = await params
  const job = availableJobs.find(job => job.id.toString() === id)

  if (!job) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h1 className="text-3xl font-bold text-[#07153B]">Job not found</h1>
        <p className="text-[#07153B]/80 mt-4">
          The job you're looking for doesn't exist or has been removed.
        </p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <JobDetails job={job} />
    </div>
  )
}
