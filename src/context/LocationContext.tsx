// context/LocationContext.tsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

type LocationData = {
  ip: string;
  country: string;
  countryCode: string;
  region: string;
  city: string;
} | null;

type LocationContextType = {
  location: LocationData;
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
};

const LocationContext = createContext<LocationContextType>({
  location: null,
  isLoading: true,
  error: null,
  refresh: async () => {},
});

export function LocationProvider({
  children,
  serverLocation,
}: {
  children: React.ReactNode;
  serverLocation: LocationData;
}) {
  const params = useParams();
  const locale = params.locale as string;
  const [location, setLocation] = useState<LocationData>(serverLocation);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/${locale}/api/location`);
      const data = await response.json();
      
      if (data.error) throw new Error(data.error);
      
      setLocation(data);
      localStorage.setItem('cachedLocation', JSON.stringify(data));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to refresh location');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!serverLocation) {
      const cached = localStorage.getItem('cachedLocation');
      if (cached) setLocation(JSON.parse(cached));
    }
  }, [serverLocation]);

  return (
    <LocationContext.Provider value={{ location, isLoading, error, refresh }}>
      {children}
    </LocationContext.Provider>
  );
}

export const useLocation = () => useContext(LocationContext);