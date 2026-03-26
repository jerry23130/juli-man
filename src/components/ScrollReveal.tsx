import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "left" | "right";
  delay?: number;
}

export const ScrollReveal = ({ children, className = "", direction = "up", delay = 0 }: ScrollRevealProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.3"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], direction === "up" ? [80, 0] : [0, 0]);
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "left" ? [-60, 0] : direction === "right" ? [60, 0] : [0, 0]
  );

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y, x }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
