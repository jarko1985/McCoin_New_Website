// app/[locale]/careers/[id]/page.tsx

import JobDetails from '@/components/careers/JobDetails'
import { getTranslations } from 'next-intl/server'

export default async function JobPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>
}) {
  // Await the params promise to get the route ID and locale
  const { id, locale } = await params
  const t = await getTranslations('Careers.Jobs')
  
  // Get the available jobs from translations
  const availableJobs = t.raw('available_jobs')
  const job = availableJobs.find((job: any) => job.id.toString() === id)

  if (!job) {
    const tNotFound = await getTranslations('Careers.JobNotFound')
    return (
      <div className="container mx-auto py-12 text-center">
        <h1 className="text-3xl font-bold text-[#07153B]">{tNotFound('title')}</h1>
        <p className="text-[#07153B]/80 mt-4">
          {tNotFound('description')}
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
