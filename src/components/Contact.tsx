import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Phone, Mail, MapPin, MessageCircle, Send, ArrowUpRight } from "lucide-react";

const contactItems = [
  {
    icon: Phone,
    label: "Phone / WhatsApp",
    value: "+251 911 346 771",
    href: "https://wa.me/251911346771",
    sub: "WhatsApp enabled",
  },
  {
    icon: Mail,
    label: "Email",
    value: "Julimanproductions@gmail.com",
    href: "mailto:Julimanproductions@gmail.com",
  },
  {
    icon: MessageCircle,
    label: "TikTok",
    value: "@Julimanproductions",
    href: "https://www.tiktok.com/@Julimanproductions",
  },
  {
    icon: Send,
    label: "Telegram",
    value: "Juliman_ProductionsET",
    href: "https://t.me/Juliman_ProductionsET",
  },
];

export const Contact = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="relative py-32 md:py-48 px-8 md:px-12">
      <div ref={ref} className="max-w-[1400px] mx-auto">
        <div className="grid md:grid-cols-2 gap-20 md:gap-32">
          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8 }}
              className="mb-4"
            >
              <span className="text-[11px] uppercase tracking-[0.3em] text-primary font-body font-semibold">Reach Out</span>
            </motion.div>

            <div className="overflow-hidden mb-12">
              <motion.h2
                initial={{ y: "100%" }}
                animate={inView ? { y: 0 } : {}}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl md:text-6xl font-display font-bold text-foreground"
              >
                Get in <span className="italic">Touch</span>
              </motion.h2>
            </div>

            <div className="space-y-0">
              {contactItems.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="group flex items-center justify-between py-6 border-b border-foreground/[0.06] hover:border-primary/30 transition-colors duration-500"
                >
                  <div className="flex items-center gap-5">
                    <item.icon size={18} strokeWidth={1.5} className="text-foreground/20 group-hover:text-primary transition-colors duration-500" />
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/25 font-body">{item.label}</p>
                      <p className="text-foreground/70 font-body group-hover:text-foreground transition-colors duration-500">{item.value}</p>
                      {item.sub && <p className="text-[11px] text-primary/60 mt-0.5 font-body">{item.sub}</p>}
                    </div>
                  </div>
                  <ArrowUpRight size={16} className="text-foreground/10 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-500" />
                </motion.a>
              ))}
            </div>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-12"
            >
              <div className="flex items-start gap-5">
                <MapPin size={18} strokeWidth={1.5} className="text-foreground/20 mt-1" />
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/25 font-body">Location</p>
                  <p className="text-foreground/70 font-body">Bole Meskel Flower</p>
                  <p className="text-foreground/40 font-body text-sm mt-1">
                    Amir Commercial Center, 1st Floor, Office 1004<br />
                    Addis Ababa, Ethiopia
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right — Map */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative overflow-hidden h-[450px] md:h-full min-h-[400px]"
          >
            <iframe
              title="Juli-Man Productions Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.5!2d38.78!3d9.01!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMDAnMzYuMCJOIDM4wrA0Nic0OC4wIkU!5e0!3m2!1sen!2set!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "invert(0.92) hue-rotate(180deg) saturate(0.2) brightness(0.7)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
