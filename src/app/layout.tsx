import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://vespera.systems"),
  applicationName: "Vespera Systems",
  title: {
    default: "Vespera Systems | AI Trade-Timing Signals for Investment Teams",
    template: "%s | Vespera Systems",
  },
  description:
    "Vespera Systems, a Daniel Molloy Limited product, builds sector-specialised AI signals for investment timing, quant strategy tooling, and legal contract review for VC, private equity, and family office teams.",
  alternates: {
    canonical: "https://vespera.systems",
  },
  icons: {
    icon: [
      {
        url: "/brand/favicons/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/brand/favicons/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
    shortcut: "/brand/favicons/favicon-32x32.png",
    apple: [{ url: "/brand/icons/vespera-180.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    url: "https://vespera.systems",
    siteName: "Vespera Systems",
    title: "Vespera Systems | AI Trade-Timing Signals for Investment Teams",
    description:
      "Sector-specialised AI signals for investment timing, quant strategy tooling, and legal contract review — built for VC, private equity, and family office teams.",
    images: [
      {
        url: "/brand/icons/vespera-512.png",
        width: 512,
        height: 512,
        alt: "Vespera Systems mark",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Vespera Systems | AI Trade-Timing Signals for Investment Teams",
    description:
      "Sector-specialised AI signals for investment timing, quant strategy tooling, and legal contract review — built for VC, private equity, and family office teams.",
    images: ["/brand/icons/vespera-512.png"],
  },
};

export const viewport = {
  themeColor: "#050505",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full bg-[#050505] text-neutral-100 antialiased">
        <div className="relative flex min-h-screen flex-col overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.09),transparent_28%),linear-gradient(180deg,#050505_0%,#0a0a0a_48%,#050505_100%)]" />
          <div className="pointer-events-none absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px)] [background-size:5rem_5rem]" />
          <main className="relative z-10 flex min-h-screen flex-col">{children}</main>
        </div>
      </body>
    </html>
  );
}
