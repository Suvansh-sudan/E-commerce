import { Heart, Plus, Loader2 } from "lucide-react";
import { ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

interface ShopifyProductCardProps {
  product: ShopifyProduct;
}

export function ShopifyProductCard({ product }: ShopifyProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const isLoading = useCartStore((state) => state.isLoading);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const { node } = product;
  const price = node.priceRange.minVariantPrice;
  const image = node.images.edges[0]?.node;
  const firstVariant = node.variants.edges[0]?.node;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!firstVariant || !firstVariant.availableForSale) {
      toast.error("This product is currently unavailable");
      return;
    }

    setIsAdding(true);
    try {
      await addItem({
        product,
        variantId: firstVariant.id,
        variantTitle: firstVariant.title,
        price: firstVariant.price,
        quantity: 1,
        selectedOptions: firstVariant.selectedOptions || [],
      });
      toast.success(`Added ${node.title} to bag`);
    } catch (error) {
      toast.error("Failed to add item to cart");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Link to={`/product/${node.handle}`} className="product-card group block">
      <div className="relative overflow-hidden">
        {image ? (
          <img
            src={image.url}
            alt={image.altText || node.title}
            className="product-image"
          />
        ) : (
          <div className="aspect-square bg-muted flex items-center justify-center">
            <span className="text-muted-foreground">No image</span>
          </div>
        )}
        
        {/* Quick Actions */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsWishlisted(!isWishlisted);
            }}
            className={`p-2 rounded-full bg-background/90 backdrop-blur-sm shadow-md transition-colors ${
              isWishlisted ? "text-destructive" : "hover:text-primary"
            }`}
            aria-label="Add to wishlist"
          >
            <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
          </button>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={isLoading || isAdding || !firstVariant?.availableForSale}
          className={`absolute bottom-4 left-4 right-4 py-3 bg-foreground text-background rounded-full font-medium text-sm 
            opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0
            hover:bg-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed
            ${isAdding ? "scale-95" : ""}`}
        >
          {isAdding ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <>
              <Plus size={16} />
              {firstVariant?.availableForSale ? "Add to Cart" : "Sold Out"}
            </>
          )}
        </button>

        {/* Out of Stock Badge */}
        {!firstVariant?.availableForSale && (
          <span className="absolute top-4 left-4 px-3 py-1 bg-muted text-muted-foreground text-xs font-medium rounded-full">
            Sold Out
          </span>
        )}
      </div>

      <div className="p-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
          {node.options?.[0]?.values?.[0] || "Product"}
        </p>
        <h3 className="font-medium mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {node.title}
        </h3>
        <div className="flex items-center gap-2">
          <span className="font-semibold">
            {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
          </span>
        </div>
      </div>
    </Link>
  );
}
