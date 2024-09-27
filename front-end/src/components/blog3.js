import CodeBlock from '@/components/codeBlock';
import Link from 'next/link';
import { frameworkExplanation } from '@/app/lib/overviews/blog3';

const appPage = `
import ListMessages from "@/components/ListMessages";
import NewMessage from "@/components/NewMessage";
import UpdateMessage from "@/components/UpdateMessage";
import { Suspense } from "react";

export default function App() {
  const buildTime =
    process.env.NEXT_PUBLIC_BUILD_TIME || "build time placeholder";
  const image =
    process.env.NEXT_PUBLIC_IMAGE || "image path and tag placeholder";

  return (
    <main>
      <p>
        Docker image build time: <span className="italic">{buildTime}</span>
      </p>
      <p>
        ECR image path: <span className="italic">{image}</span>
      </p>
      <div className="my-6 flex items-center justify-center">
        <div className="container mx-auto grid grid-cols-2 gap-8">
          <div className="bg-gray-200 p-6 text-center">
            <Suspense fallback={<p>Loading messages...</p>}>
              <ListMessages></ListMessages>
            </Suspense>
          </div>
          <div className="space-y-4 bg-gray-200 p-6 text-center">
            <NewMessage></NewMessage>
            <UpdateMessage></UpdateMessage>
          </div>
        </div>
      </div>
    </main>
  );
}
`;

const listMessagesComponent = `
import getMessages from "@/services/getMessages";
import deleteMessage from "@/services/deleteMessage";

export default async function ListMessages() {
  const { data: messages } = await getMessages();
  // ^ getMessages() returns the following, so destructuring out "data" and renaming the array to "messages"
  // {
  //   "message": "Scan successful",
  //   "data": [
  //     {
  //       "PK": {
  //         "S": "3nh4zv269p"
  //       },
  //       "Message": {
  //         "S": "Anjuna Seaglass"
  //       },
  //       "DateTime": {
  //         "S": "2024-09-26T22:36:06.154Z"
  //       }
  //     }
  //   ]
  // }

  console.log(
    "front-end/src/components/ListMessages.js - # of messages - ",
    messages.length,
  );

  // Sort by DateTime in descending order (most recent first)
  const sortedMessages = messages.sort((a, b) => {
    const dateA = new Date(a.DateTime.S);
    const dateB = new Date(b.DateTime.S);
    return dateB - dateA; // Sort in descending order
  });

  function formatToHumanReadable(isoString) {
    const date = new Date(isoString);
    const options = {
      year: "numeric",
      month: "long", // Full month name (e.g., September)
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short", // Includes time zone (e.g., GMT)
    };
    // Format the date using Intl.DateTimeFormat
    return new Intl.DateTimeFormat("en-US", options).format(date);
  }

  return (
    <div>
      {sortedMessages.map((message, index) => (
        <div
          key={index}
          className="my-2 flex flex-row rounded-md border-2 border-solid border-green-500 p-2"
        >
          <div className="basis-5/6">
            <p className="font-bold">{message.Message.S}</p>
            <p>
              ID: <span className="italic">{message.PK.S}</span>
            </p>
            <p>{formatToHumanReadable(message.DateTime.S)}</p>
          </div>
          <div className="flex basis-1/6 justify-end pr-2">
            <form
              action={deleteMessage}
              // https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#forms
            >
              <input type="hidden" name="messageId" value={message.PK.S} />
              {/* To pass the messageId to your server action (deleteMessage) using a form, you can add a hidden input field inside the form.
              This hidden input will store the messageId value, which can then be accessed via formData.get('messageId') on the server side when the form is submitted. */}
              <button
                type="submit"
                className="my-2 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Delete
              </button>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
}
`;

const newMessageComponent = `
import putMessage from "@/services/putMessage";

export default function NewMessage() {
  return (
    <form
      action={putMessage}
      // https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#forms
      className="mx-auto mt-2 max-w-lg rounded-lg bg-green-100 p-4 shadow-md"
    >
      <div className="mb-4">
        <label htmlFor="message" className="block font-bold text-gray-700">
          Update a message
        </label>
        <div className="mt-4">
          <input
            type="text"
            name="id"
            id="id"
            className="mb-2 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500"
            placeholder="Type the existing message's id..."
          />
          <input
            type="text"
            name="message"
            id="message"
            className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500"
            placeholder="Type your updated message..."
          />
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="my-2 rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Update in AWS DynamoDB table
        </button>
      </div>
    </form>
  );
}
`;

