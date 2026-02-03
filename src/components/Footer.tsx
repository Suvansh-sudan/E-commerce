import { Instagram, Twitter, Facebook, Youtube } from "lucide-react";

const footerLinks = {
  shop: [
    { name: "New Arrivals", href: "#new" },
    { name: "Women", href: "#women" },
    { name: "Men", href: "#men" },
    { name: "Accessories", href: "#accessories" },
    { name: "Sale", href: "#sale" },
  ],
  help: [
    { name: "FAQ", href: "#faq" },
    { name: "Shipping", href: "#shipping" },
    { name: "Returns", href: "#returns" },
    { name: "Track Order", href: "#track" },
    { name: "Contact Us", href: "#contact" },
  ],
  company: [
    { name: "About Us", href: "#about" },
    { name: "Sustainability", href: "#sustainability" },
    { name: "Careers", href: "#careers" },
    { name: "Press", href: "#press" },
  ],
};

const socialLinks = [
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "YouTube", icon: Youtube, href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 md:px-8 py-16 md:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 md:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="/" className="font-display text-2xl font-semibold tracking-tight">
              MAISON
            </a>
            <p className="mt-4 text-muted-foreground max-w-sm">
              Curated essentials for the modern lifestyle. Quality craftsmanship meets timeless design.
            </p>
            <div className="flex gap-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={social.name}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h4 className="font-semibold mb-4">Help</h4>
            <ul className="space-y-3">
              {footerLinks.help.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 MAISON. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-foreground transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
