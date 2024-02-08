import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500",  "700" , "900" ],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Evenlty",
  description: "Evently is a platform  for event management.",
  keywords: ["Food Store", "Organick", "fruits", "vegetables"  , "nuts" , "organic" ,  ],

}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>

    <html lang="en">
      <body className={roboto.variable}>{children}</body>
    </html>
    </ClerkProvider>
  );
}