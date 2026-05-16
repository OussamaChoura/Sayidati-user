import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import CategoriesSection from '@/components/CategoriesSection';
import FeaturedProducts from '@/components/FeaturedProducts';
import Footer from '@/components/Footer';
import WebsiteJsonLd from '@/components/JsonLd/WebsiteJsonLd';

export default function HomePage() {
  return (
    <>
      <WebsiteJsonLd />
      <Navbar />
      <main>
        <HeroSection />
        <CategoriesSection />
        <FeaturedProducts />
      </main>
      <Footer />
    </>
  );
}
