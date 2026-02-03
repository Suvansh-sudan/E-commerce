import { ArrowRight } from "lucide-react";

export function FeaturedSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          {/* Featured Large */}
          <div className="relative group rounded-2xl overflow-hidden aspect-[4/5]">
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80"
              alt="Summer collection"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-soft-black/70 via-soft-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              <p className="text-white/80 text-sm font-medium tracking-widest uppercase mb-3">
                Limited Edition
              </p>
              <h3 className="text-3xl md:text-4xl font-display font-medium text-white mb-4">
                Summer Essentials
              </h3>
              <a
                href="#summer"
                className="inline-flex items-center text-white font-medium group/link"
              >
                Shop Now
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/link:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Featured Stack */}
          <div className="flex flex-col gap-8 md:gap-12">
            <div className="relative group rounded-2xl overflow-hidden aspect-video">
              <img
                src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80"
                alt="Accessories"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-soft-black/70 via-soft-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <h3 className="text-2xl font-display font-medium text-white mb-2">
                  Premium Accessories
                </h3>
                <a
                  href="#accessories"
                  className="inline-flex items-center text-white/90 text-sm font-medium group/link"
                >
                  Explore
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                </a>
              </div>
            </div>

            <div className="relative group rounded-2xl overflow-hidden aspect-video">
              <img
                src="https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&q=80"
                alt="Footwear"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-soft-black/70 via-soft-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <h3 className="text-2xl font-display font-medium text-white mb-2">
                  Crafted Footwear
                </h3>
                <a
                  href="#footwear"
                  className="inline-flex items-center text-white/90 text-sm font-medium group/link"
                >
                  Explore
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
