import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ContactUsButton } from "@/components/contact-us-global/contact-us-global";
import ContactForm from "@/components/fomrs/contact-us-form";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <>
      <NextIntlClientProvider locale={locale}>
        <Header locale={locale} />
        <ContactUsButton />
        <ContactForm />
        <div className="max-w-[1280px] flex items-center justify-center w-full mx-auto">
          {children}
        </div>
      </NextIntlClientProvider>
      <ToastContainer position="top-right" theme="black" />
      <Footer />
    </>
  );
}
