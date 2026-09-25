import type { Metadata } from "next";
import "@mairie360/lib-components/dist/styles.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "E-mails | Mairie360",
  description: "Module de messagerie électronique Mairie360.",
  icons: {
    icon: [
      { url: "/favicon.ico?v=8dd52d5111b8", sizes: "192x192", type: "image/x-icon" },
      { url: "/mairie360-favicon.png?v=8dd52d5111b8", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/mairie360-logo.png?v=8dd52d5111b8", sizes: "192x192", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <meta name="apple-mobile-web-app-title" content="Mairie360" />
      </head>
      <body>{children}</body>
    </html>
  );
}
