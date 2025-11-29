import { getTranslations } from 'next-intl/server'

const AboutSection = async () => {
  const t = await getTranslations('About')

  const sections = [
    t.rich('section1', {
      strong: (chunk) => <strong className='font-semibold'>{chunk}</strong>,
    }),
    t.rich('section2', {
      strong: (chunk) => <strong className='font-semibold'>{chunk}</strong>,
    }),
    t.rich('section3', {
      strong: (chunk) => <strong className='font-semibold'>{chunk}</strong>,
    }),
    t.rich('section4', {
      strong: (chunk) => <strong className='font-semibold'>{chunk}</strong>,
    }),
    t.rich('section5', {
      strong: (chunk) => <strong className='font-semibold'>{chunk}</strong>,
    }),
    t.rich('section6', {
      strong: (chunk) => <strong className='font-semibold'>{chunk}</strong>,
    }),
  ]

  return (
    <main className='mx-auto px-6 py-12 space-y-6'>
      <h1 className='text-3xl font-bold text-gray-900'>{t('title')}</h1>

      <ul className=' list-inside space-y-4 text-lg text-gray-700 leading-relaxed'>
        {sections.map((text, i) => (
          <li key={i}>{text}</li>
        ))}
      </ul>
    </main>
  )
}

export default AboutSection
