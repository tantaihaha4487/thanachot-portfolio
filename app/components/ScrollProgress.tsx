"use client";

import { useScroll, useSpring, motion } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[60] origin-left"
      style={{
        scaleX,
        height: "2px",
        background: "linear-gradient(90deg, #F472B6, #C084FC, #F472B6)",
        backgroundSize: "200% 100%",
        boxShadow: "0 0 8px rgba(244,114,182,0.6)",
      }}
    />
  );
}
