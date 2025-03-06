import { useState, useRef, useEffect } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { motion, useAnimation, useInView, useMotionValue, useAnimationControls } from 'framer-motion';
import { Youtube, Twitter, Linkedin, Mail, Facebook, Cpu, Cog, MonitorDot, TestTube2 } from 'lucide-react';

const engineeringFields = [
  { name: 'Electronics', icon: <Cpu size={32} />, color: 'from-yellow-500/30' },
  { name: 'Mechanics', icon: <Cog size={32} />, color: 'from-blue-500/30' },
  { name: 'Computer Science', icon: <MonitorDot size={32} />, color: 'from-green-500/30' },
  { name: 'Chemistry', icon: <TestTube2 size={32} />, color: 'from-purple-500/30' }
];

const CardComponent = ({ field, index, onHover }: { field: any, index: number, onHover: (hovering: boolean) => void }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  return (
    <motion.div
      className={`p-8 rounded-xl bg-black/5 dark:bg-white/10 backdrop-blur-sm 
        border border-primary/10 dark:border-white/10
        flex flex-col items-center text-center min-w-[250px] cursor-pointer
        ${field.color} to-transparent`}
      whileHover={{ 
        scale: 1.05,
        y: -10,
        boxShadow: isDark
          ? "0 20px 30px -10px rgba(255,255,255,0.2)"
          : "0 20px 30px -10px rgba(0,0,0,0.4)",
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      <motion.div 
        className="mb-4 text-primary dark:text-white/90"
        whileHover={{ rotate: [0, -10, 10, 0] }}
        transition={{ duration: 0.5 }}
      >
        {field.icon}
      </motion.div>
      <h3 className="font-semibold text-lg">{field.name}</h3>
    </motion.div>
  );
};

const CardCarousel = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const controls = useAnimationControls();
  const x = useMotionValue(-width);
  
  const duplicatedFields = [...engineeringFields, ...engineeringFields, ...engineeringFields];
  
  useEffect(() => {
    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth / 2);
    }
  }, []);

  useEffect(() => {
  if (isPaused) {
    controls.stop();
  } else {
    controls.start({
      x: [x.get(), -width], // Resume from current position
      transition: {
        x: {
          from: x.get(), // Continue from where it stopped
          to: -width,
          repeat: Infinity,
          repeatType: "loop",
          duration: (25 * (1 - (x.get() / -width))), // Adjust duration dynamically
          ease: "linear",
        }
      }
    });
  }
}, [isPaused, controls, width, x]);

  

  return (
    <div className="relative w-full max-w-5xl mx-auto mb-12">
      <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-background to-transparent z-10" />
      
      <div className="overflow-hidden py-12"> 
        <motion.div 
          ref={carouselRef}
          className="flex gap-8"
          initial={{ x: -width }}
          animate={controls}
          style={{ x }}
        >
          {duplicatedFields.map((field, i) => (
            <motion.div
              key={i}
              className="relative"
              style={{ zIndex: 20 }}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div className={`p-8 rounded-xl bg-black/5 dark:bg-white/10 backdrop-blur-sm 
                border border-primary/10 dark:border-white/10
                flex flex-col items-center text-center min-w-[250px]
                ${field.color} to-transparent
                hover:scale-105 hover:-translate-y-2 transition-transform duration-300`}
              >
                <div className="mb-4 text-primary dark:text-white/90">
                  {field.icon}
                </div>
                <h3 className="font-semibold text-lg">{field.name}</h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default function Landing() {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.1 });
  const buttonRef = useRef(null);

  return (
    <div className="min-h-screen w-full flex flex-col bg-background relative overflow-hidden">
      {/* Background pattern */}
      <motion.div className="absolute inset-0">
        <svg className="absolute inset-0 w-[200%] h-[200%] opacity-30 dark:opacity-20">
          <defs>
            <pattern 
              id="circuit" 
              x="0" 
              y="0" 
              width="50" 
              height="50" 
              patternUnits="userSpaceOnUse"
            >
              <path 
                d="M10 10h30v30h-30z M25 10 L25 0 M25 40 L25 50 M10 25 L0 25 M40 25 L50 25" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="0.5"
                className="opacity-50 dark:opacity-50"
              />
              <motion.circle 
                cx="25" 
                cy="25" 
                r="2"
                fill="currentColor"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.7, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </pattern>
          </defs>
          <motion.rect 
            x="0" 
            y="0" 
            width="100%" 
            height="100%" 
            fill="url(#circuit)"
            animate={{
              x: [-20, 0, -20],
              y: [-20, 0, -20]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </svg>
      </motion.div>

      {/* Main content - adjusted positioning */}
      <div className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center -mt-14">
        <div className="w-full max-w-[90vw] md:max-w-[85vw] lg:max-w-5xl mx-auto 
          flex flex-col items-center justify-center gap-4 md:gap-6 py-8">
          {/* Title */}
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent 
              bg-gradient-to-r from-primary via-primary/80 to-primary/60 
              dark:from-white dark:to-white/60 leading-relaxed text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Virtual Labs - IIITH
          </motion.h1>

          {/* Cards */}
          <div className="w-full">
            <CardCarousel />
          </div>

          {/* Button */}
          <motion.div className="relative group -mt-10">
            <motion.div
              className="absolute -inset-1 rounded-lg bg-gradient-to-r 
                from-primary/50 via-primary/30 to-primary/50 
                dark:from-white/30 dark:via-white/10 dark:to-white/30 
                opacity-0 group-hover:opacity-100 
                blur-lg transition-all duration-500"
              variants={{
                hover: {
                  scale: 1.1,
                  rotate: -2
                }
              }}
            />
            <Link href="/home">
              <motion.button
                className="relative bg-primary hover:bg-primary/90 text-white  /* Changed text color to white */
                  dark:bg-white dark:text-background dark:hover:bg-white/90
                  px-8 py-3 rounded-lg font-semibold text-lg
                  dark:shadow-[0_4px_14px_0_rgba(255,255,255,0.39)]
                  transition-all duration-200"
                variants={{
                  hover: {
                    scale: 1.05
                  }
                }}
              >
                <span className="relative z-10">Start Learning</span>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.footer 
        ref={footerRef}
        initial={{ opacity: 0, y: 50 }}
        animate={{ 
          opacity: isInView ? 1 : 0,
          y: isInView ? 0 : 50 
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full bg-background/80 backdrop-blur-sm border-t border-primary/10 dark:border-white/10"
      >
        <div className="container mx-auto py-4 px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Address Section */}
            <div className="space-y-2">
              <h3 className="font-semibold text-lg mb-4">Address</h3>
              <p className="text-sm text-muted-foreground">
                Engineering and Architecture Division:<br />
                Room No:B5-203, Vindhya C6, VLEAD, IIIT-H,<br />
                Gachibowli, Hyderabad - 500032
              </p>
            </div>

            {/* Contact Section */}
            <div className="space-y-2">
              <h3 className="font-semibold text-lg mb-4">Contact</h3>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>General Information: 011-64674687</p>
                <p>Development/Outreach: +91-9177792945</p>
                <p>Email: support@vlabs.ac.in</p>
              </div>
            </div>

            {/* Social Media Section */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Follow Us</h3>
              <div className="flex gap-4">
                <a href="https://github.com/" 
                   className="text-muted-foreground hover:text-primary dark:hover:text-white transition-colors"
                   target="_blank" rel="noopener noreferrer">
                  <Youtube size={20} />
                </a>
                <a href="https://x.com/TheVirtualLabs" 
                   className="text-muted-foreground hover:text-white dark:hover:text-white transition-colors"
                   target="_blank" rel="noopener noreferrer">
                  <Twitter size={20} />
                </a>
                <a href="https://www.linkedin.com/" 
                   className="text-muted-foreground hover:text-white dark:hover:text-white transition-colors"
                   target="_blank" rel="noopener noreferrer">
                  <Linkedin size={20} />
                </a>
                <a href="mailto:support@vlabs.ac.in" 
                   className="text-muted-foreground hover:text-white dark:hover:text-white transition-colors">
                  <Mail size={20} />
                </a>
                <a href="https://www.facebook.com/vlead.iiithyd" 
                   className="text-muted-foreground hover:text-white dark:hover:text-white transition-colors"
                   target="_blank" rel="noopener noreferrer">
                  <Facebook size={20} />
                </a>
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 1 : 0 }}
            transition={{ delay: 0.4 }}
            className="text-center text-sm text-muted-foreground mt-8 pt-4 border-t border-primary/10 dark:border-white/10"
          >
            © 2025 Virtual Labs IIIT Hyderabad. All Rights Reserved.
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
}