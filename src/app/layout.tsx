import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Layout } from "@/components/layout/layout";
import { SEO_CONFIG } from "@/lib/constants";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: SEO_CONFIG.title,
  description: SEO_CONFIG.description,
  keywords: SEO_CONFIG.keywords,
  authors: [{ name: SEO_CONFIG.author }],
  creator: SEO_CONFIG.author,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SEO_CONFIG.siteUrl,
    title: SEO_CONFIG.title,
    description: SEO_CONFIG.description,
    siteName: SEO_CONFIG.title,
    images: [
      {
        url: SEO_CONFIG.image,
        width: 1200,
        height: 630,
        alt: SEO_CONFIG.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO_CONFIG.title,
    description: SEO_CONFIG.description,
    images: [SEO_CONFIG.image],
    creator: SEO_CONFIG.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${poppins.variable} font-inter antialiased`}
        style={{
          fontFamily: 'var(--font-inter), var(--font-poppins), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
        }}
      >
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
