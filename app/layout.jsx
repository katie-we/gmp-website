import './globals.css';
import '../styles/themes.css';
import '../styles/v6.css';
import '../styles/v6-pages.css';
import '../styles/v6-mobile.css';
import '../styles/v6-work-with-me.css';
import '../styles/field-guide-modal.css';
import { GoogleAnalytics } from '@next/third-parties/google';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata = {
  metadataBase: new URL('https://growthmindsetparenting.com'),
  title: {
    default: 'Growth Mindset Parenting | Sean Kane',
    template: '%s | Growth Mindset Parenting',
  },
  description:
    'Practical, plainspoken parenting advice from a 14-year middle school teacher and father of three. Evidence-based skills for parents of kids ages 9–15.',
  openGraph: {
    siteName: 'Growth Mindset Parenting',
    type: 'website',
    locale: 'en_US',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: false, follow: false },
  alternates: {
    types: {
      'application/rss+xml': 'https://growthmindsetparenting.com/feed.xml',
    },
  },
  // Add verification only after connecting Search Console:
  // verification: { google: 'YOUR_CODE_HERE' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="theme-terracotta">
      <body>
        {children}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
