import type { Metadata, Viewport } from 'next';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#050811',
  colorScheme: 'dark',
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'NeuralFlow AI - Intelligent Data Automation Platform',
  description:
    'Transform your data pipelines with AI-driven automation. NeuralFlow connects 200+ sources, auto-heals pipelines, and scales to petabytes in minutes.',
  keywords: [
    'AI data automation',
    'data pipeline platform',
    'ML orchestration',
    'data engineering',
    'ETL automation',
    'real-time analytics',
    'AI SaaS platform',
  ],
  authors: [{ name: 'NeuralFlow, Inc.' }],
  creator: 'NeuralFlow',
  publisher: 'NeuralFlow',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'NeuralFlow AI',
    title: 'NeuralFlow AI - Intelligent Data Automation Platform',
    description:
      'Automate your entire data operation with AI. Self-healing pipelines, predictive analytics, and 200+ native connectors. Start free today.',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'NeuralFlow AI Platform Dashboard',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@neuralflow_ai',
    creator: '@neuralflow_ai',
    title: 'NeuralFlow AI - Intelligent Data Automation Platform',
    description:
      'Automate your entire data operation with AI. Self-healing pipelines, predictive analytics, and 200+ native connectors.',
    images: ['/og-image.svg'],
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.svg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'NeuralFlow AI',
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'Web',
              offers: {
                '@type': 'AggregateOffer',
                priceCurrency: 'USD',
                lowPrice: '29',
                highPrice: '199',
              },
              description:
                'AI-driven data automation platform for modern data teams. Self-healing pipelines, predictive analytics, and 200+ connectors.',
              url: siteUrl,
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.9',
                reviewCount: '847',
              },
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
