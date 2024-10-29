import './globals.css';
import Footer from '@/components/footer';
import Header from '@/components/header';
import Navbar from '@/components/navbar';

export const metadata = {
  title: 'AppDev, Cloud, DevSecOps & Formula 1 insights | tldrlw',
  description:
    'Discover the tech behind tldrlw, with guidance on building apps for business exposure, process automation, and security using Next.js, AWS Cloud, Terraform, and setting up CI/CD pipelines via GitHub Actions.',
};

// just to kick off workflow, will delete later

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
