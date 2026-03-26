import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, type ReactNode, type MouseEvent } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  tiltStrength?: number;
  glareEnabled?: boolean;
}

export const TiltCard = ({ children, className = "", tiltStrength = 15, glareEnabled = true }: TiltCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(y, [0, 1], [tiltStrength, -tiltStrength]), { damping: 20, stiffness: 200 });
  const rotateY = useSpring(useTransform(x, [0, 1], [-tiltStrength, tiltStrength]), { damping: 20, stiffness: 200 });
  const glareX = useTransform(x, [0, 1], [0, 100]);
  const glareY = useTransform(y, [0, 1], [0, 100]);

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      className={`relative ${className}`}
    >
      {children}
      {glareEnabled && (
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-inherit"
          style={{
            background: useTransform(
              [glareX, glareY],
              ([gx, gy]) => `radial-gradient(circle at ${gx}% ${gy}%, hsl(14 100% 59% / 0.12), transparent 60%)`
            ),
          }}
        />
      )}
    </motion.div>
  );
};
