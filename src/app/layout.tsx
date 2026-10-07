import React from 'react';
import type { Metadata } from 'next';
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
  FALLBACK_METADATA_DESCRIPTION,
  FALLBACK_METADATA_TITLE,
  WEBSITE_AUTHOR,
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

export async function generateMetadata(): Promise<Metadata> {
  const globalContent = await getGlobalContentData();

  const title = globalContent?.title ?? FALLBACK_METADATA_TITLE;
  const description =
    globalContent?.description ?? FALLBACK_METADATA_DESCRIPTION;

  return {
    title,
    description,
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
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;

  const [websiteConfig, globalContent, jobTitle] = await Promise.all([
    getWebsiteConfigData(),
    getGlobalContentData(),
    getCurrentExperience(),
  ]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${baseUrl}/#person`,
        name: websiteConfig?.author ?? WEBSITE_AUTHOR,
        url: baseUrl,
        jobTitle: jobTitle?.title ?? '',
        sameAs: FALLBACK_SOCIAL_LINKS.map((link) => link.link) ?? [],
      },
      {
        '@type': 'WebSite',
        '@id': `${baseUrl}/#website`,
        url: baseUrl,
        name: FALLBACK_METADATA_TITLE,
        description:
          globalContent?.description ?? FALLBACK_METADATA_DESCRIPTION,
        inLanguage: 'en',
        publisher: { '@id': `${baseUrl}/#person` },
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
