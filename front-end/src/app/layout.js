import "./globals.css";

export const metadata = {
  title: "blog.tldrlw.com",
  description: "learn about tech powering *.tldrlw.com",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-helvetica antialiased">{children}</body>
    </html>
  );
}
