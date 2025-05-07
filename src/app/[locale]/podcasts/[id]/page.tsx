import { notFound } from 'next/navigation';

type Podcast = {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    webUrl: string;
    totalEpisodes: number;
    author?: { name: string; email?: string };
    publisher?: { name: string };
    episodes?: {
      data: {
        id: string;
        title: string;
        airDate: string;
        length: number;
      }[];
    };
  };

export default async function PodcastDetailsPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }> 
}) {
  const { locale, id } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/api/podcasts/${id}`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) return notFound();

  const podcast: Podcast = await res.json();

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <img
          src={podcast.imageUrl}
          alt={podcast.title}
          className="w-48 h-48 rounded-lg object-cover shadow"
        />
        <div>
          <h1 className="text-3xl text-white font-bold mb-2">{podcast.title}</h1>
          <p className="text-[#DAE6EA] mb-2">By {podcast.publisher?.name}</p>
          <p className="text-sm text-[#DAE6EA] mb-4">{podcast.description}</p>
          {Array.isArray(podcast.episodes?.data) && podcast.episodes.data.length > 0 && (
  <div className="mt-8">
    <h2 className="text-2xl text-white font-semibold mb-4">Latest Episodes</h2>
    <ul className="space-y-2">
      {podcast.episodes.data.map((ep) => (
        <li key={ep.id} className="border p-4 rounded shadow-sm">
          <h3 className="font-medium text-lg text-white">{ep.title}</h3>
          <p className="text-sm text-[#DAE6EA]">
            Aired: {new Date(ep.airDate).toLocaleDateString()} · Duration: {Math.floor(ep.length / 60)} mins
          </p>
        </li>
      ))}
    </ul>
  </div>
)}
        </div>
      </div>
    </main>
  );
}
