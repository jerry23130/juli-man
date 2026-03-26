import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const chars = "!<>-_\\/[]{}—=+*^?#________";

interface TextScrambleProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}

export const TextScramble = ({ text, className = "", delay = 0, speed = 30 }: TextScrambleProps) => {
  const [displayed, setDisplayed] = useState("");
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const timer = setTimeout(() => setStarted(true), delay * 1000);
    return () => clearTimeout(timer);
  }, [inView, delay]);

  useEffect(() => {
    if (!started) return;
    let frame = 0;
    const totalFrames = text.length * 3;

    const interval = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const revealedCount = Math.floor(progress * text.length);
      
      let result = "";
      for (let i = 0; i < text.length; i++) {
        if (i < revealedCount) {
          result += text[i];
        } else if (i < revealedCount + 3) {
          result += text[i] === " " ? " " : chars[Math.floor(Math.random() * chars.length)];
        } else {
          result += text[i] === " " ? " " : "";
        }
      }
      
      setDisplayed(result);
      if (frame >= totalFrames) {
        setDisplayed(text);
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [started, text, speed]);

  return (
    <span ref={ref} className={className}>
      {started ? displayed : ""}
    </span>
  );
};
