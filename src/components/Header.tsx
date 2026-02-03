import { useState } from "react";
import { ShoppingBag, Search, Menu, X, User } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ShopifyCartDrawer } from "./ShopifyCartDrawer";
import { Link, useLocation } from "react-router-dom";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  // ✅ Hook is INSIDE the component
  const location = useLocation();
  const isHome = location.pathname === "/";

  const navLinks = [
    {
      name: "New Arrivals",
      href: isHome ? "#new" : "/#new",
      type: "anchor",
    },
    {
      name: "Collections",
      href: isHome ? "#collections" : "/#collections",
      type: "anchor",
    },
    { name: "Women", href: "/women", type: "route" },
    { name: "Men", href: "/men", type: "route" },
    { name: "Sale", href: "/sale", type: "route" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 -ml-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link
            to="/"
            className="font-display text-2xl md:text-3xl font-semibold tracking-tight"
          >
            MAISON
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) =>
              link.type === "anchor" ? (
                <a key={link.name} href={link.href} className="nav-link">
                  {link.name}
                </a>
              ) : (
                <Link key={link.name} to={link.href} className="nav-link">
                  {link.name}
                </Link>
              )
            )}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            <button className="p-2 hover:text-primary transition-colors">
              <Search size={20} />
            </button>

            <button className="hidden md:block p-2 hover:text-primary transition-colors">
              <User size={20} />
            </button>

            <Sheet>
              <SheetTrigger asChild>
                <button className="relative p-2 hover:text-primary transition-colors">
                  <ShoppingBag size={20} />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs font-medium rounded-full flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg p-0">
                <ShopifyCartDrawer />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-border animate-fade-in">
          <nav className="container mx-auto px-4 py-6 flex flex-col gap-4">
            {navLinks.map((link) =>
              link.type === "anchor" ? (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-lg font-medium py-2 hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-lg font-medium py-2 hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              )
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
