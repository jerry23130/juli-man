import { motion, useScroll, useTransform } from "framer-motion";
import { Play } from "lucide-react";
import { useState, useRef } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import showreelBg from "@/assets/showreel-bg.jpg";

export const Showreel = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  return (
    <>
      <section ref={ref} className="relative py-0 overflow-hidden">
        <motion.div style={{ scale }} className="relative h-[65vh] md:h-[75vh] overflow-hidden">
          {/* Background with parallax */}
          <motion.div style={{ y }} className="absolute inset-0">
            <img
              src={showreelBg}
              alt="Behind the scenes"
              className="absolute inset-0 w-full h-full object-cover scale-110"
            />
          </motion.div>
          {/* Overlays */}
          <div className="absolute inset-0 bg-background/65" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
          <div className="absolute inset-0" style={{ background: "radial-gradient(circle at center, transparent 30%, hsl(0 0% 2% / 0.6) 100%)" }} />

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
            {/* Play button with animated rings */}
            <div className="relative mb-10">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-full border border-primary/10"
                  style={{
                    margin: `-${i * 15}px`,
                  }}
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.3, 0, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    delay: i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
              <motion.button
                onClick={() => setOpen(true)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-24 h-24 md:w-28 md:h-28 rounded-full border-2 border-primary/60 flex items-center justify-center group hover:border-primary hover:bg-primary/10 transition-all duration-500"
                aria-label="Watch showreel"
              >
                <Play className="w-8 h-8 md:w-10 md:h-10 text-primary ml-1 group-hover:scale-110 transition-transform duration-300" />
              </motion.button>
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl font-display font-bold text-foreground"
            >
              Watch Our <span className="italic">Showreel</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-sm tracking-[0.3em] uppercase text-foreground/30 mt-6 font-body"
            >
              See the Magic Behind Our Lens
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* Video dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-5xl w-[95vw] p-0 bg-background border-border/20 overflow-hidden">
          <div className="aspect-video w-full">
            {open && (
              <iframe
                src="https://www.youtube.com/embed/bKhl8ikYp5U?autoplay=1&rel=0&modestbranding=1"
                title="Juli-Man Productions Showreel"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
                style={{ border: 0 }}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
