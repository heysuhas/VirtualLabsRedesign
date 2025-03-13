"use client"

import { useState, useRef, useEffect } from "react"
import { Link } from "wouter"
import { motion, useInView } from "framer-motion"
import {
  Youtube,
  Twitter,
  Linkedin,
  Mail,
  Facebook,
  Cpu,
  Cog,
  MonitorDot,
  TestTube2,
  Beaker,
  Building2,
  Atom,
  FlaskConical,
  Github,
} from "lucide-react"

// Replace the ThemeToggleWithGithub component with this updated version
// Replace the ThemeToggleWithGithub component with this updated version
const ThemeToggleWithGithub = () => {
  return null;
}

const engineeringFields = [
  { name: "Electronics", icon: <Cpu size={32} />, color: "bg-gradient-to-br from-amber-500/20 to-yellow-500/10" },
  { name: "Mechanics", icon: <Cog size={32} />, color: "bg-gradient-to-br from-blue-500/20 to-cyan-500/10" },
  {
    name: "Computer Science",
    icon: <MonitorDot size={32} />,
    color: "bg-gradient-to-br from-emerald-500/20 to-green-500/10",
  },
  { name: "Chemistry", icon: <TestTube2 size={32} />, color: "bg-gradient-to-br from-violet-500/20 to-purple-500/10" },
  { name: "BioTech", icon: <Beaker size={32} />, color: "bg-gradient-to-br from-pink-500/20 to-rose-500/10" },
  { name: "Physical Sciences", icon: <Atom size={32} />, color: "bg-gradient-to-br from-indigo-500/20 to-blue-500/10" },
  { name: "Civil", icon: <Building2 size={32} />, color: "bg-gradient-to-br from-orange-500/20 to-amber-500/10" },
  {
    name: "Chemical Science",
    icon: <FlaskConical size={32} />,
    color: "bg-gradient-to-br from-teal-500/20 to-green-500/10",
  },
]

const CardComponent = ({ field }: { field: any }) => {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark")
    setIsDark(isDarkMode)
  }, [])

  return (
    <motion.div
      className={`p-5 rounded-2xl ${field.color} backdrop-blur-md 
        border border-primary/20 dark:border-white/10
        flex flex-col items-center justify-center text-center w-[180px] h-[180px] cursor-pointer
        relative overflow-hidden`}
      whileHover={{
        scale: 1.05,
        y: -5,
        boxShadow: isDark ? "0 15px 30px -5px rgba(255,255,255,0.1)" : "0 15px 30px -5px rgba(0,0,0,0.15)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Icon container - no glow */}
      <div className="relative mb-4 p-3 rounded-full bg-primary/10 dark:bg-white/10 backdrop-blur-sm">
        <div className="text-primary dark:text-white/90 relative z-10">{field.icon}</div>
      </div>

      {/* Title - no animation */}
      <h3 className="font-semibold text-lg relative z-10">{field.name}</h3>
    </motion.div>
  )
}

const InfiniteCarousel = () => {
  const [isPaused, setIsPaused] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Create a larger set of cards for smoother infinite scrolling
  // Duplicate the fields multiple times to ensure smooth looping
  const items = [...engineeringFields, ...engineeringFields, ...engineeringFields]

  return (
    <div className="w-full overflow-hidden py-4 relative">
      {/* Left and right fade gradients */}
      <div className="absolute left-0 top-0 w-40 h-full bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 w-40 h-full bg-gradient-to-l from-background to-transparent z-10" />

      {/* Carousel track */}
      <div
        ref={carouselRef}
        className="flex gap-4 px-4"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className={`flex gap-4 ${isPaused ? "animate-pause" : "animate-scroll"}`}
          style={{
            animationPlayState: isPaused ? "paused" : "running",
          }}
        >
          {items.map((field, index) => (
            <motion.div
              key={`card-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: Math.min(index * 0.1, 1) }}
            >
              <CardComponent field={field} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Landing() {
  const footerRef = useRef(null)
  const isInView = useInView(footerRef, { once: true, amount: 0.1 })

  // Ensure page loads at the top
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen w-full flex flex-col bg-background relative overflow-hidden">
      {/* Add ThemeToggleWithGithub component here */}
      <ThemeToggleWithGithub />

      {/* Background pattern */}
      <motion.div className="absolute inset-0">
        <svg className="absolute inset-0 w-[200%] h-[200%] opacity-30 dark:opacity-20">
          <defs>
            <pattern id="circuit" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
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
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
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
              y: [-20, 0, -20],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        </svg>
      </motion.div>

      {/* Main content - shifted upward with negative top margin */}
      <div className="relative z-10 w-full h-screen flex flex-col items-center justify-center -mt-16">
        <div
          className="w-full max-w-[90vw] md:max-w-[85vw] lg:max-w-5xl mx-auto 
          flex flex-col items-center justify-center gap-3 md:gap-4"
        >
          {/* Title */}
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent 
              bg-gradient-to-r from-primary via-primary/80 to-primary/60 
              dark:from-white dark:to-white/60 leading-tight text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Virtual Labs - IIITH
          </motion.h1>

          {/* Subtitle - slightly smaller */}
          <motion.p
            className="text-lg text-muted-foreground max-w-2xl text-center mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Experience hands-on learning through interactive simulations and remote experiments
          </motion.p>

          {/* New Carousel - reduced vertical space */}
          <motion.div className="w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <InfiniteCarousel />
          </motion.div>

          {/* Button - moved closer to carousel */}
          <motion.div
            className="relative group mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <motion.div
              className="absolute -inset-1 rounded-lg bg-gradient-to-r 
                from-primary/50 via-primary/30 to-primary/50 
                dark:from-white/30 dark:via-white/10 dark:to-white/30 
                opacity-0 group-hover:opacity-100 
                blur-lg transition-all duration-500"
              variants={{
                hover: {
                  scale: 1.1,
                  rotate: -2,
                },
              }}
            />
            <Link href="/home">
              <motion.button
                className="relative bg-primary hover:bg-primary/90 text-white
                  dark:bg-white dark:text-background dark:hover:bg-white/90
                  px-6 py-2 rounded-lg font-semibold text-lg
                  dark:shadow-[0_4px_14px_0_rgba(255,255,255,0.39)]
                  transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
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
          y: isInView ? 0 : 50,
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
                Engineering and Architecture Division:
                <br />
                Room No:B5-203, Vindhya C6, VLEAD, IIIT-H,
                <br />
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
                <a
                  href="https://youtube.com/"
                  className="text-muted-foreground hover:text-primary dark:hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Youtube size={20} />
                </a>
                <a
                  href="https://x.com/TheVirtualLabs"
                  className="text-muted-foreground hover:text-white dark:hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/"
                  className="text-muted-foreground hover:text-white dark:hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="mailto:support@vlabs.ac.in"
                  className="text-muted-foreground hover:text-white dark:hover:text-white transition-colors"
                >
                  <Mail size={20} />
                </a>
                <a
                  href="https://www.facebook.com/vlead.iiithyd"
                  className="text-muted-foreground hover:text-white dark:hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
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
  )
}

