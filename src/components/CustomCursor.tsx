import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [hidden, setHidden] = useState(false);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if touch device
    if ("ontouchstart" in window) {
      setHidden(true);
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], input, textarea, select, .cursor-pointer")) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = () => setIsHovering(false);
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    // Hide default cursor
    document.body.style.cursor = "none";
    const style = document.createElement("style");
    style.textContent = "a,button,input,textarea,select,[role='button'],.cursor-pointer{cursor:none!important}";
    document.head.appendChild(style);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      style.remove();
    };
  }, [cursorX, cursorY]);

  if (hidden) return null;

  return (
    <>
      {/* Main dot */}
      <motion.div
        className="fixed top-0 left-0 z-[999] pointer-events-none mix-blend-difference"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          animate={{
            width: isHovering ? 60 : isClicking ? 6 : 10,
            height: isHovering ? 60 : isClicking ? 6 : 10,
            borderRadius: "50%",
          }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="bg-primary-foreground"
          style={{ opacity: isHovering ? 0.15 : 1 }}
        />
      </motion.div>

      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 z-[998] pointer-events-none"
        style={{
          x: useSpring(cursorX, { damping: 15, stiffness: 150 }),
          y: useSpring(cursorY, { damping: 15, stiffness: 150 }),
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            width: isHovering ? 80 : 36,
            height: isHovering ? 80 : 36,
            borderWidth: isHovering ? 2 : 1,
            opacity: isClicking ? 0.3 : 0.4,
          }}
          transition={{ type: "spring", damping: 20, stiffness: 200 }}
          className="rounded-full border-primary"
          style={{ borderStyle: "solid", borderColor: "hsl(14 100% 59% / 0.4)" }}
        />
      </motion.div>
    </>
  );
};
