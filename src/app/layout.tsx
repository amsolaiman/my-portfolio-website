import React from 'react';
import type { Metadata } from 'next';
import { Bebas_Neue, Fira_Code } from 'next/font/google';
// styles
import 'lenis/dist/lenis.css';
import './globals.css';

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

export const metadata: Metadata = {
  title: 'jasafanar portfolio',
  description:
    'Where design and engineering move as one——every detail with intent. No complexity. Just fast, clear and intentional frontend experiences.',
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bebasNeue.variable} ${firaCode.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
