import Footer from '../components/Footer';
import Gallery from '../components/Gallery';
import Hero from '../components/Hero';
import HomeServices from '../components/HomeServices';
import PromoBanner from '../components/PromoBanner';
import ServiceCard from '../components/ServiceCard';
import Testimonials from '../components/Testimonials';

export default function Home() {
  return (
    <main>
      <Hero />
      <HomeServices/>
      <PromoBanner/>
      <Gallery />
      <Testimonials />
      <Footer />
    </main>
  );
}