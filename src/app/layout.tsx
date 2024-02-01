import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "./globals.css";
// import Navbar from "@/components/Navbar";
import ReactQueryProvider from "@/providers/ReactQueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Test Cuaca",
  description: "Test Frontend Developer DOT INDONESIA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="min-h-screen">
        {/* <Navbar location={data?.city.name} /> */}
          <ReactQueryProvider>
            <div className="flex justify-center items-center p-24">
              {children}
            </div>
          </ReactQueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
