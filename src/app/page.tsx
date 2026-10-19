import { type Metadata } from 'next';

// @sanity
import { getGlobalContentData } from '@/_sanity/utils/content';
import { getWebsiteConfigData } from '@/_sanity/utils/website';
// components
import CursorEffect from '@/components/cursor-effect';
import { LoadingScreen } from '@/components/loading-screen';
// constants
import {
  BASE_URL,
  DEFAULT_WEBSITE_DESCRIPTION,
  DEFAULT_WEBSITE_NAME,
} from '@/constants/meta';
import { PATHS } from '@/constants/paths';
// sections
import ContactView from '@/sections/contact/view';
import HomeView from '@/sections/home/view';
import ProjectView from '@/sections/project/view';

// ----------------------------------------------------------------------

export async function generateMetadata(): Promise<Metadata> {
  const [websiteConfig, globalContent] = await Promise.all([
    getWebsiteConfigData(),
    getGlobalContentData(),
  ]);

  const title = globalContent?.title || DEFAULT_WEBSITE_NAME;
  const description = globalContent?.description || DEFAULT_WEBSITE_DESCRIPTION;

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
      siteName: DEFAULT_WEBSITE_NAME,
      locale: 'en_US',
      ...(websiteConfig?.logo && {
        images: [
          {
            url: websiteConfig.logo,
            width: 512,
            height: 512,
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
  const globalContent = await getGlobalContentData();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${BASE_URL}/#webpage`,
    url: BASE_URL,
    name: globalContent?.title || DEFAULT_WEBSITE_NAME,
    description: globalContent?.description || DEFAULT_WEBSITE_DESCRIPTION,
    inLanguage: 'en',
    isPartOf: {
      '@id': `${BASE_URL}/#website`,
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
