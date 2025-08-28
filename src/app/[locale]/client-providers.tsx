'use client';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'react-hot-toast';

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
        {children}
        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            // Default options for all toasts
            duration: 4000,
            style: {
              background: '#1f2937',
              color: '#ffffff',
              border: '1px solid #374151',
              borderRadius: '8px',
              fontSize: '14px',
            },
            // Success toasts
            success: {
              style: {
                background: '#065f46',
                color: '#ffffff',
                border: '1px solid #10b981',
              },
              iconTheme: {
                primary: '#10b981',
                secondary: '#ffffff',
              },
            },
            // Error toasts
            error: {
              style: {
                background: '#7f1d1d',
                color: '#ffffff',
                border: '1px solid #ef4444',
              },
              iconTheme: {
                primary: '#ef4444',
                secondary: '#ffffff',
              },
            },
            // Loading toasts
            loading: {
              style: {
                background: '#1e40af',
                color: '#ffffff',
                border: '1px solid #3b82f6',
              },
            },
          }}
        />
      </ThemeProvider>
    </SessionProvider>
  );
}
