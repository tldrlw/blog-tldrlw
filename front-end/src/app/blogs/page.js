import Link from 'next/link';

export default function Blogs() {
  const blogs = [
    { title: 'Deploying a public Next.js app to AWS ECS', slug: 'blogs/1' },
    { title: 'AWS Next.js CRUD app (infrastructure)', slug: 'blogs/2' },
    { title: 'AWS Next.js CRUD app (front-end)', slug: 'blogs/3' },
  ];

  return (
    <main className='mb-6'>
      <h1 className='mb-4 underline md:text-lg'>Blogs</h1>
      <ul>
        {blogs.map((blog) => (
          <li
            key={blog.slug}
            className='mb-4 p-4 border-2 border-customOrangeLogo rounded-md hover:underline'
          >
            <Link href={`/${blog.slug}`} className='text-left block'>
              {blog.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}