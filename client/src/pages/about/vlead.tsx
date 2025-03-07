import React, { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Cloud, 
  Server, 
  Monitor, 
  Cog, 
  BarChart, 
  Wrench, 
  Zap, 
  Search, 
  Smartphone, 
  Star, 
  Bug, 
  LineChart, 
  Code, 
  FileCode, 
  Database, 
  BookOpen, 
  FileSearch, 
  Rocket, 
  Users, 
  FileText,
  ExternalLink
} from "lucide-react";

interface Phase {
  title: string;
  period: string;
  description: string;
}

export default function VLEAD() {
  const [activeTab, setActiveTab] = useState("motivation");
  const [activeInitiativeTab, setActiveInitiativeTab] = useState("userTools");
  
  const timelineRef = useRef(null);
  const isTimelineInView = useInView(timelineRef, { once: false });
  
  const motivationItems = [
    {
      title: "Cloud Infrastructure",
      description: "Managing and optimizing cloud resources for Virtual Labs platform",
      icon: <Cloud className="h-10 w-10" />,
      color: "from-blue-500/30"
    },
    {
      title: "Systems Administration & Monitoring",
      description: "Ensuring system reliability and performance through proactive monitoring",
      icon: <Server className="h-10 w-10" />,
      color: "from-purple-500/30"
    },
    {
      title: "Common User Interface",
      description: "Developing consistent and accessible interfaces across all Virtual Labs",
      icon: <Monitor className="h-10 w-10" />,
      color: "from-green-500/30"
    },
    {
      title: "Process Control",
      description: "Implementing efficient workflows and development processes",
      icon: <Cog className="h-10 w-10" />,
      color: "from-amber-500/30"
    },
    {
      title: "Central Analytics",
      description: "Collecting and analyzing usage data to improve user experience",
      icon: <BarChart className="h-10 w-10" />,
      color: "from-red-500/30"
    },
    {
      title: "Build Automation",
      description: "Streamlining development with automated build and deployment pipelines",
      icon: <Wrench className="h-10 w-10" />,
      color: "from-indigo-500/30"
    },
    {
      title: "Performance Improvements",
      description: "Optimizing system performance for better user experience",
      icon: <Zap className="h-10 w-10" />,
      color: "from-cyan-500/30"
    },
    {
      title: "Technology Research",
      description: "Exploring new technologies to enhance Virtual Labs capabilities",
      icon: <Search className="h-10 w-10" />,
      color: "from-emerald-500/30"
    },
    {
      title: "Content Authoring Tools",
      description: "Developing tools to simplify content creation for lab developers",
      icon: <FileText className="h-10 w-10" />,
      color: "from-pink-500/30"
    }
  ];

  const userTools = [
    {
      title: "PWA App",
      description: "Progressive Web App providing offline access to Virtual Labs content",
      icon: <Smartphone className="h-10 w-10" />,
      color: "from-blue-500/30"
    },
    {
      title: "Rating Widget",
      description: "Tool for collecting user feedback and ratings for continuous improvement",
      icon: <Star className="h-10 w-10" />,
      color: "from-amber-500/30"
    },
    {
      title: "Bug Reporting Tool",
      description: "Streamlined interface for users to report issues and suggest improvements",
      icon: <Bug className="h-10 w-10" />,
      color: "from-red-500/30"
    },
    {
      title: "GA4 Analytics Dashboard",
      description: "Comprehensive analytics platform for monitoring user engagement",
      icon: <LineChart className="h-10 w-10" />,
      color: "from-green-500/30"
    }
  ];

  const devTools = [
    {
      title: "VS Code",
      description: "Customized development environment for Virtual Labs content creation",
      icon: <Code className="h-10 w-10" />,
      color: "from-blue-500/30"
    },
    {
      title: "VS Code Extension",
      description: "Extension providing specialized tools for Virtual Labs development",
      icon: <FileCode className="h-10 w-10" />,
      color: "from-indigo-500/30"
    },
    {
      title: "Content Development Platform",
      description: "Integrated platform for creating and managing lab content",
      icon: <Database className="h-10 w-10" />,
      color: "from-purple-500/30"
    },
    {
      title: "National Question Repository",
      description: "Centralized repository of assessment questions for Virtual Labs",
      icon: <BookOpen className="h-10 w-10" />,
      color: "from-emerald-500/30"
    }
  ];

  const vleadTools = [
    {
      title: "Document Search Tool",
      description: "Advanced search functionality for Virtual Labs documentation",
      icon: <FileSearch className="h-10 w-10" />,
      color: "from-amber-500/30"
    },
    {
      title: "Automated Lab Deployment Tool",
      description: "Streamlining the deployment process for new Virtual Labs",
      icon: <Rocket className="h-10 w-10" />,
      color: "from-red-500/30"
    },
    {
      title: "Outreach Workshop Tracker",
      description: "Tool for managing and tracking Virtual Labs workshops and events",
      icon: <Users className="h-10 w-10" />,
      color: "from-green-500/30"
    },
    {
      title: "Static Site Generator",
      description: "Custom generator for creating optimized Virtual Labs websites",
      icon: <FileText className="h-10 w-10" />,
      color: "from-blue-500/30"
    }
  ];

  const timelinePhases = [
    {
      title: "Phase 1",
      period: "2009-2013",
      description: "Initial development and launch of the Virtual Labs platform, establishing the foundation for remote laboratory experiences in engineering education."
    },
    {
      title: "Phase 2",
      period: "2014-2017",
      description: "Expansion of Virtual Labs to cover more disciplines and institutions, with improved infrastructure and user experience."
    },
    {
      title: "Phase 3",
      period: "2018-2020",
      description: "Technological advancement and standardization of the platform, with focus on scalability and accessibility."
    },
    {
      title: "Extended Phase 3",
      period: "2021-2026",
      description: "Current phase focusing on innovation, outreach, and integration with national education initiatives, while enhancing the platform with modern technologies."
    }
  ];

  const currentTeam = [
    {
      name: "Venkatesh",
      role: "Associate Professor, PIC, Virtual Labs",
      image: "https://placehold.co/200x200/e2e8f0/1e293b?text=VT",
      profile: "#"
    },
    {
      name: "Raj Agnihotri",
      role: "Technology Head",
      image: "https://placehold.co/200x200/e2e8f0/1e293b?text=RA",
      profile: "#"
    },
    {
      name: "Priya",
      role: "Program Manager",
      image: "https://placehold.co/200x200/e2e8f0/1e293b?text=PR",
      profile: "#"
    },
    {
      name: "Ravi Shankar",
      role: "Outreach Manager",
      image: "https://placehold.co/200x200/e2e8f0/1e293b?text=RS",
      profile: "#"
    },
    {
      name: "Mrudhvika",
      role: "Mid Level Project Engineer",
      image: "https://placehold.co/200x200/e2e8f0/1e293b?text=MR",
      profile: "#"
    },
    {
      name: "Ravikiran",
      role: "Tester",
      image: "https://placehold.co/200x200/e2e8f0/1e293b?text=RK",
      profile: "#"
    },
    {
        name: "Vikram",
        role: "Consultant",
        image: "https://placehold.co/200x200/e2e8f0/1e293b?text=VK",
        profile: "#"
    },
    {
        name: "Shraddha More",
        role: "Consultant",
        image: "https://placehold.co/200x200/e2e8f0/1e293b?text=SM",
        profile: "#"
    },
    {
        name: "Chirag Goyal",
        role: "Research Assistant",
        image: "https://placehold.co/200x200/e2e8f0/1e293b?text=CG",
        profile: "#"
    },
    
  ];

  const pastTeam = [
    {
      name: "Pavan",
      role: "Mid Level Project Engineer",
      image: "https://placehold.co/200x200/e2e8f0/1e293b?text=PA",
      profile: "#"
    },
    {
      name: "Shambhavi",
      role: "Summer Intern",
      image: "https://placehold.co/200x200/e2e8f0/1e293b?text=SM",
      profile: "#"
    },
    {
      name: "Yatharth Gupta",
      role: "Summer Intern",
      image: "https://placehold.co/200x200/e2e8f0/1e293b?text=YG",
      profile: "#"
    },
    {
      name: "Ananya Vaibhavi",
      role: "Summer Intern",
      image: "https://placehold.co/200x200/e2e8f0/1e293b?text=AV",
      profile: "#"
    },
    {
      name: "Chirag Jain",
      role: "Summer Intern",
      image: "https://placehold.co/200x200/e2e8f0/1e293b?text=CJ",
      profile: "#"
    },
    {
      name: "Vyom Goyal",
      role: "Summer Intern",
      image: "https://placehold.co/200x200/e2e8f0/1e293b?text=VG",
      profile: "#"
    },
    {
        name: "Harsh Bansal",
        role: "Summer Intern",
        image: "https://placehold.co/200x200/e2e8f0/1e293b?text=HB",
        profile: "#"
    },
    {
        name: "Shreyash Jain",
        role: "BTP Student",
        image: "https://placehold.co/200x200/e2e8f0/1e293b?text=SJ",
        profile: "#"
    },
    {
        name: "Aditya",
        role: "BTP Student",
        image: "https://placehold.co/200x200/e2e8f0/1e293b?text=AD",
        profile: "#"
    },
    {
        name: "Gautam",
        role: "BTP Student",
        image: "https://placehold.co/200x200/e2e8f0/1e293b?text=VG",
        profile: "#"
    },
    {
        name: "Mayank",
        role: "BTP Student",
        image: "https://placehold.co/200x200/e2e8f0/1e293b?text=MK",
        profile: "#"
    },
    {
        name: "Pranav",
        role: "Research Assistant",
        image: "https://placehold.co/200x200/e2e8f0/1e293b?text=PR",
        profile: "#"
    }

  ];

  const testimonials = [
    {
      quote: "The VLEAD team has been instrumental in transforming our educational approach. Their technical expertise and dedication have made Virtual Labs an essential part of our engineering curriculum.",
      name: "Dr. Rajesh Kumar",
      role: "Professor",
      organization: "IIT Delhi",
      image: "https://placehold.co/80x80/e2e8f0/1e293b?text=RK"
    },
    {
      quote: "Working with the VLEAD team has been a remarkable experience. Their innovative solutions and commitment to educational technology have significantly enhanced the learning experience for our students.",
      name: "Dr. Anita Desai",
      role: "Head of Department",
      organization: "NIT Surathkal",
      image: "https://placehold.co/80x80/e2e8f0/1e293b?text=AD"
    },
    {
      quote: "The technical infrastructure developed by VLEAD has enabled us to reach students in remote areas who previously had no access to laboratory facilities. Their work is truly transformative for engineering education in India.",
      name: "Prof. Sunil Mehta",
      role: "Director",
      organization: "College of Engineering, Pune",
      image: "https://placehold.co/80x80/e2e8f0/1e293b?text=SM"
    }
  ];

  return (
    <div className="min-h-screen w-full bg-background relative overflow-hidden">
      {/* Background pattern */}
      <motion.div className="absolute inset-0 -z-10">
        <svg className="absolute inset-0 w-[200%] h-[200%] opacity-30 dark:opacity-20">
          <defs>
            <pattern 
              id="circuit-vlead" 
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
            fill="url(#circuit-vlead)"
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

      {/* Hero section */}
      <div className="container mx-auto px-4 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent 
            bg-gradient-to-r from-primary via-primary/80 to-primary/60 
            dark:from-white dark:to-white/60 leading-tight">
            VLEAD
          </h1>
          <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
            Building the technological foundation for accessible, interactive laboratory experiences
          </p>
        </motion.div>

        {/* Tabs section */}
        <Tabs 
          defaultValue="motivation" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full max-w-5xl mx-auto"
        >
          <TabsList className="grid grid-cols-2 md:grid-cols-6 w-full mb-8">
            <TabsTrigger value="motivation">Motivation</TabsTrigger>
            <TabsTrigger value="initiatives">Initiatives</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="currentTeam">Current Team</TabsTrigger>
            <TabsTrigger value="pastTeam">Past Team</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
          </TabsList>

          <TabsContent value="motivation" className="space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-card/50 backdrop-blur-sm border border-primary/10 dark:border-white/10 rounded-xl p-8 shadow-lg"
            >
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <h2 className="text-2xl font-bold mb-4">Our Purpose</h2>
                <p className="text-lg leading-relaxed">
                  The Virtual Labs Engineering, Architecture, and Design (VLEAD) Team at IIIT Hyderabad is a dedicated team 
                  responsible for overseeing the central platform engineering operations, engineering, and development 
                  coordination. The team's key responsibilities include cloud infrastructure management, systems administration, 
                  user interface development, and continuous technological innovation to support the Virtual Labs ecosystem.
                </p>
              </div>
            </motion.div>

            {/* Motivation grid */}
            <div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-2xl font-bold text-center mb-8"
              >
                Key Responsibilities
              </motion.h2>
              
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {motivationItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className={`p-6 rounded-xl bg-black/5 dark:bg-white/10 backdrop-blur-sm 
                      border border-primary/10 dark:border-white/10
                      flex flex-col items-center text-center
                      bg-gradient-to-b ${item.color} to-transparent
                      hover:scale-105 transition-transform duration-300`}
                  >
                    <div className="mb-4 text-primary dark:text-white/90">
                      {item.icon}
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="initiatives" className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-card/50 backdrop-blur-sm border border-primary/10 dark:border-white/10 rounded-xl p-8 shadow-lg"
            >
              <div className="prose prose-lg dark:prose-invert max-w-none mb-6">
                <h2 className="text-2xl font-bold mb-4">Our Initiatives</h2>
                <p className="text-lg leading-relaxed">
                  VLEAD develops and maintains a suite of tools designed to enhance the Virtual Labs experience for users, 
                  developers, and administrators. These tools streamline processes, improve accessibility, and ensure 
                  the platform's continued growth and success.
                </p>
              </div>
              
              {/* Nested tabs for initiatives */}
              <Tabs 
                defaultValue="userTools" 
                value={activeInitiativeTab}
                onValueChange={setActiveInitiativeTab}
                className="w-full"
              >
                <TabsList className="grid grid-cols-3 w-full mb-6">
                  <TabsTrigger value="userTools">User Tools</TabsTrigger>
                  <TabsTrigger value="devTools">Dev Tools</TabsTrigger>
                  <TabsTrigger value="vleadTools">VLEAD Tools</TabsTrigger>
                </TabsList>

                <TabsContent value="userTools">
                  <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {userTools.map((tool, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={`p-6 rounded-xl bg-black/5 dark:bg-white/10 backdrop-blur-sm 
                          border border-primary/10 dark:border-white/10
                          flex flex-col items-center text-center
                          bg-gradient-to-b ${tool.color} to-transparent
                          hover:scale-105 transition-transform duration-300`}
                      >
                        <div className="mb-4 text-primary dark:text-white/90">
                          {tool.icon}
                        </div>
                        <h3 className="font-semibold text-lg mb-2">{tool.title}</h3>
                        <p className="text-sm text-muted-foreground">{tool.description}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                </TabsContent>

                <TabsContent value="devTools">
                  <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {devTools.map((tool, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={`p-6 rounded-xl bg-black/5 dark:bg-white/10 backdrop-blur-sm 
                          border border-primary/10 dark:border-white/10
                          flex flex-col items-center text-center
                          bg-gradient-to-b ${tool.color} to-transparent
                          hover:scale-105 transition-transform duration-300`}
                      >
                        <div className="mb-4 text-primary dark:text-white/90">
                          {tool.icon}
                        </div>
                        <h3 className="font-semibold text-lg mb-2">{tool.title}</h3>
                        <p className="text-sm text-muted-foreground">{tool.description}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                </TabsContent>

                <TabsContent value="vleadTools">
                  <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {vleadTools.map((tool, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={`p-6 rounded-xl bg-black/5 dark:bg-white/10 backdrop-blur-sm 
                          border border-primary/10 dark:border-white/10
                          flex flex-col items-center text-center
                          bg-gradient-to-b ${tool.color} to-transparent
                          hover:scale-105 transition-transform duration-300`}
                      >
                        <div className="mb-4 text-primary dark:text-white/90">
                          {tool.icon}
                        </div>
                        <h3 className="font-semibold text-lg mb-2">{tool.title}</h3>
                        <p className="text-sm text-muted-foreground">{tool.description}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                </TabsContent>
              </Tabs>
            </motion.div>
          </TabsContent>

          <TabsContent value="timeline">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-card/50 backdrop-blur-sm border border-primary/10 dark:border-white/10 rounded-xl p-8 shadow-lg"
            >
              <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
                <h2 className="text-2xl font-bold mb-4">Project Timeline</h2>
                <p className="text-lg leading-relaxed">
                  The Virtual Labs project has evolved through several phases, each building upon the achievements of the previous 
                  phase while addressing new challenges and opportunities in educational technology.
                </p>
              </div>
              
              <ScrollTimeline phases={timelinePhases} />
            </motion.div>
          </TabsContent>

          <TabsContent value="currentTeam">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-card/50 backdrop-blur-sm border border-primary/10 dark:border-white/10 rounded-xl p-8 shadow-lg"
            >
              <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
                <h2 className="text-2xl font-bold mb-4">Current Team</h2>
                <p className="text-lg leading-relaxed">
                  Meet the dedicated professionals currently working on the Virtual Labs Engineering Architecture and Design.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {currentTeam.map((member, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-card border border-primary/10 dark:border-white/10 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="relative aspect-square">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                        <div className="p-4 text-white">
                          <h3 className="font-bold text-lg">{member.name}</h3>
                          <p className="text-sm opacity-90">{member.role}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 flex justify-center">
                      <Button variant="outline" size="sm" asChild>
                        <a href={member.profile} target="_blank" rel="noopener noreferrer">
                          Profile <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="pastTeam">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-card/50 backdrop-blur-sm border border-primary/10 dark:border-white/10 rounded-xl p-8 shadow-lg"
            >
              <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
                <h2 className="text-2xl font-bold mb-4">Past Team Members</h2>
                <p className="text-lg leading-relaxed">
                  We acknowledge the valuable contributions of these former team members who helped shape the Virtual Labs platform.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {pastTeam.map((member, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-card border border-primary/10 dark:border-white/10 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="relative aspect-square">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                        <div className="p-4 text-white">
                          <h3 className="font-bold text-lg">{member.name}</h3>
                          <p className="text-sm opacity-90">{member.role}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 flex justify-center">
                      <Button variant="outline" size="sm" asChild>
                        <a href={member.profile} target="_blank" rel="noopener noreferrer">
                          Profile <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="testimonials">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-card/50 backdrop-blur-sm border border-primary/10 dark:border-white/10 rounded-xl p-8 shadow-lg"
            >
              <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
                <h2 className="text-2xl font-bold mb-4">Testimonials</h2>
                <p className="text-lg leading-relaxed">
                  Hear what our partners and stakeholders have to say about the VLEAD team's contributions to the Virtual Labs ecosystem.
                </p>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-card border border-primary/10 dark:border-white/10 rounded-xl p-6 shadow-md"
                  >
                    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                      <div className="flex-shrink-0">
                        <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-primary/20 dark:border-white/20">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name}
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div className="flex-grow">
                        <div className="text-lg italic text-muted-foreground mb-4">
                          "{testimonial.quote}"
                        </div>
                        <div className="flex items-center">
                          <div>
                            <div className="font-semibold">{testimonial.name}</div>
                            <div className="text-sm text-muted-foreground">{testimonial.role}, {testimonial.organization}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function ScrollTimeline({ phases }: { phases: Phase[] }) {
  const [currentPhase, setCurrentPhase] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  // Track scroll position to determine which phase to show
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const scrollPercentage = scrollTop / (scrollHeight - clientHeight);
      const phaseIndex = Math.min(
        phases.length - 1,
        Math.floor(scrollPercentage * phases.length)
      );
      setCurrentPhase(phaseIndex);
    };
    
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [phases.length]);
  
  return (
    <div 
      ref={containerRef}
      className="relative h-[600px] overflow-y-auto overflow-x-hidden"
      style={{ scrollSnapType: 'y mandatory' }}
    >
      {/* Progress indicator on the side */}
      <div className="fixed left-8 top-1/2 transform -translate-y-1/2 flex flex-col gap-4 z-20">
        {phases.map((_, index) => (
          <div 
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer
                      ${index === currentPhase 
                        ? 'bg-primary dark:bg-white scale-150' 
                        : index < currentPhase 
                          ? 'bg-primary/80 dark:bg-white/80' 
                          : 'bg-primary/30 dark:bg-white/30'}`}
            onClick={() => {
              const container = containerRef.current;
              if (container) {
                const { scrollHeight, clientHeight } = container;
                const scrollableHeight = scrollHeight - clientHeight;
                const targetScroll = (index / phases.length) * scrollableHeight;
                container.scrollTo({ top: targetScroll, behavior: 'smooth' });
              }
            }}
          />
        ))}
      </div>
      
      {/* Phase sections */}
      {phases.map((phase, index) => (
        <div 
          key={index}
          className="h-full w-full flex items-center justify-center p-8"
          style={{ scrollSnapAlign: 'start' }}
        >
          <motion.div
            className="bg-card/70 backdrop-blur-sm border border-primary/10 dark:border-white/10 
                      rounded-xl p-8 shadow-lg max-w-2xl w-full"
            initial={{ opacity: 0, y: 100 }}
            animate={{ 
              opacity: index === currentPhase ? 1 : 0,
              y: index === currentPhase ? 0 : 100
            }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-primary dark:bg-white text-white dark:text-black w-12 h-12 rounded-full 
                            flex items-center justify-center text-xl font-bold">
                {index + 1}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-primary dark:text-white">
                  {phase.title}
                </h3>
                <p className="text-lg font-semibold text-muted-foreground">
                  {phase.period}
                </p>
              </div>
            </div>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {phase.description}
            </p>
          </motion.div>
        </div>
      ))}
    </div>
  );
}