import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import Info from '../components/Info';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Menu from '../components/Menu/Menu';

export default function Home() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <ToastContainer hideProgressBar className='customToast' />
      <Layout title='Massolit Books &amp; Bakery'>
        <Hero />
        <Info />
        <Menu />
      </Layout>
    </motion.div>
  );
}
