import logo from "@/assets/logo.png";
import { MessageCircle, Send, Mail, Phone } from "lucide-react";

export const Footer = () => (
  <footer className="border-t border-foreground/[0.06] py-20 px-8 md:px-12">
    <div className="max-w-[1400px] mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-12">
        <div className="space-y-4">
          <img src={logo} alt="Juli-Man Productions" className="h-10 object-contain" />
          <p className="text-[11px] tracking-[0.3em] uppercase text-primary font-body font-semibold">
            Closer Than You Think
          </p>
        </div>

        <div className="flex gap-6">
          {[
            { icon: Phone, href: "tel:+251911346771", label: "Phone" },
            { icon: MessageCircle, href: "https://wa.me/251911346771", label: "WhatsApp" },
            { icon: Mail, href: "mailto:Julimanproductions@gmail.com", label: "Email" },
            { icon: Send, href: "https://t.me/Juliman_ProductionsET", label: "Telegram" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.label}
              className="text-foreground/20 hover:text-primary transition-colors duration-500"
            >
              <item.icon size={18} strokeWidth={1.5} />
            </a>
          ))}
        </div>
      </div>

      <div className="mt-16 pt-8 border-t border-foreground/[0.04] flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[11px] text-foreground/20 font-body tracking-wide">
          © {new Date().getFullYear()} Juli-Man Productions. All rights reserved.
        </p>
        <div className="flex gap-8">
          {["Work", "About", "Services", "Contact"].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-[11px] text-foreground/20 hover:text-foreground/50 transition-colors font-body uppercase tracking-[0.15em]"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);
