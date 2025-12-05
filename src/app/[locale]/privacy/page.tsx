import { Breadcrumbs } from '@/components/bread-scrums/bread-scrums'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export const metadata: Metadata = {
  title: 'Privacy Policy — ProBouwStore',
  description:
    'Read how ProBouwStore collects, uses, and protects your personal data. Learn about cookies, data rights, and GDPR compliance.',
  openGraph: {
    title: 'Privacy Policy — ProBouwStore',
    description: 'Understand how we handle personal information and ensure data protection.',
    url: 'https://www.probouwstore.com/privacy',
    type: 'article',
    images: ['https://www.probouwstore.com/main-page/1.webp'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy — ProBouwStore',
    description: 'Learn about data privacy, cookies, and GDPR compliance.',
    images: ['https://www.probouwstore.com/main-page/1.webp'],
  },
}

export const dynamic = 'force-static'

export const revalidate = false

export default async function PrivacyPolicyPage() {
  const t = await getTranslations('privacy')

  return (
    <main className='mx-auto max-w-7xl px-[5%] md:px-[2%] py-10 space-y-8'>
      <header>
        <Breadcrumbs />

        <h1 className='text-3xl font-semibold mb-4'>{t('title')}</h1>
        <p className='leading-relaxed'>{t('intro')}</p>
      </header>

      {/* Section 1 */}
      <section>
        <h2 className='text-2xl font-semibold mb-3'>{t('section1.title')}</h2>
        <p className='leading-relaxed mb-4'>{t('section1.subtitle')}</p>

        {/* 1.1 Public Relations */}
        <div className='space-y-3'>
          <h3 className='text-xl font-semibold'>{t('section1.publicRelations.title')}</h3>

          <p className='font-medium'>{t('section1.publicRelations.categoriesTitle')}</p>

          <ul className='list-disc list-inside space-y-1'>
            {t.raw('section1.publicRelations.categories').map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <p className='leading-relaxed'>{t('section1.publicRelations.legalBasis')}</p>

          <p className='leading-relaxed'>{t('section1.publicRelations.text1')}</p>

          <p className='leading-relaxed'>{t('section1.publicRelations.text2')}</p>

          <p className='font-medium'>{t('section1.publicRelations.obtainInfoTitle')}</p>
          <ul className='list-disc list-inside space-y-1'>
            {t.raw('section1.publicRelations.obtainInfo').map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <p className='font-medium'>{t('section1.publicRelations.retentionTitle')}</p>
          <ul className='list-disc list-inside space-y-1'>
            {t.raw('section1.publicRelations.retention').map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <p className='font-medium'>{t('section1.publicRelations.disclosureTitle')}</p>
          <ul className='list-disc list-inside space-y-1'>
            {t.raw('section1.publicRelations.disclosure').map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        {/* 1.2 Agreements */}
        <div className='space-y-4 mt-6'>
          <h3 className='text-xl font-semibold'>{t('section1.agreements.title')}</h3>

          {/* 1.2.1 Agreements with natural persons */}
          <div className='space-y-3'>
            <h4 className='text-lg font-semibold'>{t('section1.agreements.naturalPersons.title')}</h4>

            <p className='font-medium'>{t('section1.agreements.naturalPersons.categoriesTitle')}</p>
            <ul className='list-disc list-inside space-y-1'>
              {t.raw('section1.agreements.naturalPersons.categories').map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <p className='font-medium'>{t('section1.agreements.naturalPersons.legalBasisTitle')}</p>
            <ul className='list-disc list-inside space-y-1'>
              {t.raw('section1.agreements.naturalPersons.legalBasis').map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <p className='font-medium'>{t('section1.agreements.naturalPersons.purposesTitle')}</p>
            <ul className='list-disc list-inside space-y-1'>
              {t.raw('section1.agreements.naturalPersons.purposes').map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <p className='font-medium'>{t('section1.agreements.naturalPersons.mandatoryTitle')}</p>
            <ul className='list-disc list-inside space-y-1'>
              {t.raw('section1.agreements.naturalPersons.mandatory').map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <p className='font-medium'>{t('section1.agreements.naturalPersons.retentionTitle')}</p>
            <ul className='list-disc list-inside space-y-1'>
              {t.raw('section1.agreements.naturalPersons.retention').map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <p className='font-medium'>{t('section1.agreements.naturalPersons.disclosureTitle')}</p>
            <ul className='list-disc list-inside space-y-1'>
              {t.raw('section1.agreements.naturalPersons.disclosure').map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* 1.2.2 Invoices */}
          <div className='space-y-3'>
            <h4 className='text-lg font-semibold'>{t('section1.agreements.invoices.title')}</h4>

            <p className='font-medium'>{t('section1.agreements.invoices.categoriesTitle')}</p>
            <ul className='list-disc list-inside space-y-1'>
              {t.raw('section1.agreements.invoices.categories').map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <p className='font-medium'>{t('section1.agreements.invoices.legalBasisTitle')}</p>
            <ul className='list-disc list-inside space-y-1'>
              {t.raw('section1.agreements.invoices.legalBasis').map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <p className='font-medium'>{t('section1.agreements.invoices.purposesTitle')}</p>
            <ul className='list-disc list-inside space-y-1'>
              {t.raw('section1.agreements.invoices.purposes').map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <p className='font-medium'>{t('section1.agreements.invoices.mandatoryTitle')}</p>
            <ul className='list-disc list-inside space-y-1'>
              {t.raw('section1.agreements.invoices.mandatory').map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <p className='font-medium'>{t('section1.agreements.invoices.retentionTitle')}</p>
            <ul className='list-disc list-inside space-y-1'>
              {t.raw('section1.agreements.invoices.retention').map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <p className='font-medium'>{t('section1.agreements.invoices.disclosureTitle')}</p>
            <ul className='list-disc list-inside space-y-1'>
              {t.raw('section1.agreements.invoices.disclosure').map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section>
        <h2 className='text-2xl font-semibold mb-3'>{t('section2.title')}</h2>
        <p className='leading-relaxed'>{t('section2.text')}</p>

        <h3 className='text-lg font-semibold mt-3'>{t('section2.companiesTitle')}</h3>
        <ul className='list-disc list-inside space-y-1'>
          {t.raw('section2.companies').map((item: string, index: number) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <h3 className='text-lg font-semibold mt-3'>{t('section2.governmentTitle')}</h3>
        <ul className='list-disc list-inside space-y-1'>
          {t.raw('section2.government').map((item: string, index: number) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      {/* Section 3 */}
      <section>
        <h2 className='text-2xl font-semibold mb-3'>{t('section3.title')}</h2>
        <p className='leading-relaxed'>{t('section3.text')}</p>
      </section>

      {/* Section 4 */}
      <section>
        <h2 className='text-2xl font-semibold mb-3'>{t('section4.title')}</h2>
        <p className='leading-relaxed'>{t('section4.intro')}</p>

        <ul className='list-disc list-inside space-y-1'>
          {t.raw('section4.rights').map((item: string, index: number) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <p className='leading-relaxed mt-3'>{t('section4.finalText1')}</p>
        <p className='leading-relaxed mt-2'>{t('section4.finalText2')}</p>
      </section>

      {/* Section 5 */}
      <section>
        <h2 className='text-2xl font-semibold mb-3'>{t('section5.title')}</h2>
        <p className='leading-relaxed'>{t('section5.text')}</p>
      </section>
    </main>
  )
}
