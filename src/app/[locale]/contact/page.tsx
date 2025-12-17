'use cache'

import { Breadcrumbs } from '@/components/bread-scrums/bread-scrums'
import { Metadata } from 'next'

import { getTranslations } from 'next-intl/server'

export const metadata: Metadata = {
  title: 'Contact ProBouwStore',
  description: 'Reach out to our team for product inquiries, quotes, or expert support.',
  openGraph: {
    title: 'Contact ProBouwStore',
    url: 'https://www.probouwstore.com/contact',
  },
}

export default async function ContactPage() {
  const t = await getTranslations('contact_page')

  return (
    <main className='mx-auto max-w-7xl px-[5%] w-full md:px-[2%] py-10 space-y-10'>
      <Breadcrumbs />

      <h1 className='text-3xl md:text-5xl font-semibold'>{t('title')}</h1>

      <p className='text-lg leading-relaxed'>{t('subtitle')}</p>

      <section className='grid md:grid-cols-2 gap-10'>
        <div className='space-y-4'>
          <h2 className='text-2xl font-semibold'>{t('details_title')}</h2>

          <p>
            <strong>{t('email_label')}:</strong>{' '}
            <a href={`mailto:${t('email_value')}`} className='text-blue-600 hover:underline'>
              {t('email_value')}
            </a>
          </p>

          <p>
            <strong>{t('phone_label')}:</strong>{' '}
            <a href={`tel:${t('phone_value')}`} className='text-blue-600 hover:underline'>
              {t('phone_value')}
            </a>
          </p>

          <p>
            <strong>{t('address_label')}:</strong> {t('address_value')}
          </p>

          <p>
            <strong>{t('hours_label')}:</strong>
            <br />
            {t('hours_week')}
            <br />
            {t('hours_sat')}
          </p>
        </div>
      </section>

      <section>
        <iframe
          className='w-full h-72 rounded-lg border'
          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2429.801467943813!2d4.8951683!3d52.3702157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c609c016de9e3f%3A0xe3d7cba9b09d5d8!2sAmsterdam!5e0!3m2!1sen!2snl!4v1234567890'
          loading='lazy'
          title={t('map_alt')}
        />
      </section>
    </main>
  )
}
