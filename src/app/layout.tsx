import React from 'react';
import type { Metadata } from 'next';
import { Bebas_Neue, Fira_Code } from 'next/font/google';
// styles
import 'lenis/dist/lenis.css';
import './globals.css';

// contexts
import { GlobalContentProvider } from '@/contexts/use-global-content';
import { ToggleButtonsProvider } from '@/contexts/use-toggle-buttons';
// utils
import { cn } from '@/utils/tw-merge';
import { getGlobalContentData } from '@/_sanity/utils/content';
// constants
import {
  FALLBACK_METADATA_DESCRIPTION,
  FALLBACK_METADATA_TITLE,
} from '@/constants/meta';

// ----------------------------------------------------------------------

const bebasNeue = Bebas_Neue({
  variable: '--font-bebas-neue',
  subsets: ['latin'],
  weight: '400',
});

const firaCode = Fira_Code({
  variable: '--font-fira-code',
  subsets: ['latin'],
});

// ----------------------------------------------------------------------

export async function generateMetadata(): Promise<Metadata> {
  const globalContent = await getGlobalContentData();

  const title = globalContent?.title ?? FALLBACK_METADATA_TITLE;
  const description =
    globalContent?.description ?? FALLBACK_METADATA_DESCRIPTION;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: FALLBACK_METADATA_TITLE,
      url: process.env.NEXT_PUBLIC_BASE_URL!,
      type: 'website',
    },
    icons: [
      {
        rel: 'icon',
        url: '/favicon/favicon.ico',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        url: '/favicon/favicon-16x16.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        url: '/favicon/favicon-32x32.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        url: '/favicon/apple-touch-icon.png',
      },
    ],
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const globalContent = (await getGlobalContentData()) ?? {
    title: FALLBACK_METADATA_TITLE,
    description: FALLBACK_METADATA_DESCRIPTION,
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: FALLBACK_METADATA_TITLE,
    url: process.env.NEXT_PUBLIC_BASE_URL!,
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>

      <body
        className={cn(bebasNeue.variable, firaCode.variable, 'antialiased')}
      >
        <GlobalContentProvider value={globalContent}>
          <ToggleButtonsProvider>{children}</ToggleButtonsProvider>
        </GlobalContentProvider>
      </body>
    </html>
  );
}
