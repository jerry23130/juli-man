import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState as useStateR } from "react";
import portrait1 from "@/assets/gallery/portrait-1.jpg";

const CountUp = ({ target, suffix = "" }: { target: number; suffix: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useStateR(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);

  return <span ref={ref}>{val}{suffix}</span>;
};

export const About = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const textY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section id="about" ref={containerRef} className="relative py-32 md:py-48 px-8 md:px-12 overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-burgundy/5 to-transparent pointer-events-none" />

      <div ref={ref} className="max-w-[1400px] mx-auto">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Left — Editorial text */}
          <motion.div style={{ y: textY }}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="mb-8 flex items-center gap-4"
            >
              <div className="w-12 h-[1px] bg-primary" />
              <span className="text-[11px] uppercase tracking-[0.3em] text-primary font-body font-semibold">About Us</span>
            </motion.div>

            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "110%" }}
                animate={inView ? { y: 0 } : {}}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-foreground leading-[1.05]"
              >
                We Don't Just Record.
              </motion.h2>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "110%" }}
                animate={inView ? { y: 0 } : {}}
                transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl md:text-6xl lg:text-7xl font-display font-bold italic text-primary leading-[1.05]"
              >
                We Curate Legacies.
              </motion.h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-10 space-y-6"
            >
              <p className="text-lg text-foreground/50 leading-relaxed font-body">
                From the intimate whisper of a portrait to the grand scale of studio production, 
                our lens stays closer than you think. We capture the pulse of Addis Ababa, Dubai, 
                Paris, and beyond.
              </p>
              <p className="text-foreground/35 leading-relaxed font-body">
                With decades of combined experience in photography, videography, and audio production, 
                Juli-Man Productions delivers cinematic storytelling that transforms your most precious 
                moments into timeless visual art.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="mt-14 flex gap-16"
            >
              {[
                { num: 500, suffix: "+", label: "Projects" },
                { num: 12, suffix: "+", label: "Cities" },
                { num: 8, suffix: "+", label: "Years" },
              ].map((stat) => (
                <div key={stat.label} className="group">
                  <p className="text-4xl md:text-5xl font-display font-bold text-foreground group-hover:text-primary transition-colors duration-500">
                    <CountUp target={stat.num} suffix={stat.suffix} />
                  </p>
                  <p className="text-xs uppercase tracking-[0.2em] text-foreground/25 font-body mt-2">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Image with parallax */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <motion.div style={{ y: imageY }} className="relative overflow-hidden aspect-[3/4] group">
              <img
                src={portrait1}
                alt="Professional portrait"
                className="w-full h-full object-cover cinematic-filter transition-transform duration-&lsqb;1.5s&rsqb; group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
              {/* Corner accents */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-primary/30" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-primary/30" />
            </motion.div>
            {/* Decorative offset frame */}
            <div className="absolute -inset-4 border border-foreground/[0.04] -z-10" />
            {/* Floating label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="absolute -bottom-6 -left-6 md:-left-10 glass-card px-6 py-4 z-10"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-primary font-body font-semibold">Est. 2016</p>
              <p className="text-foreground/40 font-body text-[11px] mt-1">Addis Ababa, Ethiopia</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
