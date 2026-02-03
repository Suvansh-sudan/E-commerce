import type { ShopifyProduct } from "@/hooks/useShopifyProducts";

export const mockProducts: ShopifyProduct[] = [
  {
    node: {
      id: "mock-1",
      title: "Minimal Black Hoodie",
      description: "Premium cotton hoodie designed for everyday comfort.",
      handle: "men-minimal-black-hoodie",

      priceRange: {
        minVariantPrice: { amount: "2499", currencyCode: "INR" },
      },

      images: {
        edges: [
          {
            node: {
              url: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80",
              altText: "Minimal Black Hoodie",
            },
          },
        ],
      },

      variants: {
        edges: [
          {
            node: {
              id: "variant-1",
              title: "Default",
              availableForSale: true,
              selectedOptions: [],
              price: { amount: "2499", currencyCode: "INR" },
            },
          },
        ],
      },

      options: [
        { id: "opt-1", name: "Size", values: ["S", "M", "L", "XL"] },
      ],
    },
  },

  {
    node: {
      id: "mock-2",
      title: "Streetwear Cargo Pants",
      description: "Relaxed-fit cargo pants with a modern streetwear vibe.",
      handle: "men-streetwear-cargo-pants",

      priceRange: {
        minVariantPrice: { amount: "3199", currencyCode: "INR" },
      },

      images: {
        edges: [
          {
            node: {
              url: "https://plus.unsplash.com/premium_photo-1703118952690-bb3d1560efb9?q=80&w=987&auto=format&fit=crop",
              altText: "Streetwear Cargo Pants",
            },
          },
        ],
      },

      variants: {
        edges: [
          {
            node: {
              id: "variant-2",
              title: "Default",
              availableForSale: true,
              selectedOptions: [],
              price: { amount: "3199", currencyCode: "INR" },
            },
          },
        ],
      },

      options: [
        { id: "opt-2", name: "Waist", values: ["30", "32", "34", "36"] },
      ],
    },
  },

  {
    node: {
      id: "mock-3",
      title: "Classic White Sneakers",
      description: "Clean, minimalist sneakers built for all-day wear.",
      handle: "women-classic-white-sneakers",

      priceRange: {
        minVariantPrice: { amount: "4599", currencyCode: "INR" },
      },

      images: {
        edges: [
          {
            node: {
              url: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80",
              altText: "Classic White Sneakers",
            },
          },
        ],
      },

      variants: {
        edges: [
          {
            node: {
              id: "variant-3",
              title: "Default",
              availableForSale: true,
              selectedOptions: [],
              price: { amount: "4599", currencyCode: "INR" },
            },
          },
        ],
      },

      options: [
        { id: "opt-3", name: "Size", values: ["7", "8", "9", "10"] },
      ],
    },
  },

  {
    node: {
      id: "mock-4",
      title: "Oversized Denim Jacket",
      description: "Vintage-washed denim jacket with a relaxed oversized fit.",
      handle: "women-oversized-denim-jacket",

      priceRange: {
        minVariantPrice: { amount: "5299", currencyCode: "INR" },
      },

      images: {
        edges: [
          {
            node: {
              url: "https://images.unsplash.com/photo-1675966694039-19f0496c69b8?q=80&w=987&auto=format&fit=crop",
              altText: "Oversized Denim Jacket",
            },
          },
        ],
      },

      variants: {
        edges: [
          {
            node: {
              id: "variant-4",
              title: "Default",
              availableForSale: true,
              selectedOptions: [],
              price: { amount: "5299", currencyCode: "INR" },
            },
          },
        ],
      },

      options: [
        { id: "opt-4", name: "Size", values: ["M", "L", "XL"] },
      ],
    },
  },

  {
    node: {
      id: "mock-5",
      title: "Neutral Beige T-Shirt",
      description: "Soft-touch oversized t-shirt. Limited-time sale item.",
      handle: "sale-neutral-beige-tshirt",

      priceRange: {
        minVariantPrice: { amount: "1599", currencyCode: "INR" },
      },

      images: {
        edges: [
          {
            node: {
              url: "https://images.unsplash.com/photo-1749711429711-391f7cdbe24c?q=80&w=987&auto=format&fit=crop",
              altText: "Neutral Beige T-Shirt",
            },
          },
        ],
      },

      variants: {
        edges: [
          {
            node: {
              id: "variant-5",
              title: "Default",
              availableForSale: true,
              selectedOptions: [],
              price: { amount: "1599", currencyCode: "INR" },
            },
          },
        ],
      },

      options: [
        { id: "opt-5", name: "Size", values: ["S", "M", "L", "XL"] },
      ],
    },
  },
];
