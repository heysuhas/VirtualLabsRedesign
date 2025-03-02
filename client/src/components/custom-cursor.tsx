import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Use requestAnimationFrame for smoother cursor movement
      requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });

        // Check if hovering over clickable element
        const target = e.target as HTMLElement;
        setIsPointer(
          window.getComputedStyle(target).cursor === "pointer" ||
          target.tagName.toLowerCase() === "button" ||
          target.tagName.toLowerCase() === "a" ||
          target.closest("button") !== null ||
          target.closest("a") !== null ||
          target.closest("[role='slider']") !== null // Add support for slider elements
        );
      });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full bg-sky-500 mix-blend-difference pointer-events-none z-[9999]"
        animate={{
          scale: isClicking ? 0.8 : 1,
          x: position.x - 16,
          y: position.y - 16,
        }}
        transition={{
          type: "tween", // Change to tween for smoother movement
          duration: 0.1,  // Reduce duration
          ease: "linear"  // Use linear easing
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-16 h-16 bg-sky-500 rounded-full border-4 border-primary mix-blend-difference pointer-events-none z-[9999]"
        animate={{
          scale: isPointer ? 0.8 : 0.2,
          x: position.x - 32,
          y: position.y - 32,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 35,
        }}
      />
    </>
  );
}