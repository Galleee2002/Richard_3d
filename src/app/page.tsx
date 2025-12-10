import { FeaturedProductsSection } from "@/features/products/components/featured-products-section";
import { AboutUsSection } from "@/features/landing/components/about-us-section";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background theme-transition">
      <FeaturedProductsSection />
      <AboutUsSection />
    </main>
  );
}
