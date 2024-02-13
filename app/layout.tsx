import type { Metadata } from "next";
import  { Toaster } from 'react-hot-toast';
import { Roboto } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500",  "700" , "900" ],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Organick",
  description: "Organick is a food store.",
  keywords: ["Food Store", "Organick", "fruits", "vegetables"  , "nuts" , "organic" , 'organick'  ],

}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>

    <html lang="en">
      <body className={roboto.variable}>
      <Toaster  position="top-right"
        toastOptions={{
          // Define default options
          duration: 2000,
          style: {
            background: '#EFF6F1',
            color: '#000',
          },

        }}      
/>
        {children}</body>
    </html>
    </ClerkProvider>
  );
}