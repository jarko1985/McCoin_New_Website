import React from 'react';
import { Metadata } from 'next';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { TicketsLayout } from '@/components/tickets';

export const metadata: Metadata = {
  title: 'Support Tickets | McCoin',
  description: 'Manage your support tickets and get help from our team',
};

export default async function TicketsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Get the current session
  const session = await auth();

  // Redirect to login if no session or user
  if (!session?.user?.id) {
    redirect(`/${locale}/login?callbackUrl=/${locale}/tickets`);
  }

  return (
    <div className="min-h-screen bg-[#07153B]">
      <TicketsLayout userId={session.user.id} locale={locale} />
    </div>
  );
}
