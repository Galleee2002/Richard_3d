import { HeroSection } from "@/features/landing/components/hero-section";
import { FeaturedProductsSection } from "@/features/products/components/featured-products-section";
import { AboutUsSection } from "@/features/landing/components/about-us-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <main className="min-h-screen bg-background theme-transition">
        <FeaturedProductsSection />
        <AboutUsSection />
      </main>
    </>
  );
}
