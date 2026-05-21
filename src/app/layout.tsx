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

  return {
    title: globalContent.title || FALLBACK_METADATA_TITLE,
    description: globalContent.description || FALLBACK_METADATA_DESCRIPTION,
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
  const globalContent = await getGlobalContentData();

  return (
    <html lang="en">
      <body
        className={`${bebasNeue.variable} ${firaCode.variable} antialiased`}
      >
        <GlobalContentProvider value={globalContent}>
          <ToggleButtonsProvider>{children}</ToggleButtonsProvider>
        </GlobalContentProvider>
      </body>
    </html>
  );
}
