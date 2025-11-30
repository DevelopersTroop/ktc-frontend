import { DynamicAnalytics } from "@/components/shared/dynamic-analytics";
import Newsletter from "@/components/shared/newsletter";
import { CheckoutProvider } from "@/context/CheckoutContext";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Toaster } from "sonner";
import Footer from "./components/footer/footer";
import DiscountBanner from "./components/header/discount-banner";
import Header from "./components/header/header";
import TopHeaderOne from "./components/header/top-header";
import TopHeader from "./components/header/topheader";
import StoreProvider from "./globalRedux/store-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wheel Tire USA",
  description:
    "At WheelTireUSA, our goal is simple: deliver the best wheels, tires, and vehicle accessories with service you can rely on. We’re passionate about helping drivers upgrade their vehicles with confidence — whether it’s for style, performance, safety, or all three.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col justify-between antialiased`}
      >
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTMID}');
        `,
          }}
        />
        <StoreProvider>
          <CheckoutProvider>
            <TopHeaderOne />
            <TopHeader />
            <Header />
            <DiscountBanner />
            <main className="flex-1">{children}</main>
            <Footer />
            <Toaster richColors />
          </CheckoutProvider>
          <Newsletter />
          <DynamicAnalytics />
        </StoreProvider>
        <Script
          src="//code.tidio.co/ylns3q2pbrzhwklnx08n2v5oezbmhf7g.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
