import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Hana Bekele",
    role: "Bride",
    text: "Juli-Man captured every emotion of our wedding day. The cinematic quality was beyond anything we imagined. Watching our film feels like reliving the most beautiful day of our lives.",
    rating: 5,
    location: "Addis Ababa",
  },
  {
    name: "Ahmed Al-Rashid",
    role: "CEO, Al-Rashid Group",
    text: "We hired Juli-Man for our corporate gala in Dubai. The production quality rivaled international studios. Every detail was captured with precision and artistry.",
    rating: 5,
    location: "Dubai",
  },
  {
    name: "Sophie Laurent",
    role: "Fashion Designer",
    text: "The fashion shoot in Paris exceeded all expectations. Juli-Man understands light, composition, and storytelling in a way that elevates any project to art.",
    rating: 5,
    location: "Paris",
  },
  {
    name: "Dawit Tesfaye",
    role: "Music Artist",
    text: "From the audio production to the music video, everything was flawless. The team's creative vision and technical expertise are unmatched in East Africa.",
    rating: 5,
    location: "Addis Ababa",
  },
  {
    name: "Fatima Hassan",
    role: "Event Planner",
    text: "I recommend Juli-Man to all my clients. They consistently deliver stunning results, meet deadlines, and bring a level of professionalism that makes every event memorable.",
    rating: 5,
    location: "Istanbul",
  },
];

export const Testimonials = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [current]);

  const navigate = (dir: number) => {
    setDirection(dir);
    setCurrent((prev) => (prev + dir + testimonials.length) % testimonials.length);
  };

  const t = testimonials[current];

  return (
    <section className="relative py-32 md:py-48 px-8 md:px-12 overflow-hidden">
      <div ref={ref} className="max-w-[1000px] mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-4"
        >
          <span className="text-[11px] uppercase tracking-[0.3em] text-primary font-body font-semibold">
            Client Stories
          </span>
        </motion.div>

        <div className="overflow-hidden mb-20">
          <motion.h2
            initial={{ y: "100%" }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl font-display font-bold text-foreground"
          >
            What They <span className="italic">Say</span>
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative"
        >
          {/* Quote icon */}
          <Quote
            size={60}
            className="text-primary/10 mb-8"
            strokeWidth={1}
          />

          {/* Testimonial content */}
          <motion.div
            key={current}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -direction * 40 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-xl md:text-2xl lg:text-3xl font-display italic text-foreground/80 leading-relaxed mb-10">
              "{t.text}"
            </p>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground font-body font-medium text-lg">{t.name}</p>
                <p className="text-foreground/30 font-body text-sm mt-1">
                  {t.role} · {t.location}
                </p>
                <div className="flex gap-1 mt-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} className="text-primary fill-primary" />
                  ))}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate(-1)}
                  className="w-10 h-10 border border-foreground/10 flex items-center justify-center text-foreground/30 hover:text-foreground hover:border-foreground/30 transition-all duration-500"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={18} />
                </button>
                <span className="text-[11px] font-body text-foreground/25 tabular-nums">
                  {String(current + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
                </span>
                <button
                  onClick={() => navigate(1)}
                  className="w-10 h-10 border border-foreground/10 flex items-center justify-center text-foreground/30 hover:text-foreground hover:border-foreground/30 transition-all duration-500"
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Progress dots */}
          <div className="flex gap-2 mt-12">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                className={`h-[2px] transition-all duration-700 ${
                  i === current ? "w-10 bg-primary" : "w-4 bg-foreground/10 hover:bg-foreground/20"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
