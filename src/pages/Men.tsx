import { Header } from "@/components/Header";
import { ProductSection } from "@/components/ProductSection";
import { Footer } from "@/components/Footer";

export default function Men() {
  return (
    <>
      <Header />
      <main className="pt-24">
        <ProductSection
          id="men"
          title="Men"
          subtitle="Designed for Him"
          filter={(product) =>
            product.node.handle.toLowerCase().includes("men")
          }
        />
      </main>
      <Footer />
    </>
  );
}
