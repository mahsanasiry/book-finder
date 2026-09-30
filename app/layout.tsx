import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Book Finder",
  description: "Search for books using the Google Books API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}