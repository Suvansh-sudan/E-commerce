import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { CategorySection } from "@/components/CategorySection";
import { ShopifyProductGrid } from "@/components/ShopifyProductGrid";
import { FeaturedSection } from "@/components/FeaturedSection";
import { NewsletterSection } from "@/components/NewsletterSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <CategorySection />
        <ShopifyProductGrid />
        <FeaturedSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
