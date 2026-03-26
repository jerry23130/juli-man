import { useEffect } from "react";
import Lenis from "lenis";

export const SmoothScroll = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      syncTouch: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Dispatch native scroll event so framer-motion useScroll works
    let lastScrollTime = 0;
    lenis.on("scroll", () => {
      const now = Date.now();
      if (now - lastScrollTime > 16) { // Throttle to ~60fps
        window.dispatchEvent(new Event("scroll"));
        lastScrollTime = now;
      }
    });

    // Handle anchor links
    const handleClick = (e: Event) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a[href^='#']");
      if (anchor) {
        e.preventDefault();
        const id = anchor.getAttribute("href")!;
        const el = document.querySelector(id);
        if (el) lenis.scrollTo(el as HTMLElement, { offset: -80 });
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      lenis.destroy();
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return null;
};
