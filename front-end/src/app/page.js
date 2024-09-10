// import Image from "next/image";

export default function Home() {
  const buildTime =
    process.env.NEXT_PUBLIC_BUILD_TIME || "build time placeholder";
  const image =
    process.env.NEXT_PUBLIC_IMAGE || "image path and tag placeholder";

  return (
    <main>
      <p>
        {buildTime} / {image}
      </p>
    </main>
  );
}