const getMessagesServerAction = `
export default async function getMessages() {
  "use server";

  console.log("front-end/src/services/getMessage.js");

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const lambdaGetFunctionURL =
    "https://epixe36kvjo3pvtncrhafcak7y0tqsfx.lambda-url.us-east-1.on.aws/";

  let data;

  try {
    const response = await fetch(
      lambdaGetFunctionURL,
      { next: { tags: ["messages"] } },
      // https://nextjs.org/docs/app/api-reference/functions/revalidateTag
      // { tags: ["messages"] },
      // ^ also works, but not in docs above
      { cache: "no-store" },
      // ^ for NO caching
      // https://nextjs.org/docs/app/api-reference/functions/fetch#fetchurl-options
      // you can see differences between cached and non-cached API calls by configuring special logging in "next.config.mjs", comment out ^ and it'll log 'cache-hit'
      requestOptions,
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    data = await response.json();
    // console.log(
    //   "front-end/src/services/getMessage.js - API call successful",
    //   JSON.stringify(data, null, 2),
    // );
  } catch (error) {
    console.error(
      "front-end/src/services/getMessage.js - API call failed",
      error,
    );
  }

  return data;
}
`;

const putMessageServerAction = `
import { revalidateTag } from "next/cache";

export default async function putMessage(formData) {
  "use server";

  console.log("front-end/src/services/putMessage.js - formData", formData);

  const payload = {
    newMessage: formData.get("message"),
    messageId: formData.get("id"),
  };

  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };

  const lambdaPutFunctionURL =
    "https://fm4cuk7nbag4qdvmuxkzdeytge0vvrte.lambda-url.us-east-1.on.aws/";

  let data;

  try {
    const response = await fetch(lambdaPutFunctionURL, requestOptions);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    data = await response.json();
    console.log(
      "front-end/src/services/putMessage.js - API call successful",
      data,
    );
    revalidateTag("messages");
    // https://nextjs.org/docs/app/api-reference/functions/revalidateTag
    // https://www.youtube.com/watch?v=VBlSe8tvg4U
    // ^ using tags to revalidate the cache (i.e., getting the ListMessages component to make a new API call to get messages) is explained around 11:00
  } catch (error) {
    console.error(
      "front-end/src/services/putMessage.js - API call failed",
      error,
    );
  }

  return data;
}
`;

const title = 'AWS Next.js CRUD app (front-end)';
const date = 'Saturday, September 28, 2024';

