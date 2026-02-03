import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Heart, Minus, Plus, Loader2 } from "lucide-react";
import { storefrontApiRequest, PRODUCT_BY_HANDLE_QUERY, ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { toast } from "sonner";

export default function ProductDetail() {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<ShopifyProduct["node"] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const addItem = useCartStore((state) => state.addItem);
  const isCartLoading = useCartStore((state) => state.isLoading);

  useEffect(() => {
    async function fetchProduct() {
      if (!handle) return;
      
      try {
        setIsLoading(true);
        const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
        
        if (data?.data?.product) {
          setProduct(data.data.product);
          setSelectedVariant(data.data.product.variants.edges[0]?.node.id || null);
        } else {
          setError("Product not found");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch product");
      } finally {
        setIsLoading(false);
      }
    }

    fetchProduct();
  }, [handle]);

  const currentVariant = product?.variants.edges.find(
    (v) => v.node.id === selectedVariant
  )?.node;

  const handleAddToCart = async () => {
    if (!product || !currentVariant || !currentVariant.availableForSale) {
      toast.error("This product is currently unavailable");
      return;
    }

    try {
      await addItem({
        product: { node: product } as ShopifyProduct,
        variantId: currentVariant.id,
        variantTitle: currentVariant.title,
        price: currentVariant.price,
        quantity,
        selectedOptions: currentVariant.selectedOptions || [],
      });
      toast.success(`Added ${product.title} to bag`);
    } catch (error) {
      toast.error("Failed to add item to cart");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex items-center justify-center py-32">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center py-32">
              <h1 className="font-display text-3xl mb-4">Product Not Found</h1>
              <p className="text-muted-foreground mb-8">{error || "This product doesn't exist."}</p>
              <Link to="/" className="btn-primary">
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to Shop
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const images = product.images.edges;
  const price = currentVariant?.price || product.priceRange.minVariantPrice;

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-8">
          {/* Back Link */}
          <Link
            to="/"
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Shop
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Images */}
            <div className="space-y-4">
              <div className="aspect-square rounded-2xl overflow-hidden bg-card">
                {images[selectedImage]?.node ? (
                  <img
                    src={images[selectedImage].node.url}
                    alt={images[selectedImage].node.altText || product.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    No image
                  </div>
                )}
              </div>
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {images.map((img, index) => (
                    <button
                      key={img.node.url}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === index
                          ? "border-primary"
                          : "border-transparent hover:border-border"
                      }`}
                    >
                      <img
                        src={img.node.url}
                        alt={img.node.altText || `${product.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="space-y-8">
              <div>
                <p className="text-sm text-muted-foreground uppercase tracking-widest mb-2">
                  {product.options?.[0]?.values?.[0] || "Product"}
                </p>
                <h1 className="font-display text-4xl md:text-5xl font-medium mb-4">
                  {product.title}
                </h1>
                <p className="text-3xl font-semibold">
                  {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
                </p>
              </div>

              {product.description && (
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              )}

              {/* Variants */}
              {product.options.length > 0 && product.options[0].values.length > 1 && (
                <div className="space-y-4">
                  {product.options.map((option) => (
                    <div key={option.name}>
                      <label className="block text-sm font-medium mb-3">
                        {option.name}
                      </label>
                      <div className="flex flex-wrap gap-3">
                        {option.values.map((value) => {
                          const variant = product.variants.edges.find((v) =>
                            v.node.selectedOptions.some(
                              (o) => o.name === option.name && o.value === value
                            )
                          );
                          const isSelected = variant?.node.id === selectedVariant;
                          const isAvailable = variant?.node.availableForSale;

                          return (
                            <button
                              key={value}
                              onClick={() => variant && setSelectedVariant(variant.node.id)}
                              disabled={!isAvailable}
                              className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors
                                ${isSelected
                                  ? "border-foreground bg-foreground text-background"
                                  : isAvailable
                                    ? "border-border hover:border-foreground"
                                    : "border-border text-muted-foreground/50 cursor-not-allowed line-through"
                                }`}
                            >
                              {value}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium mb-3">Quantity</label>
                <div className="inline-flex items-center border border-border rounded-full">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-muted transition-colors rounded-l-full"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-6 text-sm font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-muted transition-colors rounded-r-full"
                    aria-label="Increase quantity"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={isCartLoading || !currentVariant?.availableForSale}
                  className="flex-1 btn-primary py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCartLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                  ) : currentVariant?.availableForSale ? (
                    "Add to Bag"
                  ) : (
                    "Sold Out"
                  )}
                </button>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-4 rounded-full border-2 transition-colors ${
                    isWishlisted
                      ? "border-destructive text-destructive"
                      : "border-border hover:border-foreground"
                  }`}
                  aria-label="Add to wishlist"
                >
                  <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
