import { LocationProvider } from '@/context/LocationContext';
import { getLocation } from '@/lib/location';

export async function Providers({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Await the params Promise to get the locale
  const { locale } = await params;
  const serverLocation = await getLocation(locale);
  
  return (
    <LocationProvider serverLocation={serverLocation}>
      {children}
    </LocationProvider>
  );
}