export default function Blog3() {
  return (
    <main>
      <h1 className='mb-2 underline md:mb-4 md:text-lg'>{title}</h1>
      <p className='mb-2 text-sm font-light md:mb-4 md:text-base'>{date}</p>

      <section className='mb-2 text-sm text-gray-700 md:mb-4 md:text-base'>
        <p className='mb-2 md:mb-4'>
          In the{' '}
          <Link href='/blogs/2' className='text-blue-500 hover:underline'>
            prior blog
          </Link>
          , we created our AWS Lambda functions, and other ancillary resources
          like the DynamoDB table, using Terraform. Additionally, we tested out
          the functionality of our four Lambda functions (corresponding to the
          four RESTful actions) using Postman, and verified they perform as per
          expectations. Now we can start building out our front-end with
          Next.js. Before doing so, we need to take some time and understand
          what Next.js is and why it&apos;s become so popular over the last
          couple of years.
        </p>
        <p className='mb-2 md:mb-4'>
          Next.js is a front-end framework built on the already incredibly
          ubuquitous React.js, so what is a front-end framework and what does it
          mean for Next.js to be "built on" React.js?
        </p>
        <div className='my-4'>{frameworkExplanation()}</div>
        <p className='mb-2 md:mb-4'>
          Now that we understand what Next.js is (if not it'll make more sense
          as we build things out), let's get started building out our front-end.
          For reference, the finished project is available on my Github{' '}
          <a
            className='text-blue-500 hover:underline'
            href='https://github.com/tldrlw/aws-nextjs-crud-app'
          >
            here
          </a>
          , so if at any point, you struggle to follow along, please review the
          code for additional guidance. We&apos;ll start with the app page (
          <code>src/app/page.js</code>), and this serves as the entry point to
          your app. Here, we will render three separate components, one for
          listing out our messages (left), one for adding new messages (top
          right), and one to update an existing message (bottom right). Each of
          these components are defined inside{' '}
          <code>src/components/page.js</code>, and this is what makes working
          with Next.js (and React.js) so great, the fact that you can really
          modularize your code.
        </p>
        <CodeBlock
          filePath={'front-end/src/app/page.js'}
          filePathStyle={'text-customRed'}
          fileExtension={'js'}
          codeBlock={appPage}
        ></CodeBlock>
        <p className='my-2 md:my-4'>
          The CSS classes you see above are part of the Tailwind library, and
          when you{' '}
          <a
            href='https://nextjs.org/docs/getting-started/installation'
            className='text-blue-500 hover:underline'
          >
            create
          </a>{' '}
          a new Next.js app using <code>npx create-next-app@latest</code>, it
          comes baked-in. It&apos;s a terrific CSS framework, and I urge you to
          use it in your other projects. You&apos;ll also notice that I&apos;m
          using <code>Suspense</code>, it&apos;s a neat React feature that works
          by wrapping a component that performs an asynchronous action (e.g.
          fetch data), showing fallback UI (e.g. skeleton, spinner) while
          it&apos;s happening, and then swapping in your component once the
          action completes. Since the "ListMessages" component is set up to make
          an API call to one of our Lambda functions to fetch all messages in
          the DynamoDB table, <code>Suspense</code> is useful to display
          something else (e.g., like in our case, "Loading messages") while we
          wait on that API call to complete. Speaking of the "ListMessages"
          component, let&apos;s take a closer look at that.
        </p>
        <CodeBlock
          filePath={'front-end/src/components/ListMessages.js'}
          filePathStyle={'text-customRed'}
          fileExtension={'js'}
          codeBlock={listMessagesComponent}
        ></CodeBlock>
        <p className='my-2 md:my-4'>
          Starting from the top, the two import statements are making available
          the two Next.js{' '}
          <a
            href='https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations'
            className='text-blue-500 hover:underline'
          >
            server actions
          </a>{' '}
          (i.e., a special type of function) that will be executing API calls to
          our Lambda functions, one will be to the Lambda function that will
          provide all messages in the DynamoDB table, while the other will be to
          the Lambda function that deletes specific messages from the table.
          Server actions are asynchronous functions that are executed on the
          server. They can be called in server and client components to handle
          form submissions and data mutations. We will go into these server
          actions in the subsequent section, but these server actions will need
          to be accessible in this component. We could have defined the
          functions in the component itself, but it&apos;s cleaner to separate
          them out into separate files under the <code>services</code>{' '}
          directory.
        </p>
        <p className='mb-2 md:mb-4'>
          Next, inside the component function itself, we call one of the
          above-mentioned services, "getMessages", and it will make the API call
          to AWS and return an object in specific format. So to sift through the
          object returned, we can use{' '}
          <a href='ES6 destructuring' className='text-blue-500 hover:underline'>
            ES6 destructuring
          </a>{' '}
          to "destructure" out the data array from the object (and rename the
          array to "messages"), since that&apos;s all we care about when it
          comes to listing out the messages. While this gets us the messages
          that we can then list out, we want to make sure they are ordered
          chronologically by time of submission, so the "sortedMessages"
          function takes care of that. And the "formatToHumanReadable" function
          converts the date-time of submission from an <code>isoString</code> to
          a more human-readable format like{' '}
          <span className='italic'>"September 26, 2024 at 8:32:49 PM EDT"</span>
          . Storing date-time as ISO strings provides a standardized format that
          is universally recognized across systems, ensuring consistency and
          ease of use. Additionally, ISO strings handle time zones effectively
          and allow for easy sorting and comparison due to their lexicographical
          order.
        </p>
        <p className='mb-2 md:mb-4'>
          Now let's focus on the remaining bit, everything inside the{' '}
          <code>return</code> statement. But prior to that, let&apos;s
          understand what JSX is, because that is what renders HTML code but
          inside of a JavaScript function, JSX is what is encapsulated inside
          the <code>return</code> statement. JSX is a syntax extension for
          JavaScript that allows you to write HTML-like code within JavaScript,
          commonly used in libraries like React and frameworks like Next.js to
          define UI components. It simplifies the process of building
          interactive UIs by combining the declarative nature of HTML with the
          dynamic capabilities of JavaScript, which Next.js compiles and
          optimizes for server-side and client-side rendering.
        </p>
        <p className='mb-2 md:mb-4'>
          This code snippet renders a list of messages using the sortedMessages
          array, where each message is displayed inside a styled div container.
          The content includes the message text, its unique ID, and a
          human-readable formatted timestamp. Each message also includes a form
          with a “Delete” button. When the form is submitted, it calls a Next.js
          server action (deleteMessage) to delete the respective message from
          the backend, utilizing Next.js’s built-in mechanism for server actions
          via form submissions.
        </p>
      </section>

      <section className='mb-2 text-sm text-gray-700 md:mb-4 md:text-base'>
        <p className='mb-2 md:mb-4'>
          The "NewMessage" and "UpdateMessage" components, also being rendered
          in the app page (<code>src/app/page.js</code>), work in a similar
          fashion, albeit without the fetching of messages. These components are
          a little simpler, in the sense that they each just have a form that
          calls server actions "postMessage" and "putMessage" with{' '}
          <code>formData</code> as arguments. When updating messages the data
          passed in will be the unique ID of the existing message and the
          updated message, and when creating a new message, the passed in will
          just be the message itself.
        </p>
        <CodeBlock
          filePath={'front-end/src/components/NewMessage.js'}
          filePathStyle={'text-customRed'}
          fileExtension={'js'}
          codeBlock={newMessageComponent}
        ></CodeBlock>
        <p className='my-2 md:my-4'>
          Now having understood what the components are doing, let&apos;s
          understand the code in our server actions, and these are all defined
          in the <code>services</code> directory. We&apos;ll start with
          "getMessages" and then proceed to "putMessage".
        </p>
        <CodeBlock
          filePath={'front-end/src/services/getMessages.js'}
          filePathStyle={'text-customRed'}
          fileExtension={'js'}
          codeBlock={getMessagesServerAction}
        ></CodeBlock>
        <p className='my-2 md:my-4'>
          The getMessages function is a server action in Next.js, indicated by
          the "use server" directive, which ensures that the function runs
          exclusively on the server-side, keeping sensitive operations secure
          and out of the client’s reach. This function fetches data from our
          Lambda function and includes custom options for caching. The{' '}
          <code>&#123; cache: "no-store" &#125;</code> setting disables Next.js
          default caching, meaning that each time the function is called, it
          makes a fresh request to the API, bypassing any previously cached
          data. This is crucial for use cases where real-time or frequently
          updated data is needed, ensuring the data fetched is always current.
          Additionally, the function uses tag-based revalidation with the{' '}
          <code>&#123; next: &#123; tags: ["messages"] &#125; &#125;</code>{' '}
          option.
        </p>
        <p className='mb-2 md:mb-4'>
          By associating the fetch request with the "messages" tag, Next.js
          enables fine-grained control over cache invalidation. If data related
          to messages is updated elsewhere in the application (such as a message
          being added or deleted), the cache associated with the "messages" tag
          can be revalidated, ensuring that future requests pull in updated data
          rather than stale information. This tagging will ensure that any
          updates to messages{' '}
          <span className='italic'>
            (also addition and deletion of new messages, since this logic is in
            the "postMessage" and "deleteMessage" server actions as well)
          </span>{' '}
          triggers the "getMessages" server action to update the list of
          messages in our "ListMessages" component. This combination of
          server-side execution, cache control, and tag-based revalidation
          allows for secure, efficient data fetching while maintaining
          up-to-date content and improving performance in areas where data might
          not need to be fetched on every request.
        </p>
        <CodeBlock
          filePath={'front-end/src/services/putMessage.js'}
          filePathStyle={'text-customRed'}
          fileExtension={'js'}
          codeBlock={putMessageServerAction}
        ></CodeBlock>
        <p className='my-2 md:my-4'>
          The putMessage function is also server action, since we have the "use
          server" directive to ensure it runs on the server. It receives
          <code>formData</code> from the "UpdateMessage" component and extracts
          the message and ID fields using <code>formData.get("message")</code>{' '}
          and <code>formData.get("id")</code>. These values are then packaged
          into a payload with "newMessage" and "messageId" keys, which is sent
          to our Lambda function via a PUT request. This request updates the
          message in DynamoDB based on the provided message ID. Once the API
          call is successful, the function calls{' '}
          <code>revalidateTag("messages")</code>, and this causes any cache
          tagged with "messages" to be invalidated. As a result, the
          "getMessages" server action is called, and it will bypass the cache
          and fetch fresh data from DynamoDB (which, at this point, has our
          updated message). This ensures that the updated message data is
          immediately available to any components relying on the messages list,
          such as a ListMessages component, without requiring manual page
          refreshes. This approach keeps the data current and the user
          experience seamless by automatically reloading the most up-to-date
          information.
        </p>
      </section>

      <section className='mb-2 text-sm text-gray-700 md:mb-4 md:text-base'></section>

      <section className='mb-2 text-sm text-gray-700 md:mb-4 md:text-base'></section>

      {/* final section below */}
      <section className='mb-6 text-sm text-gray-700 md:mb-4 md:text-base'>
        <p className='mb-2 italic md:mb-4'>To be continued...</p>
      </section>
    </main>
  );
}
