import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: {
    default: "Felix Sarpong | Backend Software Engineer",
    template: "%s | Felix Sarpong",
  },
  description:
    "Backend Software Engineer specializing in fintech systems, distributed systems, and reliability.",
  openGraph: {
    title: "Felix Sarpong | Backend Software Engineer",
    description:
      "Backend Software Engineer specializing in fintech systems, distributed systems, and reliability.",
    type: "website",
  },
  metadataBase: new URL("https://felixsarpong.dev"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-slate-900 antialiased">
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
