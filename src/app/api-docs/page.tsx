'use client';

import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';
import { useMemo } from 'react';

const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });

export default function ApiDocsPage() {
  const url = useMemo(() => '/api/openapi', []);
  return (
    <div style={{ padding: 16 }}>
      <SwaggerUI url={url} docExpansion="list" defaultModelsExpandDepth={-1} />
    </div>
  );
}


