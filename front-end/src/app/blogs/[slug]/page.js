import Blog1 from '@/components/blog1';
import Blog2 from '@/components/blog2';
import Blog3 from '@/components/blog3';
import NotFound from '@/components/notFound'; // Fallback component

const SlugPage = async ({ params }) => {
  const { slug } = params;

  // You can now fetch data or perform any other server-side logic with the slug
  // Example: Fetch post data from an API or database based on the slug
  // const post = await fetch(`https://api.example.com/posts/${slug}`).then(res => res.json());

  // Define a mapping of slugs to components
  const componentsMap = {
    1: Blog1,
    2: Blog2,
    3: Blog3,
    // Add more slug-to-component mappings as needed
  };

  // Select the appropriate component based on the slug
  const ComponentToRender = componentsMap[slug] || NotFound;

  return (
    <div>
      <ComponentToRender />
    </div>
  );
};

export default SlugPage;
