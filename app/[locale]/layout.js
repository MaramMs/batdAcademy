import { Poppins, Cairo } from "next/font/google";
import "./globals.css";
import TopNavBar from "@/components/layout/TopNavBar";
import MainNavBar from "@/components/layout/MainNavBar";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Footer from "@/components/layout/Footer";
import { Toaster } from "sonner";
import { Suspense } from "react";
import RouteProgressBar from "@/components/common/RouteProgressBar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});
const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://batd-academy.vercel.app"),
  title: "British Academy for Training & Development",
  description: "British Academy for Training & Development website",
  openGraph: {
    type: "website",
    title: "British Academy for Training & Development",
    description: "British Academy for Training & Development website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};
export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children, params }) {
  const { locale } = await params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  const bodyClassName = locale === "ar" ? cairo.className : poppins.className;

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body className={bodyClassName}>
        <NextIntlClientProvider messages={messages}>
          <Suspense fallback={null}>
            <RouteProgressBar />
          </Suspense>
          <TopNavBar />
          <MainNavBar />
          <main id="main-content" tabIndex={-1}>
            {children}
            <Toaster position="top-center" richColors />
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
