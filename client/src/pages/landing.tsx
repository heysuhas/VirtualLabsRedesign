import { useState, useRef, useEffect } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { motion, useAnimation } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail, Facebook, Cpu, Cog, MonitorDot, TestTube2 } from 'lucide-react';

const engineeringFields = [
  { name: 'Electronics', icon: <Cpu size={32} />, color: 'from-yellow-500/30' },
  { name: 'Mechanics', icon: <Cog size={32} />, color: 'from-blue-500/30' },
  { name: 'Computer Science', icon: <MonitorDot size={32} />, color: 'from-green-500/30' },
  { name: 'Chemistry', icon: <TestTube2 size={32} />, color: 'from-purple-500/30' }
];

export default function Landing() {
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeNode, setActiveNode] = useState<number | null>(null);

  const createNode = (index: number) => ({
    x: Math.sin(index * 0.5) * 150,
    y: Math.cos(index * 0.5) * 150,
    delay: index * 0.1
  });

  return (
    <div className="h-screen w-full flex flex-col bg-background relative overflow-hidden">
      {/* Animated Circuit Pattern Background */}
      <motion.div 
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <svg className="absolute inset-0 w-[200%] h-[200%] opacity-10 dark:opacity-20">
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
                className="opacity-50"
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

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center space-y-12 py-8">
        {/* Title with adjusted line height and padding */}
        <motion.h1 
          className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r 
            from-primary via-primary/80 to-primary/60 dark:from-white dark:to-white/60
            leading-normal py-3" // Added leading-normal and py-2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Virtual Engineering Labs
        </motion.h1>

        {/* Cards Grid with adjusted space */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto px-8">
          {engineeringFields.map((field, i) => (
            <motion.div
              key={i}
              className={`p-8 rounded-xl bg-black/5 dark:bg-white/10 backdrop-blur-sm 
                hover:bg-black/10 dark:hover:bg-white/20 
                border border-primary/10 dark:border-white/10 cursor-pointer
                flex flex-col items-center text-center
                ${field.color} to-transparent`}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="mb-4 text-primary dark:text-white/90">{field.icon}</div>
              <h3 className="font-semibold text-lg">{field.name}</h3>
            </motion.div>
          ))}
        </div>

        {/* Button with reduced margin */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-2"
        >
          <Link href="/home">
            <Button 
              size="lg"
              className="bg-primary/80 dark:bg-white/90 dark:text-background 
                hover:bg-primary/90 dark:hover:bg-white transition-colors"
            >
              Start Learning
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Footer with reduced padding */}
      <footer className="w-full bg-background/80 backdrop-blur-sm border-t border-primary/10 dark:border-white/10">
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
                   className="text-muted-foreground hover:text-primary transition-colors"
                   target="_blank" rel="noopener noreferrer">
                  <Github size={20} />
                </a>
                <a href="https://twitter.com/" 
                   className="text-muted-foreground hover:text-primary transition-colors"
                   target="_blank" rel="noopener noreferrer">
                  <Twitter size={20} />
                </a>
                <a href="https://www.linkedin.com/" 
                   className="text-muted-foreground hover:text-primary transition-colors"
                   target="_blank" rel="noopener noreferrer">
                  <Linkedin size={20} />
                </a>
                <a href="mailto:support@vlabs.ac.in" 
                   className="text-muted-foreground hover:text-primary transition-colors">
                  <Mail size={20} />
                </a>
                <a href="https://www.facebook.com/" 
                   className="text-muted-foreground hover:text-primary transition-colors"
                   target="_blank" rel="noopener noreferrer">
                  <Facebook size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center text-sm text-muted-foreground mt-8 pt-4 border-t border-primary/10 dark:border-white/10">
            © 2024 Virtual Labs IIT Hyderabad. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}