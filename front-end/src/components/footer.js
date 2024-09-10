const Footer = () => {
  const buildTime =
    process.env.NEXT_PUBLIC_BUILD_TIME || "build time placeholder";
  const image = process.env.NEXT_PUBLIC_IMAGE || "image placeholder";

  return (
    <footer className="bg-customOrangeLogo py-5 text-customBlack md:py-6">
      <div className="container mx-auto flex w-full flex-col items-start justify-between text-xs md:flex-row md:text-base">
        <div className="ml-4 text-left md:ml-0">
          <p>
            &copy; {new Date().getFullYear()} blog.tldrlw.com. All rights
            reserved.
          </p>
        </div>
        <div className="ml-4 mt-3 text-left md:mt-0">
          <p>
            {buildTime} / {image}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;