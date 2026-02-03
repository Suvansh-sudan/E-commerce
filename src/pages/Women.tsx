import { Header } from "@/components/Header";
import { ProductSection } from "@/components/ProductSection";
import { Footer } from "@/components/Footer";

export default function Women() {
  return (
    <>
      <Header />
      <main className="pt-24">
        <ProductSection
          id="women"
          title="Women"
          subtitle="Curated for Her"
          filter={(product) =>
            product.node.handle.toLowerCase().includes("women")
          }
        />
      </main>
      <Footer />
    </>
  );
}
