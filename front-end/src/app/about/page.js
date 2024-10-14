import Image from 'next/image';
import { resizeImage } from '@/app/lib/utilities';

export default async function About() {
  const neweyToAMRDimensions = await resizeImage(
    'adrian-newey-joins-amr.webp',
    0.3,
  );

  return (
    <main className='mb-6'>
      <h1 className='mb-2 font-bold text-customOrangeLogo md:mb-4 md:text-lg'>
        Too Long Didn&apos;t Read{' '}
        <span className='!important italic'>Listen Watch</span>
      </h1>
      <h1 className='mb-2 underline md:mb-4 md:text-lg'>About</h1>
      <section className='mb-2 text-sm md:mb-4 md:text-base'>
        <p className='mb-2 text-gray-700 md:mb-4'>
          <span className='font-bold text-customOrangeLogo'>My</span> name is
          Refayat Haque, a 35-year-old software developer with a deep passion
          for motor racing. My love for technology and fast cars began early on.
          I vividly remember tinkering with computers as a child and spending
          weekends watching motor races, captivated by the engineering prowess
          and strategic brilliance that went into both the machines and the
          people behind them.
        </p>
        <p className='mb-2 text-gray-700 md:mb-4'>
          <span className='font-bold text-customOrangeLogo'>Dad</span> used to
          play re-runs of Formula 1 races to coax me into eating breakfast and
          getting ready for school. I would clap with excitement whenever the
          V10 Ferrari of Michael Schumacher roared by—a sound that defined an
          era in Formula 1. These early interests grew into more than just
          hobbies; they became integral to my life and work.
        </p>
        <p className='mb-2 text-gray-700 md:mb-4'>
          <span className='font-bold text-customOrangeLogo'>Over</span> the past
          seven years, I&apos;ve built a career in software development, working
          with a variety of cutting-edge technologies and gaining valuable
          experience across different domains. My professional journey has
          allowed me to combine my analytical mindset with my natural curiosity
          for problem-solving. In many ways, my love for software development is
          a natural extension of my childhood, where I spent countless hours
          playing with Legos, building, breaking, and rebuilding structures over
          and over again.
        </p>
        <p className='mb-2 text-gray-700 md:mb-4'>
          <span className='font-bold text-customOrangeLogo'>I</span> often took
          apart random appliances around the house, fascinated by how things
          worked, only to challenge myself to put them back together, often in a
          different way. That same spirit of curiosity and exploration drives my
          work today—whether it&apos;s writing code or designing complex
          systems. At the same time, my passion for Formula 1 has only
          intensified as I&apos;ve grown to understand the nuances of
          motorsport—from the aerodynamics of the cars to the intricate race
          strategies.
        </p>
        <p className='mb-2 text-gray-700 md:mb-4'>
          <span className='font-bold text-customOrangeLogo'>Even</span> now,
          I&apos;m completely captivated whenever I hear the roar of the
          turbo-hybrid V6 engines or when major developments in the sport are
          announced. For instance, the news of Adrian Newey—arguably the
          greatest designer and aerodynamicist in Formula 1 history—joining
          Aston Martin Racing in time for the new engine and aerodynamic
          regulations set to take effect in 2026 filled me with excitement.
          It&apos;s moments like these that rekindle my deep connection to the
          sport.
        </p>
        <div className='my-3 md:mb-4 md:flex md:flex-col md:items-center'>
          <Image
            src='/images/adrian-newey-joins-amr.webp' // Replace with your actual image URL
            alt='tldrlw logo'
            className='h-auto w-auto'
            width={neweyToAMRDimensions.width}
            height={neweyToAMRDimensions.height}
          />
          <p className='text-xs text-gray-700 md:text-sm'>
            Image credit:
            https://www.astonmartinf1.com/en-GB/news/gallery/in-pictures-adrian-newey-joins-aston-martin-aramco
          </p>
        </div>
        <p className='mb-2 text-gray-700 md:mb-4'>
          <span className='font-bold text-customOrangeLogo'>However,</span> as
          much as I love following Formula 1, I&apos;ve become increasingly
          frustrated with how social media platforms dominate the space for
          motorsports news and updates. The repetitive act of doomscrolling,
          where users are trapped in a cycle of negative and often irrelevant
          content, has made it difficult to stay focused on what truly matters.
        </p>
        <p className='mb-2 text-gray-700 md:mb-4'>
          <span className='font-bold text-customOrangeLogo'>Research</span>{' '}
          shows that excessive social media use can have significant negative
          impacts on mental health, with studies linking it to increased
          anxiety, depression, and feelings of loneliness. Younger generations
          are particularly vulnerable, as they spend more time online. A study
          found that teenagers who spend excessive hours on social media report
          higher levels of depression and anxiety compared to their peers who
          limit their usage.
        </p>
        <p className='mb-2 text-gray-700'>
          <span className='font-bold text-customOrangeLogo'>In</span> addition
          to the mental health concerns, social media overload has been shown to
          disrupt productivity and diminish attention spans. Constant
          notifications and the fear of missing out (FOMO) keep users tethered
          to their screens, making it challenging to stay focused on tasks. This
          effect is especially prominent among younger users, who often struggle
          to maintain balance between their digital lives and their real-world
          responsibilities.
        </p>
        <p className='mb-2 text-gray-700'>
          <span className='font-bold text-customOrangeLogo'>One</span> study
          highlighted that students with unrestricted access to social media
          experienced a decline in academic performance due to reduced
          concentration and multitasking inefficiency. Moreover, platforms
          encourage instant gratification, which can further erode the patience
          required for deep learning and critical thinking.
        </p>
      </section>

      {/* Vision Section */}
      <h1 className='mb-2 underline md:mb-4 md:text-lg'>Vision for TLDRLW</h1>
      <section className='mb-2 text-sm md:mb-4 md:text-base'>
        <p className='mb-2 text-gray-700 md:mb-4'>
          <span className='font-bold text-customOrangeLogo'>The</span> way
          social media is designed to foster engagement—by keeping users glued
          to endless feeds of information—often leads to feelings of anxiety,
          distraction, and dissatisfaction. Platforms like Facebook and
          Instagram employ algorithms that prioritize content aimed at
          increasing interaction, not necessarily quality.
        </p>
        <p className='mb-2 text-gray-700'>
          <span className='font-bold text-customOrangeLogo'>This</span> constant
          bombardment of curated content and sensationalist news can overwhelm
          users, leaving them mentally drained. Studies show that users who
          limit their time on platforms like Facebook and Instagram often
          experience better mental health outcomes, such as lower levels of
          anxiety and depression. Moreover, the “herd mentality” that social
          media promotes discourages critical thinking, making it difficult to
          step back and form independent opinions on important matters.
        </p>
        <p className='mb-2 text-gray-700'>
          <span className='font-bold text-customOrangeLogo'>These</span>{' '}
          platforms often reward sensationalist content, which further detracts
          from users&apos; ability to focus on quality information and real-time
          updates they actually care about. This creates a vicious cycle where
          important, thoughtful conversations are drowned out by viral content
          designed to manipulate emotions rather than inform.
        </p>
        <p className='mb-2 text-gray-700 md:mb-4'>
          <span className='font-bold text-customOrangeLogo'>Social</span> media
          has also been linked to reduced productivity, with users constantly
          distracted by notifications and updates. The pressure to stay
          connected or to not “miss out” keeps many of us in a constant state of
          interruption. Research shows that multitasking between social media
          and other tasks severely hampers our ability to concentrate and can
          even impair memory retention.
        </p>
        <p className='mb-2 text-gray-700'>
          <span className='font-bold text-customOrangeLogo'>This</span> lack of
          focus affects not just how we consume content, but also how we retain
          information, think creatively, and engage in meaningful activities.
          Over time, this fragmentation of attention can erode the patience and
          discipline required for deeper learning or complex problem-solving. I
          wanted to provide an alternative—a place where racing fans can immerse
          themselves in content without the added noise or distractions of
          social media.
        </p>
        <p className='mb-2 text-gray-700 md:mb-4'>
          <span className='font-bold text-customOrangeLogo'>With</span> these
          experiences in mind, I decided to start building TLDRLW—a platform
          designed for motor racing enthusiasts who are tired of the
          distractions and mental fatigue that social media induces. TLDRLW aims
          to be a one-stop hub where fans can get news, race results, insights,
          and trends, all in one place. You can check it out here at{' '}
          <a
            href='https://monza.tldrlw.com'
            target='_blank'
            className='text-blue-500 hover:underline'
          >
            monza.tldrlw.com
          </a>
          .
        </p>
        <p className='mb-2 text-gray-700'>
          <span className='font-bold text-customOrangeLogo'>My</span> goal is to
          continue developing an environment that allows users to engage with
          the content they care about, without getting sucked into the
          never-ending vortex of social media. Instead of superficial content
          tailored to keep users endlessly scrolling, TLDRLW will focus on
          providing meaningful, in-depth analysis and updates that enhance the
          user experience rather than detract from it. As the platform grows, I
          hope to create a space that fosters genuine passion for the sport
          while helping users break free from the distractions of modern digital
          life.
        </p>
      </section>

      <h1 className='mb-2 text-gray-900 underline md:mb-4 md:text-lg'>
        Building the platform
      </h1>
      <section className='mb-2 text-sm md:mb-4 md:text-base'>
        <p className='mb-2 text-gray-700 md:mb-4'>
          <span className='font-bold text-customOrangeLogo'>Beyond</span> racing
          content, I also want to share the tools and technologies that
          I&apos;ve been developing as part of this ongoing project. I&apos;m
          using industry-leading technologies like AWS for building apps and
          automation in the cloud, Terraform for provisioning infrastructure
          with just code, Docker for containerization, CI/CD (continuous
          integration/continuous delivery) pipelines to automate software
          delivery, and GitHub Actions to realize these pipelines as
          &apos;workflows&apos; that improve development and collaboration
          velocity.
        </p>
        <p className='mb-2 text-gray-700'>
          <span className='font-bold text-customOrangeLogo'>These</span> tools
          enable me to maintain a high level of automation and scalability,
          ensuring that the platform remains flexible and responsive to the
          ever-changing needs of its users. The blog will serve as a valuable
          resource for software engineers, aspiring entrepreneurs, and tech
          enthusiasts looking to learn more about these technologies. By
          documenting both the successes and challenges I encounter throughout
          this process, I hope to provide a transparent and informative look
          into modern software development practices.
        </p>
        <ul className='mb-2 list-inside text-gray-700 md:mb-4 md:list-disc'>
          <li>
            <strong>AWS:</strong> Best practices for deploying scalable,
            cloud-native applications.
          </li>
          <li>
            <strong>Terraform:</strong> Building, versioning, and automating
            infrastructure with ease.
          </li>
          <li>
            <strong>Docker:</strong> Streamlining development with containerized
            environments.
          </li>
          <li>
            <strong>CI/CD (GitHub Actions):</strong> Automating deployment
            pipelines and enabling continuous delivery.
          </li>
          <li>
            <strong>Next.js:</strong> Crafting fast, responsive web applications
            with React and server-side rendering.
          </li>
        </ul>
        <p className='mb-2 text-gray-700'>
          <span className='font-bold text-customOrangeLogo'>I</span> hope to
          share practical insights into how these technologies come together to
          power a robust, scalable platform like TLDRLW. By sharing my hands-on
          experience, I aim to provide real-world examples and solutions to
          common challenges, helping developers improve their workflows and
          better understand the technologies they use.
        </p>
        <p className='text-gray-700'>
          <span className='font-bold text-customOrangeLogo'>My</span> goal is
          for the blog to not only serve motor racing fans but also become a
          go-to resource for developers looking to overcome technical challenges
          and find innovative solutions for building their own platforms. I hope
          to foster a community where knowledge-sharing and collaboration are at
          the forefront, enabling others to build powerful, scalable
          applications with confidence.
        </p>
      </section>
    </main>
  );
}
