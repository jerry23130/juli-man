import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MessageSquare, Lightbulb, Camera, Film, Sparkles } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    number: "01",
    title: "Consultation",
    desc: "We listen to your vision, understand your goals, and craft a tailored plan for your project.",
  },
  {
    icon: Lightbulb,
    number: "02",
    title: "Pre-Production",
    desc: "Storyboarding, location scouting, scheduling, and creative direction — every detail planned.",
  },
  {
    icon: Camera,
    number: "03",
    title: "Production",
    desc: "Our crew captures your story with cinema-grade equipment and artistic precision on set.",
  },
  {
    icon: Film,
    number: "04",
    title: "Post-Production",
    desc: "Color grading, editing, sound design, and VFX — transforming raw footage into cinematic art.",
  },
  {
    icon: Sparkles,
    number: "05",
    title: "Delivery",
    desc: "Final review, revisions, and delivery in multiple formats optimized for every platform.",
  },
];

export const Process = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-32 md:py-48 px-8 md:px-12">
      <div ref={ref} className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-4"
        >
          <span className="text-[11px] uppercase tracking-[0.3em] text-primary font-body font-semibold">
            Our Process
          </span>
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20">
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-6xl font-display font-bold text-foreground"
            >
              How We <span className="italic">Create</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-foreground/30 font-body text-sm max-w-sm"
          >
            From the first conversation to the final frame — a seamless journey to bring your vision to life.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Vertical connecting line — desktop */}
          <div className="hidden md:block absolute left-[39px] top-0 bottom-0 w-px bg-foreground/[0.06]" />

          <div className="space-y-0">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex items-start gap-8 md:gap-12 py-10 border-b border-foreground/[0.04] hover:border-primary/20 transition-colors duration-700"
              >
                {/* Number circle */}
                <div className="relative z-10 w-20 h-20 shrink-0 border border-foreground/10 group-hover:border-primary/40 flex items-center justify-center transition-all duration-700">
                  <span className="text-2xl font-display font-bold text-foreground/15 group-hover:text-primary transition-colors duration-700">
                    {step.number}
                  </span>
                </div>

                <div className="flex-1 flex flex-col md:flex-row md:items-center gap-4 md:gap-12">
                  <div className="flex items-center gap-4 md:w-56 shrink-0">
                    <step.icon
                      size={20}
                      strokeWidth={1.5}
                      className="text-foreground/15 group-hover:text-primary transition-colors duration-500"
                    />
                    <h3 className="text-xl md:text-2xl font-display font-semibold text-foreground/70 group-hover:text-foreground transition-colors duration-500">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-sm text-foreground/30 font-body leading-relaxed group-hover:text-foreground/50 transition-colors duration-500 max-w-md">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
