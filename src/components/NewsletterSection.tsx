import { useState } from "react";
import { ArrowRight } from "lucide-react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className="py-24 md:py-32 bg-foreground text-background">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-medium mb-4">
            Stay in the Loop
          </h2>
          <p className="text-background/70 mb-8">
            Subscribe for exclusive access to new arrivals, sales, and style inspiration.
          </p>

          {isSubmitted ? (
            <div className="animate-fade-in">
              <p className="text-lg">Thank you for subscribing! ✓</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-6 py-4 rounded-full bg-background/10 border border-background/20 
                  text-background placeholder:text-background/50 focus:outline-none focus:border-background/50
                  transition-colors"
                required
              />
              <button
                type="submit"
                className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium
                  hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                Subscribe
                <ArrowRight size={16} />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
