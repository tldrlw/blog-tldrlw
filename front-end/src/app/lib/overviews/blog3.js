import Overview from '@/components/overview';

export const frameworkExplanation = () => {
  const heading = 'Front-End Frameworks Overview';
  const description =
    'Front-end frameworks provide a structured way to build user interfaces (UI) by organizing code and improving development efficiency. In the past, developers had to write complex UI logic using plain or vanilla JavaScript, which was tedious and error-prone. Today, frameworks like React and Next.js offer pre-made code, reusable components, and advanced tools, making it much easier to create dynamic, interactive web applications without reinventing the wheel. These frameworks handle common tasks like state management, DOM manipulation, and routing, allowing developers to focus on building seamless user experiences.';
  const components = [
    {
      component: 'React.js',
      textBlocks: [
        'React.js is a JavaScript library developed by Facebook, designed for building interactive UIs. At its core, React allows developers to build UIs with reusable components that update efficiently when data changes. It uses a virtual DOM (Document Object Model), which means React tracks changes in the UI efficiently, updating only the parts of the page that need to change, making it faster than traditional approaches.',
        'React focuses solely on the view layer (UI), making it flexible to use with other libraries and frameworks for handling different aspects of a web application (like routing, state management, etc.). Developers choose React for its component-based architecture, where every part of the UI is a self-contained unit, making large applications easier to build and maintain.',
      ],
    },
    {
      component: 'Next.js',
      textBlocks: [
        'Next.js is a front-end framework built on top of React.js that simplifies building full-stack React applications. It extends React&apos;s capabilities by adding essential features like Server-Side Rendering (SSR), Static Site Generation (SSG), and API routes, all out of the box. Next.js provides everything you need to develop a web application, from routing and data fetching to deployment optimizations.',
        'In Next.js, with the App Router, routing is done through a file-based structure in the "app" directory. This is a new, more powerful approach compared to the traditional Pages Router. The App Router provides enhanced support for layouts, nested routes, and built-in features like server components and server-side actions. This allows for more flexible, scalable architectures. The App Router enables you to mix static and dynamic rendering seamlessly, empowering developers to build modern web applications with less effort.',
      ],
    },
    {
      component: 'SSR and SSG',
      textBlocks: [
        'Server-Side Rendering (SSR) refers to the process where the server generates the HTML for a web page on each request. This allows the content to be fully loaded when the page is delivered to the user&apos;s browser, improving Search Engine Optimization (SEO) and initial load times. In Next.js, SSR is particularly useful for pages that need up-to-date content or data fetched from an external API at the time of request.',
        'Static Site Generation (SSG), on the other hand, generates the HTML for a web page at build time. This means the content is pre-rendered into static files, which are then served to the user. Since these files don&apos;t need to be generated on each request, SSG is incredibly fast and efficient. It is ideal for pages where the content doesn&apos;t change often, such as blogs or marketing pages. Both SSR and SSG can be used in the same Next.js application, allowing developers to choose the most appropriate rendering strategy for each page.',
      ],
    },
    {
      component: '"Built on?"',
      textBlocks: [
        'Next.js is built on top of React.js, so you get all the benefits of React (like its component model and virtual DOM) with additional powerful features specific to Next.js. React provides the foundation for building UIs with components, while Next.js adds features like server-side rendering (SSR) and static site generation (SSG), which allow pages to be pre-rendered for better performance and SEO. With the new App Router, Next.js takes this further by allowing layouts and components to be shared across pages while using both client and server components.',
        'Both React and Next.js use the same component structure and state management, making it easy for developers already familiar with React to transition into Next.js. The App Router is designed to enhance React&apos;s component model by providing an easy way to manage pages, layouts, and data fetching strategies. This makes Next.js not just a front-end framework, but a full-stack one that simplifies both the development and deployment processes for modern applications.',
      ],
    },
    {
      component: 'Why Next.js?',
      textBlocks: [
        'Next.js stands out because of its built-in features that simplify many common challenges of modern web development. One of its most prominent features is the ability to switch between server-side rendering (SSR) and static site generation (SSG), both of which provide performance boosts and improve SEO by allowing content to be pre-rendered. With the App Router, Next.js introduces server components that allow you to mix client and server-side rendering seamlessly within the same component tree.',
        'The App Router also simplifies routing with a file-based structure, eliminating the need for a dedicated routing library. It provides nested layouts, allowing you to share layout components across different routes, which simplifies development. Moreover, Next.js has full-stack capabilities, including API routes and server-side actions, allowing you to handle both front-end and back-end logic in the same project. Combined with features like automatic code splitting, image optimization, and built-in support for fast deployments on platforms like Vercel, Next.js is an all-in-one solution for building modern web applications.',
      ],
    },
  ];
  const closing =
    'By combining the strengths of React.js with advanced features like server-side rendering, static site generation, and full-stack capabilities, Next.js empowers developers to build fast, scalable, and SEO-friendly applications. Its streamlined development experience, coupled with its focus on performance, makes it a popular choice for modern web development.';

  return (
    <section>
      <Overview
        heading={heading}
        description={description}
        components={components}
        closing={closing}
      ></Overview>
    </section>
  );
};
