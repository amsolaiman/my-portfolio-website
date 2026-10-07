import type { Metadata } from 'next';

// @sanity
import { getGlobalContentData } from '@/_sanity/utils/content';
import { getWebsiteConfigData } from '@/_sanity/utils/website';
// components
import CursorEffect from '@/components/cursor-effect';
import { LoadingScreen } from '@/components/loading-screen';
// constants
import {
  FALLBACK_METADATA_DESCRIPTION,
  FALLBACK_METADATA_TITLE,
} from '@/constants/meta';
import { PATHS } from '@/constants/paths';
// sections
import ContactView from '@/sections/contact/view';
import HomeView from '@/sections/home/view';
import ProjectView from '@/sections/project/view';

// ----------------------------------------------------------------------

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;

export async function generateMetadata(): Promise<Metadata> {
  const [websiteConfig, globalContent] = await Promise.all([
    getWebsiteConfigData(),
    getGlobalContentData(),
  ]);

  const title = globalContent?.title ?? FALLBACK_METADATA_TITLE;
  const description =
    globalContent?.description ?? FALLBACK_METADATA_DESCRIPTION;

  return {
    title,
    description,
    alternates: {
      canonical: PATHS.root,
    },
    openGraph: {
      type: 'website',
      title,
      description,
      url: BASE_URL,
      siteName: FALLBACK_METADATA_TITLE,
      locale: 'en_US',
      ...(websiteConfig?.logo && {
        images: [
          {
            url: websiteConfig.logo,
            width: 512,
            height: 512,
            alt: 'Official brand logo',
          },
        ],
      }),
    },
    twitter: {
      card: 'summary',
      title,
      description,
      ...(websiteConfig?.logo && {
        images: [websiteConfig.logo],
      }),
    },
  };
}

export default async function App() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;

  const globalContent = await getGlobalContentData();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${baseUrl}/#webpage`,
    url: baseUrl,
    name: globalContent?.title ?? FALLBACK_METADATA_TITLE,
    description: globalContent?.description ?? FALLBACK_METADATA_DESCRIPTION,
    inLanguage: 'en',
    isPartOf: {
      '@id': `${baseUrl}/#website`,
    },
  };

  return (
    <>
      <script
        key="json-ld-webpage"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />

      <main className="relative h-svh w-screen overflow-hidden xl:h-screen">
        <LoadingScreen />

        <CursorEffect />

        <HomeView />

        <ProjectView />

        <ContactView />
      </main>
    </>
  );
}
