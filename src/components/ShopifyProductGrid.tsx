import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { ShopifyProductCard } from "./ShopifyProductCard";
import { Loader2 } from "lucide-react";
import { mockProducts } from "@/lib/mockProducts";

export function ShopifyProductGrid() {
  const { products, isLoading, error } = useShopifyProducts(20);

  // ✅ Always have something to render
  const displayProducts = products.length > 0 ? products : mockProducts;

  return (
    <section id="new" className="py-24 md:py-32 bg-card/50">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div>
            <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4">
              Just Arrived
            </p>
            <h2 className="section-title">New Arrivals</h2>
          </div>
          <a href="#all" className="btn-outline mt-6 md:mt-0">
            View All Products
          </a>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {/* Error */}
        {error && !isLoading && (
          <p className="text-center text-destructive py-12">
            Error loading products: {error}
          </p>
        )}

        {/* Products Grid */}
        {!isLoading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {displayProducts.map((product, index) => (
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