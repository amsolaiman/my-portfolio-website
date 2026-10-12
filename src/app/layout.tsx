import React from 'react';
import { type Metadata } from 'next';
import { Bebas_Neue, Fira_Code } from 'next/font/google';
// styles
import 'lenis/dist/lenis.css';
import './globals.css';

// @sanity
import { getCurrentExperience } from '@/_sanity/utils/experience';
import { getGlobalContentData } from '@/_sanity/utils/content';
import { getWebsiteConfigData } from '@/_sanity/utils/website';
// constants
import { FALLBACK_SOCIAL_LINKS } from '@/constants/channel';
import {
  DEFAULT_WEBSITE_AUTHOR,
  DEFAULT_WEBSITE_DESCRIPTION,
  DEFAULT_WEBSITE_NAME,
} from '@/constants/meta';
// contexts
import { GlobalContentProvider } from '@/contexts/use-global-content';
import { ToggleButtonsProvider } from '@/contexts/use-toggle-buttons';
import { WebsiteConfigProvider } from '@/contexts/use-website-config';
// utils
import { cn } from '@/utils/tw-merge';

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

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(BASE_URL),
    title: DEFAULT_WEBSITE_NAME,
    description: DEFAULT_WEBSITE_DESCRIPTION,
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
  const [websiteConfig, globalContent, currentRole] = await Promise.all([
    getWebsiteConfigData(),
    getGlobalContentData(),
    getCurrentExperience(),
  ]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${BASE_URL}/#person`,
        name: websiteConfig?.author ?? DEFAULT_WEBSITE_AUTHOR,
        url: BASE_URL,
        sameAs: FALLBACK_SOCIAL_LINKS.map((link) => link.link),
        ...(currentRole && { jobTitle: currentRole.title }),
      },
      {
        '@type': 'WebSite',
        '@id': `${BASE_URL}/#website`,
        url: BASE_URL,
        name: DEFAULT_WEBSITE_NAME,
        description: DEFAULT_WEBSITE_DESCRIPTION,
        inLanguage: 'en',
        publisher: {
          '@id': `${BASE_URL}/#person`,
        },
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          key="json-ld-layout"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
          }}
        />
      </head>

      <body
        className={cn(bebasNeue.variable, firaCode.variable, 'antialiased')}
      >
        <WebsiteConfigProvider value={websiteConfig}>
          <GlobalContentProvider value={globalContent}>
            <ToggleButtonsProvider>{children}</ToggleButtonsProvider>
          </GlobalContentProvider>
        </WebsiteConfigProvider>
      </body>
    </html>
  );
}
