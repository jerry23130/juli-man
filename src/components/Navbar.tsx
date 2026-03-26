import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";

const links = [
  { label: "Work", href: "#gallery" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled ? "glass py-4" : "py-6"
        }`}
      >
        <div className="max-w-[1800px] mx-auto px-8 md:px-12 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-3 group">
            <img src={logo} alt="Juli-Man Productions" className="h-8 md:h-10 object-contain transition-transform duration-500 group-hover:scale-105" />
          </a>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-12">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[13px] uppercase tracking-[0.2em] font-body text-foreground/50 hover:text-foreground transition-colors duration-500"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#booking"
              className="text-[13px] uppercase tracking-[0.2em] font-body text-primary hover:text-coral-light transition-colors duration-500"
            >
              Book Now
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-foreground/70 hover:text-foreground transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Fullscreen mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[60] bg-background flex flex-col items-center justify-center gap-8"
          >
            <button
              className="absolute top-6 right-8 text-foreground/60 hover:text-foreground"
              onClick={() => setMobileOpen(false)}
            >
              <X size={24} />
            </button>
            {[...links, { label: "Book Now", href: "#booking" }].map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                onClick={() => setMobileOpen(false)}
                className={`text-3xl font-display tracking-tight ${
                  link.label === "Book Now" ? "text-primary" : "text-foreground/80 hover:text-foreground"
                } transition-colors`}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Vertical side text — desktop only */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center gap-6"
      >
        <a
          href="https://www.tiktok.com/@Julimanproductions"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] uppercase tracking-[0.25em] text-foreground/20 hover:text-primary transition-colors duration-500 [writing-mode:vertical-rl] rotate-180"
        >
          TikTok
        </a>
        <div className="w-px h-8 bg-foreground/10" />
        <a
          href="https://t.me/Juliman_ProductionsET"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] uppercase tracking-[0.25em] text-foreground/20 hover:text-primary transition-colors duration-500 [writing-mode:vertical-rl] rotate-180"
        >
          Telegram
        </a>
        <div className="w-px h-8 bg-foreground/10" />
        <a
          href="#contact"
          className="text-[10px] uppercase tracking-[0.25em] text-foreground/20 hover:text-primary transition-colors duration-500 [writing-mode:vertical-rl] rotate-180"
        >
          Contact
        </a>
      </motion.div>
    </>
  );
};
