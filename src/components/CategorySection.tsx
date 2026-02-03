const categories = [
  {
    name: "Women",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80",
    count: 124,
  },
  {
    name: "Men",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    count: 98,
  },
  {
    name: "Accessories",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
    count: 56,
  },
  {
    name: "Shoes",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
    count: 42,
  },
];

export function CategorySection() {
  return (
    <section id="collections" className="py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4">
            Browse by
          </p>
          <h2 className="section-title">Collections</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <a
              key={category.name}
              href={`#${category.name.toLowerCase()}`}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <img
                src={category.image}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-soft-black/80 via-soft-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-display font-medium text-white mb-1">
                  {category.name}
                </h3>
                <p className="text-white/70 text-sm">
                  {category.count} Products
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
