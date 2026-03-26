import { useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { X, ChevronDown } from "lucide-react";
import { useRef } from "react";

import wedding1 from "@/assets/gallery/wedding-1.jpg";
import wedding2 from "@/assets/gallery/wedding-2.jpg";
import wedding3 from "@/assets/gallery/wedding-3.jpg";
import portrait1 from "@/assets/gallery/portrait-1.jpg";
import portrait2 from "@/assets/gallery/portrait-2.jpg";
import food1 from "@/assets/gallery/food-1.jpg";
import food2 from "@/assets/gallery/food-2.jpg";
import event1 from "@/assets/gallery/event-1.jpg";
import event2 from "@/assets/gallery/event-2.jpg";
import dubai1 from "@/assets/gallery/dubai-1.jpg";
import paris1 from "@/assets/gallery/paris-1.jpg";
import product1 from "@/assets/gallery/product-1.jpg";
import product2 from "@/assets/gallery/product-2.jpg";
import birthday1 from "@/assets/gallery/birthday-1.jpg";
import birthday2 from "@/assets/gallery/birthday-2.jpg";
import holiday1 from "@/assets/gallery/holiday-1.jpg";
import holiday2 from "@/assets/gallery/holiday-2.jpg";
import graduation1 from "@/assets/gallery/graduation-1.jpg";
import engagement1 from "@/assets/gallery/engagement-1.jpg";
import realestate1 from "@/assets/gallery/realestate-1.jpg";
import fashion1 from "@/assets/gallery/fashion-1.jpg";
import baby1 from "@/assets/gallery/baby-1.jpg";
import addis1 from "@/assets/gallery/addis-1.jpg";
import london1 from "@/assets/gallery/london-1.jpg";
import istanbul1 from "@/assets/gallery/istanbul-1.jpg";

interface GalleryItem {
  id: number;
  src: string;
  title: string;
  category: string;
  location: string;
  aspect: string;
}

const items: GalleryItem[] = [
  { id: 1, src: wedding1, title: "Sacred Union", category: "Weddings", location: "Addis Ababa", aspect: "aspect-[3/4]" },
  { id: 2, src: wedding2, title: "Golden Reception", category: "Weddings", location: "Dubai", aspect: "aspect-[4/3]" },
  { id: 3, src: wedding3, title: "Parisian Romance", category: "Weddings", location: "Paris", aspect: "aspect-[3/4]" },
  { id: 4, src: portrait1, title: "Executive Presence", category: "Portraits", location: "Addis Ababa", aspect: "aspect-[3/4]" },
  { id: 5, src: portrait2, title: "Radiance", category: "Portraits", location: "Addis Ababa", aspect: "aspect-[3/4]" },
  { id: 6, src: birthday1, title: "Joyful Celebration", category: "Birthdays", location: "Addis Ababa", aspect: "aspect-[4/3]" },
  { id: 7, src: birthday2, title: "Little Stars", category: "Birthdays", location: "Addis Ababa", aspect: "aspect-[4/3]" },
  { id: 8, src: holiday1, title: "Cultural Festivity", category: "Holidays", location: "Addis Ababa", aspect: "aspect-[4/3]" },
  { id: 9, src: holiday2, title: "Season of Joy", category: "Holidays", location: "London", aspect: "aspect-[4/3]" },
  { id: 10, src: event1, title: "Corporate Summit", category: "Events", location: "Dubai", aspect: "aspect-[4/3]" },
  { id: 11, src: event2, title: "Festival Nights", category: "Events", location: "Addis Ababa", aspect: "aspect-[4/3]" },
  { id: 12, src: food1, title: "Gourmet Elegance", category: "Food", location: "Paris", aspect: "aspect-[4/3]" },
  { id: 13, src: food2, title: "Ethiopian Flavors", category: "Food", location: "Addis Ababa", aspect: "aspect-[4/3]" },
  { id: 14, src: product1, title: "Luxury Essence", category: "Products", location: "Dubai", aspect: "aspect-[3/4]" },
  { id: 15, src: product2, title: "Timeless Craft", category: "Products", location: "Istanbul", aspect: "aspect-[4/3]" },
  { id: 16, src: graduation1, title: "Proud Moment", category: "Graduation", location: "Addis Ababa", aspect: "aspect-[3/4]" },
  { id: 17, src: engagement1, title: "Eternal Promise", category: "Engagement", location: "Addis Ababa", aspect: "aspect-[3/4]" },
  { id: 18, src: realestate1, title: "Luxury Living", category: "Real Estate", location: "Dubai", aspect: "aspect-[4/3]" },
  { id: 19, src: fashion1, title: "Studio Glam", category: "Fashion", location: "Paris", aspect: "aspect-[3/4]" },
  { id: 20, src: baby1, title: "Tender Beginnings", category: "Baby Shoots", location: "Addis Ababa", aspect: "aspect-[3/4]" },
  { id: 21, src: dubai1, title: "Golden Hour Dubai", category: "Events", location: "Dubai", aspect: "aspect-[4/3]" },
  { id: 22, src: paris1, title: "City of Light", category: "Events", location: "Paris", aspect: "aspect-[4/3]" },
  { id: 23, src: addis1, title: "Addis Sunset", category: "Events", location: "Addis Ababa", aspect: "aspect-[4/3]" },
  { id: 24, src: london1, title: "Thames Twilight", category: "Events", location: "London", aspect: "aspect-[4/3]" },
  { id: 25, src: istanbul1, title: "Bosphorus Magic", category: "Events", location: "Istanbul", aspect: "aspect-[4/3]" },
];

const categories = [
  "All", "Weddings", "Engagement", "Birthdays", "Holidays", "Graduation",
  "Portraits", "Fashion", "Baby Shoots", "Events", "Food", "Products", "Real Estate"
];

const locations = [
  "All", "Addis Ababa", "Dubai", "Paris", "London", "Istanbul",
  "New York", "Nairobi", "Bahir Dar", "Hawassa", "Dire Dawa"
];

export const Gallery = () => {
  const [cat, setCat] = useState("All");
  const [loc, setLoc] = useState("All");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);
  const [showAllCats, setShowAllCats] = useState(false);
  const [showAllLocs, setShowAllLocs] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const filtered = items.filter(
    (i) => (cat === "All" || i.category === cat) && (loc === "All" || i.location === loc)
  );

  const visibleCats = showAllCats ? categories : categories.slice(0, 7);
  const visibleLocs = showAllLocs ? locations : locations.slice(0, 6);

  return (
    <section id="gallery" className="relative py-32 md:py-48 px-8 md:px-12">
      <div ref={ref} className="max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-4"
        >
          <span className="text-[11px] uppercase tracking-[0.3em] text-primary font-body font-semibold">Portfolio</span>
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-6xl font-display font-bold text-foreground"
            >
              Selected Work
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-foreground/30 font-body text-sm max-w-sm"
          >
            Explore our work across categories and cities worldwide. Click any image to view full screen.
          </motion.p>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-col gap-6 mb-14"
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.25em] text-foreground/30 font-body mr-2 w-16">Type</span>
            {visibleCats.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`px-4 py-2 text-[12px] uppercase tracking-[0.1em] font-body transition-all duration-400 ${
                  cat === c
                    ? "text-primary border-b-2 border-primary"
                    : "text-foreground/30 hover:text-foreground/60"
                }`}
              >
                {c}
              </button>
            ))}
            {categories.length > 7 && (
              <button
                onClick={() => setShowAllCats(!showAllCats)}
                className="px-3 py-2 text-[12px] text-primary/60 hover:text-primary transition-colors flex items-center gap-1 font-body"
              >
                {showAllCats ? "Less" : `+${categories.length - 7}`}
                <ChevronDown size={12} className={`transition-transform ${showAllCats ? "rotate-180" : ""}`} />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.25em] text-foreground/30 font-body mr-2 w-16">City</span>
            {visibleLocs.map((l) => (
              <button
                key={l}
                onClick={() => setLoc(l)}
                className={`px-4 py-2 text-[12px] uppercase tracking-[0.1em] font-body transition-all duration-400 ${
                  loc === l
                    ? "text-primary border-b-2 border-primary"
                    : "text-foreground/30 hover:text-foreground/60"
                }`}
              >
                {l}
              </button>
            ))}
            {locations.length > 6 && (
              <button
                onClick={() => setShowAllLocs(!showAllLocs)}
                className="px-3 py-2 text-[12px] text-primary/60 hover:text-primary transition-colors flex items-center gap-1 font-body"
              >
                {showAllLocs ? "Less" : `+${locations.length - 6}`}
                <ChevronDown size={12} className={`transition-transform ${showAllLocs ? "rotate-180" : ""}`} />
              </button>
            )}
          </div>
        </motion.div>

        {/* Grid */}
        <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-3 space-y-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, type: "spring", bounce: 0 }}
                key={item.id}
                onClick={() => setLightbox(item)}
                className="relative overflow-hidden group cursor-pointer break-inside-avoid"
              >
                <div className={item.aspect}>
                  <img
                    src={item.src}
                    alt={item.title}
                    loading="lazy"
                    className="object-cover w-full h-full transition-all duration-700 group-hover:scale-105 cinematic-filter"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-5">
                  <p className="text-foreground font-display font-semibold text-lg italic">{item.title}</p>
                  <p className="text-[11px] uppercase tracking-[0.15em] text-primary font-body mt-1">{item.category} · {item.location}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center mt-20 py-16">
            <p className="text-foreground/30 font-body text-lg">No work matches the selected filters.</p>
            <button
              onClick={() => { setCat("All"); setLoc("All"); }}
              className="mt-4 text-primary text-sm font-body hover:text-coral-light transition-colors"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/97 backdrop-blur-2xl flex items-center justify-center p-6"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-8 right-8 text-foreground/40 hover:text-foreground transition-colors z-10"
              onClick={() => setLightbox(null)}
            >
              <X size={28} strokeWidth={1.5} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", bounce: 0, duration: 0.5 }}
              src={lightbox.src}
              alt={lightbox.title}
              className="max-w-full max-h-[85vh] object-contain cinematic-filter"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute bottom-10 text-center">
              <p className="text-foreground font-display font-semibold text-2xl italic">{lightbox.title}</p>
              <p className="text-[11px] uppercase tracking-[0.2em] text-primary font-body mt-2">
                {lightbox.category} · {lightbox.location}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
