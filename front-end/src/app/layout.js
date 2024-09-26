import './globals.css';
import Footer from '@/components/footer';
import Header from '@/components/header';
import Navbar from '@/components/navbar';

export const metadata = {
  title: 'AppDev, Cloud, DevSecOps & Formula1 insights | tldrlw',
  description:
    'Explore the tech behind tldrlw, with guidance on building apps for business exposure, process automation and security, using tools like Next.JS, the AWS Cloud, Terraform, and ensuring continuous integration and delivery via GitHub Actions.',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className='font-helvetica flex min-h-screen flex-col antialiased'>
        <Header></Header>
        <Navbar></Navbar>
        <div className='container mx-auto flex-grow px-4 py-2 md:px-0 md:py-4'>
          {children}
        </div>
        <Footer></Footer>
      </body>
    </html>
  );
}
