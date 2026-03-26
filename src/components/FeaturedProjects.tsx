import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { TiltCard } from "./TiltCard";

import project1 from "@/assets/projects/project-1.jpg";
import project2 from "@/assets/projects/project-2.jpg";
import project3 from "@/assets/projects/project-3.jpg";
import project4 from "@/assets/projects/project-4.jpg";
import project5 from "@/assets/projects/project-5.jpg";
import project6 from "@/assets/projects/project-6.jpg";

const projects = [
  { image: project1, title: "Behind The Lens", category: "Studio Production", year: "2024" },
  { image: project2, title: "Sacred Union", category: "Wedding Film", year: "2024" },
  { image: project3, title: "Lumière", category: "Portrait Series", year: "2023" },
  { image: project4, title: "Grand Gala", category: "Event Coverage", year: "2024" },
  { image: project5, title: "Ethiopian Flavors", category: "Food Photography", year: "2023" },
  { image: project6, title: "Sound & Vision", category: "Audio Production", year: "2024" },
];

export const FeaturedProjects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

  return (
    <section ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        {/* Header */}
        <div ref={headerRef} className="px-8 md:px-12 mb-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-4 mb-4"
          >
            <div className="w-12 h-[1px] bg-primary" />
            <span className="text-[11px] uppercase tracking-[0.3em] text-primary font-body font-semibold">
              Featured Work
            </span>
          </motion.div>
          <div className="flex items-end justify-between">
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                animate={headerInView ? { y: 0 } : {}}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl md:text-6xl font-display font-bold text-foreground"
              >
                Selected <span className="italic">Projects</span>
              </motion.h2>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={headerInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="hidden md:block text-[11px] uppercase tracking-[0.2em] text-foreground/25 font-body"
            >
              Scroll to explore →
            </motion.p>
          </div>
        </div>

        {/* Horizontal scroll track */}
        <motion.div
          style={{ x }}
          className="flex gap-6 md:gap-8 pl-8 md:pl-12"
        >
          {projects.map((project, i) => (
            <TiltCard
              key={project.title}
              className="shrink-0 w-[75vw] md:w-[45vw] lg:w-[35vw] group cursor-pointer"
              tiltStrength={8}
            >
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Image */}
                <div className="relative overflow-hidden aspect-[16/10]">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover cinematic-filter transition-transform duration-&lsqb;1.2s&rsqb; group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />
                  
                  {/* Hover overlay content */}
                  <motion.div
                    className="absolute bottom-6 left-6 right-6 flex items-end justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  >
                    <span className="text-[10px] uppercase tracking-[0.2em] text-primary font-body font-semibold">
                      View Project
                    </span>
                    <ArrowRight size={16} className="text-primary" />
                  </motion.div>

                  {/* Corner accents */}
                  <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-foreground/0 group-hover:border-primary/40 transition-all duration-700" />
                  <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-foreground/0 group-hover:border-primary/40 transition-all duration-700" />
                </div>

                {/* Info */}
                <div className="mt-5 flex items-start justify-between">
                  <div>
                    <h3 className="text-xl md:text-2xl font-display font-semibold text-foreground group-hover:text-primary transition-colors duration-500">
                      {project.title}
                    </h3>
                    <p className="text-[11px] uppercase tracking-[0.15em] text-foreground/30 font-body mt-1">
                      {project.category}
                    </p>
                  </div>
                  <span className="text-[11px] text-foreground/15 font-body tabular-nums mt-1">
                    {project.year}
                  </span>
                </div>
              </motion.div>
            </TiltCard>
          ))}

          {/* End CTA card */}
          <div className="shrink-0 w-[75vw] md:w-[30vw] flex items-center justify-center">
            <a
              href="#gallery"
              className="group flex flex-col items-center gap-6 text-center"
            >
              <motion.div
                whileHover={{ scale: 1.05, rotate: 90 }}
                transition={{ duration: 0.5 }}
                className="w-20 h-20 border border-foreground/10 group-hover:border-primary/50 flex items-center justify-center transition-colors duration-500"
              >
                <ArrowRight size={24} className="text-foreground/20 group-hover:text-primary transition-colors duration-500" />
              </motion.div>
              <span className="text-sm uppercase tracking-[0.2em] text-foreground/30 group-hover:text-primary font-body transition-colors duration-500">
                View All Work
              </span>
            </a>
          </div>
        </motion.div>

        {/* Progress indicator */}
        <div className="px-8 md:px-12 mt-10">
          <div className="max-w-[300px] h-[1px] bg-foreground/10 relative overflow-hidden">
            <motion.div
              style={{ scaleX: scrollYProgress }}
              className="absolute inset-y-0 left-0 right-0 bg-primary origin-left"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
