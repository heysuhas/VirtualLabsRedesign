import { useState, useEffect, useCallback } from "react";
import { motion, useSpring } from "framer-motion";

const BlobCursor = () => {
  const cursorX = useSpring(0, { 
    stiffness: 1000, 
    damping: 50,
    mass: 0.1
  });
  const cursorY = useSpring(0, { 
    stiffness: 1000, 
    damping: 50,
    mass: 0.1
  });
  const [isPointer, setIsPointer] = useState(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
    const target = e.target as HTMLElement;
    setIsPointer(
      window.getComputedStyle(target).cursor === "pointer" ||
      target.tagName.toLowerCase() === "button" ||
      target.tagName.toLowerCase() === "a"
    );
  }, [cursorX, cursorY]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: -6,
        translateY: -6
      }}
    >
      <motion.div
        animate={{
          scale: isPointer ? 1.8 : 1.4,
          rotate: isPointer ? -45 : -135 // Changed rotation values
        }}
        transition={{
          type: "spring",
          stiffness: 800,
          damping: 35,
          mass: 0.1
        }}
      >
        <div className="relative w-4 h-4">
          {/* Main Triangle */}
          <div
            className="absolute origin-center"
            style={{
              width: "0",
              height: "0",
              borderLeft: "8px solid white",
              borderTop: "4px solid transparent",
              borderBottom: "4px solid transparent",
              filter: "drop-shadow(0 0 2px rgba(0,0,0,0.1))",
              opacity: 0.9
            }}
          />
          {/* Subtle Glow Effect */}
          <div
            className="absolute blur-[1px] origin-center"
            style={{
              width: "0",
              height: "0",
              borderLeft: "8px solid rgba(255,255,255,0.5)",
              borderTop: "4px solid transparent",
              borderBottom: "4px solid transparent",
              transform: "scale(1.2)",
              opacity: 0.3
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BlobCursor;
