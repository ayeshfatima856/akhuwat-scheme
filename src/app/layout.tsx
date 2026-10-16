import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Akhuwat Scheme - Be-sood Qarza Pakistan",
  description: "Akhuwat Scheme - Asaan be-sood qarza. Business Loan, Personal Loan, Agriculture Loan. Apply online today!",
  keywords: ["Akhuwat", "Loan", "Qarza", "Pakistan", "Business Loan"],
  authors: [{ name: "Akhuwat Scheme" }],
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${poppins.variable} antialiased`}
        style={{ fontFamily: "var(--font-poppins), sans-serif" }}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
