import { useState, useEffect } from "react";
import { Minus, Plus, X, ShoppingBag, ExternalLink, Loader2 } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { SheetHeader, SheetTitle } from "@/components/ui/sheet";

export function ShopifyCartDrawer() {
  const { items, isLoading, isSyncing, updateQuantity, removeItem, getCheckoutUrl, syncCart } = useCartStore();
  
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + parseFloat(item.price.amount) * item.quantity,
    0
  );
  const currencyCode = items[0]?.price.currencyCode || 'USD';

  useEffect(() => {
    syncCart();
  }, [syncCart]);

  const handleCheckout = () => {
    const checkoutUrl = getCheckoutUrl();
    if (checkoutUrl) {
      window.open(checkoutUrl, '_blank');
    }
  };

  return (
    <div className="flex flex-col h-full">
      <SheetHeader className="px-6 py-4 border-b border-border">
        <SheetTitle className="flex items-center gap-2 font-display text-xl">
          <ShoppingBag size={20} />
          Your Bag ({totalItems})
        </SheetTitle>
      </SheetHeader>

      {items.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
          <ShoppingBag size={48} className="text-muted-foreground/50 mb-4" />
          <h3 className="font-display text-xl mb-2">Your bag is empty</h3>
          <p className="text-muted-foreground">
            Start shopping to add items to your bag.
          </p>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto px-6 py-4">
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.variantId} className="flex gap-4 animate-fade-in">
                  <div className="w-20 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    {item.product.node.images.edges[0]?.node ? (
                      <img
                        src={item.product.node.images.edges[0].node.url}
                        alt={item.product.node.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                        No image
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">
                          {item.selectedOptions.map(o => o.value).join(' • ') || 'Product'}
                        </p>
                        <h4 className="font-medium truncate">{item.product.node.title}</h4>
                      </div>
                      <button
                        onClick={() => removeItem(item.variantId)}
                        disabled={isLoading}
                        className="p-1 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
                        aria-label="Remove item"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-border rounded-full">
                        <button
                          onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                          disabled={isLoading}
                          className="p-2 hover:bg-muted transition-colors rounded-l-full disabled:opacity-50"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-3 text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                          disabled={isLoading}
                          className="p-2 hover:bg-muted transition-colors rounded-r-full disabled:opacity-50"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <span className="font-semibold">
                        {item.price.currencyCode} {(parseFloat(item.price.amount) * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-border p-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-semibold text-lg">
                {currencyCode} {totalPrice.toFixed(2)}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Shipping and taxes calculated at checkout.
            </p>
            <button 
              onClick={handleCheckout}
              disabled={isLoading || isSyncing || items.length === 0}
              className="w-full btn-primary py-4 text-base flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading || isSyncing ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <ExternalLink size={16} />
                  Checkout with Shopify
                </>
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
