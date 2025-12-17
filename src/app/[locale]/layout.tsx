'use cache'

import Footer from '@/components/footer/footer'
import Header from '@/components/header/header'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { ContactUsButton } from '@/components/contact-us-global/contact-us-global'
import ContactForm from '@/components/fomrs/contact-us-form'
import RestApiProvider from '@/service/tanstack/react-query.provider'
import { Metadata } from 'next'

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export const metadata: Metadata = {
  metadataBase: new URL('https://www.probouwstore.com'),
  title: {
    default: 'ProBouwStore — Premium Tiles & Materials',
    template: '%s | ProBouwStore',
  },
  description: 'High-quality tiles for floors and walls. Fast delivery, competitive pricing, and expert support.',
  openGraph: {
    siteName: 'ProBouwStore',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  return (
    <>
      <NextIntlClientProvider locale={locale}>
        <RestApiProvider>
          <Header locale={locale} />
          <ContactUsButton />
          <ContactForm />
          <div className='max-w-[1280px] flex items-center justify-center w-full mx-auto'>{children}</div>
          <Footer />
        </RestApiProvider>
      </NextIntlClientProvider>

      <ToastContainer position='top-right' theme='black' />
    </>
  )
}
