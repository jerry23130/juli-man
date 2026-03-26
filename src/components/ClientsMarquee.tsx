import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const clients = [
  "Ethiopian Airlines", "Hilton Hotels", "African Union", "Sheraton Addis",
  "Hyatt Regency", "Capital Hotel", "Radisson Blu", "Getfam Hotel",
  "EthioTelecom", "Dashen Bank", "Awash Bank", "United Bank",
  "Flintstone Homes", "Noah Real Estate", "Sunshine Construction",
  "ZemZem Water", "Habesha Breweries",
];

export const ClientsMarquee = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="relative py-16 md:py-24 overflow-hidden border-y border-foreground/[0.04]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
      >
        <p className="text-center text-[10px] uppercase tracking-[0.4em] text-foreground/20 font-body mb-10">
          Trusted by Leading Brands
        </p>

        {/* Scrolling marquee */}
        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />

          <div className="flex overflow-hidden">
            <motion.div
              animate={{ x: [0, -50 * clients.length] }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="flex items-center gap-16 shrink-0"
            >
              {[...clients, ...clients].map((client, i) => (
                <span
                  key={i}
                  className="text-foreground/15 hover:text-foreground/40 transition-colors duration-500 font-body text-sm tracking-[0.15em] uppercase whitespace-nowrap cursor-default"
                >
                  {client}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
