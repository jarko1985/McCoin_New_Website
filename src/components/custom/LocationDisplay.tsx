'use client';

import { useLocation } from '@/context/LocationContext';
import { useParams } from 'next/navigation';

const labelsByLocale: Record<string, { detecting: string; retry: string; detect: string }> = {
  en: {
    detecting: 'Detecting location...',
    retry: 'Retry',
    detect: 'Detect my location',
  },
};

export default function LocationDisplay() {
  const { locale } = useParams() as { locale: string };
  const { location, isLoading, error, refresh } = useLocation();
  console.log(location);
  

  const localizedLabels = labelsByLocale[locale as string] ?? labelsByLocale['en'];

  if (isLoading && !location) {
    return <div className="text-sm text-gray-500">{localizedLabels.detecting}</div>;
  }

  if (error) {
    return (
      <div className="text-sm text-red-500">
        {error}
        <button
          onClick={refresh}
          className="ml-2 text-blue-500 hover:underline"
        >
          {localizedLabels.retry}
        </button>
      </div>
    );
  }

  if (!location) {
    return (
      <button
        onClick={refresh}
        className="text-sm text-blue-500 hover:underline"
      >
        {localizedLabels.detect}
      </button>
    );
  }

  return (
    <div className="text-sm">
      <span>
        {location.city}, {location.country}
      </span>
      <button
        onClick={refresh}
        className="ml-2 text-blue-500 hover:underline text-xs"
        title={localizedLabels.retry}
      >
        ↻
      </button>
    </div>
  );
}
