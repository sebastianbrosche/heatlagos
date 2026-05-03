import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import Script from "next/script";
import SchemaMarkup from "@/components/SchemaMarkup";
import "./globals.css";

const GTM_ID = "GTM-5WTJ6L62";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const serif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.heatlagos.com"),
  title: {
    default: "Heat Lagos — Infrared Pilates, Yoga & Recovery in Lagos, Portugal",
    template: "%s | Heat Lagos",
  },
  description:
    "Infrared-heated Pilates, Yoga, Sculpt, Mobility & Recovery in Lagos, Portugal. English-speaking studio for active expats and residents across the Algarve — Luz, Burgau, Portimão.",
  keywords: [
    "infrared yoga Lagos",
    "infrared pilates Lagos",
    "hot yoga Lagos",
    "hot pilates Algarve",
    "heated yoga Portugal",
    "yoga Lagos Portugal",
    "pilates Lagos Portugal",
    "yoga Portimão",
    "pilates Luz",
    "yoga Burgau",
    "mobility class Lagos",
    "recovery yoga surfers",
    "yin yoga Lagos",
    "English yoga Algarve",
    "expat fitness Algarve",
  ],
  applicationName: "Heat Lagos",
  authors: [{ name: "Heat Lagos" }],
  creator: "Heat Lagos",
  publisher: "Heat Lagos",
  category: "Health & Wellness",
  alternates: {
    canonical: "/",
    languages: {
      "en-PT": "/",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_PT",
    url: "https://www.heatlagos.com/",
    siteName: "Heat Lagos",
    title: "Heat Lagos — Infrared Pilates, Yoga & Recovery in Lagos, Portugal",
    description:
      "Infrared-heated Pilates, Yoga, Sculpt, Mobility & Recovery in Lagos. English-speaking classes for active expats and residents across the Algarve.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Heat Lagos — Infrared Pilates, Yoga & Recovery in Lagos, Portugal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Heat Lagos — Infrared Pilates, Yoga & Recovery",
    description:
      "Infrared-heated Pilates, Yoga, Sculpt, Mobility & Recovery in Lagos, Portugal. English-speaking studio.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${serif.variable} antialiased`}>
      <head>
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
        <SchemaMarkup />
      </head>
      <body className="min-h-screen bg-background text-foreground">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
