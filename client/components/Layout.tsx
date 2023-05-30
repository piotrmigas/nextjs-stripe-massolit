import Header from './Header';
import Footer from './Footer';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

type LayoutProps = {
  children?: ReactNode;
  title: string;
};

const Layout = ({ children, title }: LayoutProps) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <link rel='icon' href='/favicon.ico' />
        <meta property='og:url' content={router.pathname} key='ogurl' />
        <meta name='description' content='Massolit Books &amp; Bakery menu' />
        <meta property='og:type' content='website' />
        <meta property='og:image' content='/logo.jpg' />
        <meta property='og:description' content='Massolit Books &amp; Bakery menu' />
        <meta property='og:title' content={title} key='ogtitle' />
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
