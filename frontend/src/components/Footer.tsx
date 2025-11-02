import { Heart, Instagram, Twitter, Facebook } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary/30 border-t border-border mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Connect With Us</h3>
            <div className="flex gap-3">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-card border border-border p-3 rounded-2xl hover:bg-accent hover:border-accent hover:-translate-y-1 transition-all duration-300" aria-label="Instagram">
                <Instagram className="h-5 w-5 text-muted-foreground hover:text-[color:hsl(var(--accent-foreground))]" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-card border border-border p-3 rounded-2xl hover:bg-accent hover:border-accent hover:-translate-y-1 transition-all duration-300" aria-label="Twitter">
                <Twitter className="h-5 w-5 text-muted-foreground hover:text-[color:hsl(var(--accent-foreground))]" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-card border border-border p-3 rounded-2xl hover:bg-accent hover:border-accent hover:-translate-y-1 transition-all duration-300" aria-label="Facebook">
                <Facebook className="h-5 w-5 text-muted-foreground hover:text-[color:hsl(var(--accent-foreground))]" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} EventSphere. Made with <Heart className="inline h-4 w-4 text-accent fill-current" /> to discover, map, and chat about great events.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
