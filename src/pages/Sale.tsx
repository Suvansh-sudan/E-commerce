import { Header } from "@/components/Header";
import { ProductSection } from "@/components/ProductSection";
import { Footer } from "@/components/Footer";

export default function Sale() {
  return (
    <>
      <Header />
      <main className="pt-24">
        <ProductSection
          id="sale"
          title="Sale"
          subtitle="Limited Time Offers"
          filter={(product) =>
            product.node.handle.toLowerCase().includes("sale") ||
            product.node.description.toLowerCase().includes("sale") ||
            product.node.description.toLowerCase().includes("off")
          }
        />
      </main>
      <Footer />
    </>
  );
}
