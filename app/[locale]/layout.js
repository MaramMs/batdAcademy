import { Poppins, Cairo } from 'next/font/google';
import "./globals.css";
import TopNavBar from "@/components/layout/TopNavBar";
import MainNavBar from "@/components/layout/MainNavBar";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Footer from '@/components/layout/Footer';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600', '700'] });
const cairo = Cairo({ subsets: ['arabic'], weight: ['400', '600', '700'] });

export const metadata = {
  title: "British Academy for Training & Development",
  description: "British Academy for Training & Development website",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default async function RootLayout({ children, params }) {
  const { locale } = await params;
  
  if (!routing.locales.includes(locale)) {
    notFound();
  }


  const messages = await getMessages();

  const bodyClassName = locale === 'ar' ? cairo.className : poppins.className;

  return (
     <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
   
      <body className={bodyClassName}>
        <NextIntlClientProvider messages={messages}>
          <TopNavBar />
          <MainNavBar />
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
