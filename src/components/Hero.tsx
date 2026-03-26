import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { MagneticButton } from "./MagneticButton";
import { TextScramble } from "./TextScramble";

import flowers1 from "@/assets/hero/flowers-1.jpg";
import sunset1 from "@/assets/hero/sunset-1.jpg";
import gala1 from "@/assets/hero/gala-1.jpg";
import table1 from "@/assets/hero/table-1.jpg";
import dance1 from "@/assets/hero/dance-1.jpg";
import sparkle1 from "@/assets/hero/sparkle-1.jpg";

const slides = [
  { image: flowers1, title: "Wedding Films" },
  { image: sunset1, title: "Golden Hour" },
  { image: gala1, title: "Event Coverage" },
  { image: table1, title: "Studio Production" },
  { image: dance1, title: "First Dance" },
  { image: sparkle1, title: "Behind The Scenes" },
];

const morphingWords = ["Emotions", "Stories", "Legacies", "Dreams", "Moments"];

const SplitText = ({ text, delay = 0 }: { text: string; delay?: number }) => (
  <span className="inline-flex overflow-hidden">
    {text.split("").map((char, i) => (
      <motion.span
        key={i}
        initial={{ y: "120%", rotateX: 90, opacity: 0 }}
        animate={{ y: 0, rotateX: 0, opacity: 1 }}
        transition={{
          duration: 0.8,
          delay: delay + i * 0.03,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="inline-block"
        style={{ transformOrigin: "bottom" }}
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ))}
  </span>
);

export const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 250]);
  const opacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const titleY = useTransform(scrollYProgress, [0, 0.5], [0, -80]);

  const [current, setCurrent] = useState(0);
  const [morphIndex, setMorphIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((p) => (p + 1) % slides.length), 2800);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setMorphIndex((p) => (p + 1) % morphingWords.length), 2400);
    return () => clearInterval(timer);
  }, []);

  return (
    <section ref={ref} id="hero" className="relative h-svh w-full flex items-center justify-center overflow-hidden">
      {/* Fast-cycling cinematic background */}
      <motion.div style={{ scale }} className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.15 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img
              src={slides[current].image}
              alt={slides[current].title}
              className="w-full h-full object-cover cinematic-filter"
            />
          </motion.div>
        </AnimatePresence>

        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 30%, hsl(0 0% 2% / 0.85) 100%)" }} />
        {/* Letterbox bars */}
        <div className="absolute top-0 left-0 right-0 h-[5vh] bg-background/90" />
        <div className="absolute bottom-0 left-0 right-0 h-[5vh] bg-background/90" />
      </motion.div>


      {/* Animated frame */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 2 }}
        className="absolute inset-6 md:inset-10 pointer-events-none z-20"
      >
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.5, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-0 left-0 right-0 h-px bg-foreground/[0.06] origin-left"
        />
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.7, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-0 left-0 right-0 h-px bg-foreground/[0.06] origin-right"
        />
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 1.6, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-0 left-0 bottom-0 w-px bg-foreground/[0.06] origin-top"
        />
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 1.8, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-0 right-0 bottom-0 w-px bg-foreground/[0.06] origin-bottom"
        />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: titleY, opacity }}
        className="relative z-10 text-center px-6 max-w-6xl"
      >
        {/* Small pre-title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="mb-6"
        >
          <TextScramble
            text="CINEMATIC PRODUCTION STUDIO"
            className="text-[11px] tracking-[0.5em] uppercase text-foreground/25 font-body"
            delay={0.5}
          />
        </motion.div>

        {/* Main title */}
        <h1 className="text-6xl md:text-[8rem] lg:text-[11rem] font-display font-bold leading-[0.82] tracking-tight text-foreground">
          <SplitText text="Juli-Man" delay={0.5} />
        </h1>

        <div className="overflow-hidden mt-3">
          <motion.p
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl md:text-3xl font-body font-light italic text-foreground/35 tracking-[0.25em] uppercase"
          >
            Productions
          </motion.p>
        </div>

        {/* Morphing words */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 1 }}
          className="mt-8 h-12 md:h-14 overflow-hidden flex items-center justify-center"
        >
          <span className="text-lg md:text-2xl font-body text-foreground/20 mr-3">We Capture</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={morphIndex}
              initial={{ y: 30, opacity: 0, filter: "blur(8px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              exit={{ y: -30, opacity: 0, filter: "blur(8px)" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg md:text-2xl font-display font-bold italic text-primary"
            >
              {morphingWords[morphIndex]}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "120px" }}
          transition={{ delay: 1.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="h-[1px] bg-primary mx-auto mt-6"
        />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 1.2 }}
          className="text-sm md:text-base tracking-[0.5em] uppercase text-primary mt-6 font-body font-semibold"
        >
          Closer Than You Think
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <MagneticButton
            href="#booking"
            className="px-12 py-5 bg-primary text-primary-foreground font-body font-medium text-sm tracking-[0.15em] uppercase relative overflow-hidden group inline-block"
            strength={0.2}
          >
            <span className="relative z-10">Book a Session</span>
            <div className="absolute inset-0 bg-coral-light scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </MagneticButton>
          <MagneticButton
            href="#gallery"
            className="px-12 py-5 border border-foreground/15 text-foreground/60 font-body font-medium text-sm tracking-[0.15em] uppercase hover:border-primary/40 hover:text-foreground transition-all duration-500 inline-block"
            strength={0.2}
          >
            View Work
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Slide counter + category */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-14 left-8 md:left-12 z-20 flex items-center gap-4"
      >
        <span className="text-[11px] font-body text-primary tabular-nums font-semibold">
          {String(current + 1).padStart(2, "0")}
        </span>
        <div className="w-12 h-px bg-foreground/15 relative overflow-hidden">
          <motion.div
            key={current}
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 2.8, ease: "linear" }}
            className="absolute inset-0 bg-primary"
          />
        </div>
        <span className="text-[11px] font-body text-foreground/20 tabular-nums">
          {String(slides.length).padStart(2, "0")}
        </span>
        <span className="text-[10px] font-body text-foreground/15 uppercase tracking-[0.15em] ml-2 hidden md:inline">
          {slides[current].title}
        </span>
      </motion.div>

      {/* Scroll indicator with pulse */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-14 right-8 md:right-12 z-20 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-10 bg-gradient-to-b from-primary/60 to-transparent"
        />
        <span className="text-[9px] font-body text-foreground/20 uppercase tracking-[0.3em]">Scroll</span>
      </motion.div>

      {/* Bottom connection line */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 2, duration: 1, ease: "easeOut" }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent to-primary/40 origin-top z-20"
      />
    </section>
  );
};
