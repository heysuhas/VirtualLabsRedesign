// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";

// export default function CustomCursor() {
//   const [position, setPosition] = useState({ x: 0, y: 0 });
//   const [isPointer, setIsPointer] = useState(false);
//   const [isClicking, setIsClicking] = useState(false);

//   useEffect(() => {
//     const handleMouseMove = (e: MouseEvent) => {
//       setPosition({ x: e.clientX, y: e.clientY });
//       const target = e.target as HTMLElement;
//       setIsPointer(
//         window.getComputedStyle(target).cursor === "pointer" ||
//         target.tagName.toLowerCase() === "button" ||
//         target.tagName.toLowerCase() === "a"
//       );
//     };

//     const handleMouseDown = () => setIsClicking(true);
//     const handleMouseUp = () => setIsClicking(false);

//     window.addEventListener("mousemove", handleMouseMove);
//     window.addEventListener("mousedown", handleMouseDown);
//     window.addEventListener("mouseup", handleMouseUp);

//     return () => {
//       window.removeEventListener("mousemove", handleMouseMove);
//       window.removeEventListener("mousedown", handleMouseDown);
//       window.removeEventListener("mouseup", handleMouseUp);
//     };
//   }, []);

//   return (
//     <motion.div
//       className="fixed top-0 left-0 pointer-events-none z-[9999]"
//       animate={{
//         x: position.x,
//         y: position.y,
//         scale: isClicking ? 0.8 : 1
//       }}
//       transition={{
//         type: "spring",
//         stiffness: 500,
//         damping: 28
//       }}
//     >
//       <div 
//         className={`w-4 h-4 transform -translate-x-1/2 -translate-y-1/2
//         border-t-[6px] border-l-[6px] border-black/50 rotate-[225deg]
//         ${isPointer ? 'scale-125' : 'scale-100'}`}
//       />
//     </motion.div>
//   );
// }