import CodeBlock from '@/components/codeBlock';

const title = 'BlogTemplate';
const date = 'Wednesday, September 18, 2024';

export default function BlogTemplate() {
  return (
    <main>
      <h1 className='mb-2 underline md:mb-4 md:text-lg'>{title}</h1>
      <p className='mb-2 text-sm font-light md:mb-4 md:text-base'>{date}</p>
      <section className='mb-2 text-sm text-gray-700 md:mb-4 md:text-base'></section>
      <section className='mb-6 text-sm text-gray-700 md:mb-4 md:text-base'>
        <p className='mb-2 italic md:mb-4'>Coming soon...</p>
      </section>
    </main>
  );
}
