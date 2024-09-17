import Image from 'next/image';

export default function Consulting() {
  return (
    <main className='mb-6'>
      <h1 className='mb-2 underline md:mb-4 md:text-lg'>Consulting</h1>
      <section className='text-sm md:text-base'>
        <p className='mb-2 md:mb-4'>
          <span className='font-bold text-customOrangeLogo'>As</span> a software
          developer with a deep understanding of cutting-edge technologies like
          AWS, Terraform, Docker, and Next.js, I am committed to helping small
          businesses transform their operations through modern, scalable, and
          efficient software solutions. Whether it&apos;s building internal
          tools to streamline workflows, public-facing websites to enhance
          customer engagement, or automating processes to improve efficiency, I
          specialize in creating tailored solutions that meet the unique needs
          of small businesses across various industries.
        </p>
        <p className='mb-2 md:mb-4'>
          <span className='font-bold text-customOrangeLogo'>In</span> addition
          to building TLDRLW, a platform for motor racing enthusiasts, I am
          actively working on projects for two companies in Bangladesh, helping
          them streamline operations and foster growth through custom software
          solutions. For Radio Today Dhaka FM 89.6, I redesigned their
          public-facing website to be fully mobile-responsive, and added
          functionality that allows users to listen to a live feed of the radio
          broadcast. For Gulshan Club, I am developing a new platform for over
          500 members, enabling them to seamlessly book squash and tennis courts
          online—a significant improvement over the current process, which is
          handled via phone calls.
        </p>
        <div className='my-3 md:mb-4 md:flex md:flex-row md:items-start md:justify-center md:gap-x-4'>
          <div className='mb-4 flex flex-col items-center md:mb-0'>
            <Image
              src='/images/radiotodaydhaka-mobile.png' // Replace with your actual image URL
              alt='radiotodaydhaka screenshot'
              className='h-auto w-auto'
              width={1000}
              height={1000}
            />
            <a
              href='https://radiotodaydhaka.com'
              className='text-xs text-blue-500 hover:underline md:text-sm'
              target='_blank'
            >
              Radio Today Dhaka FM 89.6
            </a>
          </div>
          <div className='flex flex-col items-center'>
            <Image
              src='/images/gc-res-mobile.png' // Replace with your actual image URL
              alt='gc-res screenshot'
              className='h-auto w-auto'
              width={1000}
              height={1000}
            />
            <a
              href='https://gc-res.com'
              className='text-xs text-blue-500 hover:underline md:text-sm'
              target='_blank'
            >
              Gulshan Club Recreation Reservations
            </a>
          </div>
        </div>
        <p className='mb-2 md:mb-4'>
          <span className='font-bold text-customOrangeLogo'>While </span>
          managing multiple initiatives, I ensure that each project receives the
          attention and focus it requires to deliver value. In doing so, I
          consistently identify synergies between projects, allowing me to build
          a powerful toolkit of software and cloud methodologies that can be
          applied across different projects. By creating modular systems for
          front-end code, cloud infrastructure and deployments, I&apos;m able to
          implement scalable, efficient solutions that enhance my own
          productivity and adaptability. This approach not only strengthens my
          ability to deliver on current projects in a timely manner, but also
          positions me well for new opportunities. I&apos;m always eager to
          apply new tooling discoveries and modular systems to more
          applications, continuously refining and expanding my expertise to help
          small businesses scale effectively.
        </p>
        <p className='mb-2 md:mb-4'>
          <span className='font-bold text-customOrangeLogo'>Small</span>{' '}
          businesses are the backbone of the U.S. economy, and I have a strong
          desire to help them thrive. Having grown up watching my Dad, a
          dedicated entrepreneur, start and run multiple businesses throughout
          his career, I&apos;ve developed a deep affinity for small business
          owners and the unique challenges they face. I understand the grit,
          determination, and creativity it takes to keep a small business
          running, and I&apos;m passionate about using technology to support
          their success.
        </p>
      </section>
      <h1 className='mb-2 underline md:mb-4 md:text-lg'>
        Why <span className='italic'>small</span> businesses?
      </h1>
      <section className='text-sm md:text-base'>
        <p className='mb-2 md:mb-4'>
          <span className='font-bold text-customOrangeLogo'>I</span> also
          believe that small businesses provide a level of flexibility that
          corporate America often lacks. The traditional 9-5 office structure
          doesn&apos;t allow for the freedom that many people need to balance
          family, health, and other personal commitments. Well-managed small
          businesses offer the liberty to work when it best fits your life—after
          you&apos;ve met your obligations to loved ones or taken care of your
          well-being.
        </p>
        <p className='mb-2 md:mb-4'>
          <span className='font-bold text-customOrangeLogo'>That&apos;s</span>{' '}
          one of the key reasons <span className='italic'>I&apos;m</span>{' '}
          pursuing this path myself, and why I want to help others build wealth
          and create sustainable livelihoods on their own terms. Moreover, I
          believe that the flexibility gained by modern small business owners
          will funnel down to their employees, as owners realize how much more
          productive they are with this flexibility and will want to extend the
          same opportunity to their teams. This allows employees to become more
          productive while living better and more balanced lives.
        </p>
        <p className='mb-2 md:mb-4'>
          <span className='font-bold text-customOrangeLogo'>I&apos;m</span>{' '}
          passionate about learning more about the unique challenges small
          businesses face, particularly when it comes to bottlenecks that slow
          down operations and reduce efficiency. By understanding these pain
          points, I can implement software-based automation that streamlines
          day-to-day tasks, leading to higher employee productivity and improved
          profit margins. My goal is to partner with small businesses to
          identify opportunities for improvement, providing solutions that not
          only increase operational efficiency but also position them for
          sustained success in an increasingly competitive market.
        </p>
        <p className='mb-2 md:mb-4'>
          <span className='font-bold text-customOrangeLogo'>With</span> a
          background in building software solutions for fast-moving industries,
          I understand the importance of staying agile and adaptable. My goal is
          to offer consulting services to small businesses, providing them with
          the tools and platforms they need to stay competitive in an
          increasingly digital world.{' '}
          <span className='font-bold'>
            Whether you're looking to build a public-facing website, optimize
            internal processes, or develop a custom software solution, I can
            help bring your vision to life with scalable, high-performance
            technology.
          </span>
        </p>
      </section>
    </main>
  );
}
