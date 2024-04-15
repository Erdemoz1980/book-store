import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  weight:["400"],
  subsets: ['latin']
});

const inter = Inter({
  subsets:["latin"]
})

export const metadata: Metadata = {
  title: "Erdem Oz's Bookstore for BlazeSoft ",
  description: "Find 1000s of books",
  keywords:"Bookstore, e-commerce, shopping"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
