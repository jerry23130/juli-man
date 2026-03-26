import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, type MouseEvent } from "react";
import { Camera, Video, Mic, Heart, User, UtensilsCrossed, Building, Clapperboard, ArrowUpRight } from "lucide-react";

const services = [
  { icon: Camera, title: "Photography", desc: "High-end photography for every occasion — capturing light, emotion, and truth.", num: "01" },
  { icon: Video, title: "Videography", desc: "Cinematic video production with professional color grading and storytelling.", num: "02" },
  { icon: Mic, title: "Audio Production", desc: "Crystal-clear audio recording and post-production for any project.", num: "03" },
  { icon: Heart, title: "Weddings & Events", desc: "Your most precious moments, immortalized with elegance and artistry.", num: "04" },
  { icon: User, title: "Portrait & Headshots", desc: "Professional portraits that capture your essence with dramatic lighting.", num: "05" },
  { icon: UtensilsCrossed, title: "Food & Product", desc: "Mouth-watering food photography and luxurious product showcases.", num: "06" },
  { icon: Building, title: "Studio Rentals", desc: "State-of-the-art studio space available for your creative projects.", num: "07" },
  { icon: Clapperboard, title: "Production", desc: "Full-scale production services from pre-production to final delivery.", num: "08" },
];

const ServiceCard = ({ service, index, inView }: { service: typeof services[0]; index: number; inView: boolean }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.06, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group cursor-pointer overflow-hidden border-b border-border/15 py-8 md:py-10"
    >
      {/* Hover spotlight */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, hsl(var(--primary) / 0.08), transparent 60%)`,
          }}
        />
      )}

      <div className="relative z-10 flex items-center gap-6 md:gap-10">
        <span className="text-[11px] font-body text-foreground/10 group-hover:text-primary/40 transition-colors duration-700 w-6 tabular-nums">
          {service.num}
        </span>
        <motion.div
          className="text-foreground/15 group-hover:text-primary transition-colors duration-500"
          animate={isHovered ? { rotate: 10, scale: 1.15 } : { rotate: 0, scale: 1 }}
        >
          <service.icon size={26} strokeWidth={1.5} />
        </motion.div>
        <div className="flex-1">
          <h3 className="text-xl md:text-2xl font-display font-semibold text-foreground/70 group-hover:text-foreground transition-colors duration-500">
            {service.title}
          </h3>
          <motion.p
            initial={{ height: 0, opacity: 0 }}
            animate={isHovered ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-sm text-foreground/35 font-body mt-2 max-w-lg overflow-hidden"
          >
            {service.desc}
          </motion.p>
        </div>
        <motion.div
          animate={isHovered ? { x: 4, y: -4, opacity: 1 } : { x: 0, y: 0, opacity: 0.15 }}
          className="text-primary transition-all duration-500"
        >
          <ArrowUpRight size={20} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export const Services = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section id="services" ref={containerRef} className="relative py-32 md:py-48 px-8 md:px-12">
      {/* Subtle background gradient */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/4 left-0 w-[600px] h-[600px] rounded-full bg-burgundy/5 blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] rounded-full bg-navy/10 blur-[100px]" />
      </motion.div>

      <div ref={ref} className="max-w-[1000px] mx-auto relative">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-4 flex items-center gap-4"
        >
          <div className="w-12 h-[1px] bg-primary" />
          <span className="text-[11px] uppercase tracking-[0.3em] text-primary font-body font-semibold">What We Do</span>
        </motion.div>

        <div className="overflow-hidden mb-16">
          <motion.h2
            initial={{ y: "100%" }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl font-display font-bold text-foreground"
          >
            Our <span className="italic">Services</span>
          </motion.h2>
        </div>

        <div className="border-t border-border/15">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
};
