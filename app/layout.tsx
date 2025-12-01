import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Models Usage Tracker",
  description: "Live tracking of the most used AI models",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
