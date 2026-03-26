import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import logo from "@/assets/logo.png";

export const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "reveal" | "done">("loading");

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setPhase("reveal"), 300);
          setTimeout(() => {
            setPhase("done");
            onComplete();
          }, 1400);
          return 100;
        }
        return prev + Math.random() * 8 + 2;
      });
    }, 80);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
          style={{ background: "linear-gradient(135deg, hsl(225 50% 4%), hsl(0 0% 2%), hsl(0 100% 11% / 0.3))" }}
        >
          {/* Animated background rings */}
          <div className="absolute inset-0 overflow-hidden">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border border-primary/5"
                style={{
                  width: `${i * 300}px`,
                  height: `${i * 300}px`,
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
                animate={{ scale: [1, 1.1, 1], rotate: [0, 360] }}
                transition={{ duration: 8 + i * 4, repeat: Infinity, ease: "linear" }}
              />
            ))}
          </div>

          {/* Logo */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={phase === "reveal"
              ? { scale: 1.5, opacity: 0, y: -30 }
              : { scale: 1, opacity: 1, y: 0 }
            }
            transition={{ duration: phase === "reveal" ? 0.8 : 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 mb-12"
          >
            <img src={logo} alt="Juli-Man" className="h-16 md:h-20 object-contain" />
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={phase === "reveal"
              ? { opacity: 0, width: 200 }
              : { opacity: 1, width: 200 }
            }
            className="relative z-10"
          >
            <div className="w-[200px] h-[1px] bg-foreground/10 relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-primary"
                style={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <p className="text-[10px] tracking-[0.4em] uppercase text-foreground/20 font-body mt-4 text-center tabular-nums">
              {Math.min(Math.round(progress), 100)}%
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
