import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { ShopifyProductCard } from "./ShopifyProductCard";
import { Loader2 } from "lucide-react";
import { mockProducts } from "@/lib/mockProducts";

type ProductSectionProps = {
  id: string;
  title: string;
  subtitle: string;
  filter: (product: any) => boolean;
};

export function ProductSection({
  id,
  title,
  subtitle,
  filter,
}: ProductSectionProps) {
  const { products, isLoading, error } = useShopifyProducts(20);

  const sourceProducts = products.length > 0 ? products : mockProducts;
  const filteredProducts = sourceProducts.filter(filter).slice(0, 4);

  return (
    <section id={id} className="py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="mb-16">
          <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4">
            {subtitle}
          </p>
          <h2 className="section-title">{title}</h2>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {/* Error */}
        {error && !isLoading && (
          <p className="text-center text-destructive py-12">
            Failed to load products
          </p>
        )}

        {/* Products */}
        {!isLoading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {filteredProducts.map((product, index) => (
              <div
                key={product.node.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <ShopifyProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
