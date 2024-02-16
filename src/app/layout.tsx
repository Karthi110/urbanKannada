import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Urbanಕನ್ನಡ",
  description: "Dictionary for Urban People",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex flex-col min-h-screen bgimg">
          <Navbar />
          <div className="flex-grow flex-1">{children}</div>
          <Toaster position="top-center" richColors />
        </main>
      </body>
    </html>
  );
}
