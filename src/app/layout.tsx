import "./globals.css";

import type { Metadata } from "next";
import { ImageLoadingManager } from "@/components/image-loading-manager";
import { SiteShell } from "@/components/layout/site-shell";

export const metadata: Metadata = {
  metadataBase: new URL("https://Nuvora.vercel.app"),

  title: {
    default: "Interior Blinds & Shutters",
    template: "%s | Interior Blinds & Shutters",
  },

  description:
    "Nuvora is a modern template for sustainable architecture and real estate brands, featuring clean layouts, project showcases, and eco-focused storytelling to highlight green design, innovation, and responsible development.",

  openGraph: {
    title: "Interior Blinds & Shutters",
    description:
      "Nuvora is a modern template for sustainable architecture and real estate brands, featuring clean layouts, project showcases, and eco-focused storytelling.",
    images: ["/assets/images/Social-share.webp"],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Interior Blinds & Shutters",
    description:
      "Nuvora is a modern template for sustainable architecture and real estate brands, featuring clean layouts, project showcases, and eco-focused storytelling.",
    images: ["/assets/images/Social-share.webp"],
  },

  icons: {
    icon: [{ url: "/assets/logo.jpeg", type: "image/png" }],
    shortcut: [{ url: "/assets/logo.jpeg", type: "image/png" }],
    apple: [{ url: "/assets/logo.jpeg", type: "image/png" }],
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
