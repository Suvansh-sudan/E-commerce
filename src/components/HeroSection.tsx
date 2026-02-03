import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-20">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{ background: "var(--gradient-hero)" }}
        />
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground">
                Spring Collection 2024
              </p>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-medium leading-[0.9] tracking-tight">
                Timeless
                <br />
                <span className="text-primary">Elegance</span>
              </h1>
            </div>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-md leading-relaxed">
              Discover our curated collection of premium essentials, crafted for the modern lifestyle.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a href="#collections" className="btn-primary group">
                Shop Collection
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a href="#new" className="btn-outline">
                Explore New
              </a>
            </div>
          </div>
          
          <div className="relative animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-card shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80"
                alt="Featured collection"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-background p-6 rounded-xl shadow-lg animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <p className="text-sm text-muted-foreground">Starting from</p>
              <p className="text-3xl font-display font-medium">$89</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
