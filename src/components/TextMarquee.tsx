import { motion } from "framer-motion";

const words = [
  "PHOTOGRAPHY",
  "VIDEOGRAPHY",
  "AUDIO",
  "WEDDINGS",
  "EVENTS",
  "PORTRAITS",
  "PRODUCTION",
  "STUDIO",
];

export const TextMarquee = () => (
  <section className="relative py-8 md:py-12 overflow-hidden border-y border-foreground/[0.03]">
    <div className="flex overflow-hidden">
      <motion.div
        animate={{ x: [0, -100 * words.length] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex items-center gap-0 shrink-0"
      >
        {[...words, ...words, ...words].map((word, i) => (
          <span key={i} className="flex items-center gap-8 mx-8">
            <span className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-foreground/[0.03] whitespace-nowrap tracking-tight">
              {word}
            </span>
            <span className="w-2 h-2 rounded-full bg-primary/20 shrink-0" />
          </span>
        ))}
      </motion.div>
    </div>
  </section>
);
