import "./globals.css";

import type { Metadata } from "next";
import { ImageLoadingManager } from "@/components/image-loading-manager";
import { SiteShell } from "@/components/layout/site-shell";

export const metadata: Metadata = {
  metadataBase: new URL("https://interiorblindsandshutters.com.au"),

  title: {
    default: "Interior Blinds & Shutters",
    template: "%s | Interior Blinds & Shutters",
  },

  description:
    "Transform your Sydney home with custom-made blinds, shutters, curtains and awnings designed for style, privacy and comfort. Enjoy expert advice, professional installation and a free measure and quote from a trusted local team.",

  verification: {
    google: "VoGfS9smITVq3hQh2FiE1xTB0AFz8SnR8h7_bRRuyx0",
  },

  openGraph: {
    title: "Interior Blinds & Shutters",
    description:
      "Transform your Sydney home with custom-made blinds, shutters, curtains and awnings designed for style, privacy and comfort. Enjoy expert advice, professional installation and a free measure and quote from a trusted local team.",
    images: [
      {
        url: "/assets/images/social-share-branded.png",
        width: 1731,
        height: 909,
        alt: "Interior Blinds & Shutters — Beautiful light. Better privacy.",
      },
    ],
    siteName: "Interior Blinds & Shutters",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Interior Blinds & Shutters",
    description:
      "Transform your Sydney home with custom-made blinds, shutters, curtains and awnings designed for style, privacy and comfort. Enjoy expert advice, professional installation and a free measure and quote from a trusted local team.",
    images: ["/assets/images/social-share-branded.png"],
  },

  icons: {
    icon: [{ url: "/assets/logo-96.webp", type: "image/webp" }],
    shortcut: [{ url: "/assets/logo-96.webp", type: "image/webp" }],
    apple: [{ url: "/assets/logo-96.webp", type: "image/webp" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="js">
      <head>
        <link rel="stylesheet" href="/assets/fonts/fonts.css" />
        <link rel="stylesheet" href="/assets/css/styles.css" />
      </head>
      <body>
        <ImageLoadingManager />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
