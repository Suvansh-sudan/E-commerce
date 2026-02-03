import { useState, useEffect } from 'react';
import { ShopifyProduct, storefrontApiRequest, PRODUCTS_QUERY } from '@/lib/shopify';

export function useShopifyProducts(limit: number = 20) {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setIsLoading(true);
        const data = await storefrontApiRequest(PRODUCTS_QUERY, { first: limit });
        
        if (data?.data?.products?.edges) {
          setProducts(data.data.products.edges);
        } else {
          setProducts([]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch products');
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, [limit]);

  return { products, isLoading, error };
}
