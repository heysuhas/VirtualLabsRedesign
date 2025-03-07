import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, School, BookOpen, Award, Lightbulb, Code, Building, 
  GraduationCap, Network, Briefcase, FileCheck, UserCog 
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function VirtualLabsAbout() {
  const statsRef = useRef(null);
  const stakeholdersRef = useRef(null);
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.3 });
  const isStakeholdersInView = useInView(stakeholdersRef, { once: true, amount: 0.3 });

  const [activeTab, setActiveTab] = useState("overview");

  const stakeholders = [
    {
      title: "Students",
      description: "Access to quality lab experiences regardless of location or resources",
      icon: <Users className="h-10 w-10" />,
      color: "from-blue-500/30"
    },
    {
      title: "Educators",
      description: "Tools to enhance teaching with interactive simulations and assessments",
      icon: <School className="h-10 w-10" />,
      color: "from-green-500/30"
    },
    {
      title: "Institutions",
      description: "Cost-effective solutions to expand laboratory offerings",
      icon: <Building className="h-10 w-10" />,
      color: "from-purple-500/30"
    },
    {
      title: "Researchers",
      description: "Platforms to develop and test new educational methodologies",
      icon: <Lightbulb className="h-10 w-10" />,
      color: "from-yellow-500/30"
    },
    {
      title: "Subject Matter Experts",
      description: "Opportunity to contribute domain knowledge and validate experiment accuracy",
      icon: <GraduationCap className="h-10 w-10" />,
      color: "from-red-500/30"
    },
    {
      title: "Developers",
      description: "Creating innovative simulations and interactive learning experiences",
      icon: <Code className="h-10 w-10" />,
      color: "from-cyan-500/30"
    },
    {
      title: "Nodal Center Community",
      description: "Network of institutions facilitating Virtual Labs adoption and training",
      icon: <Network className="h-10 w-10" />,
      color: "from-orange-500/30"
    },
    {
      title: "Ministry of Education",
      description: "Supporting digital education initiatives across the country",
      icon: <Award className="h-10 w-10" />,
      color: "from-emerald-500/30"
    },
    {
      title: "Service Providers",
      description: "Technical support and infrastructure maintenance for seamless experience",
      icon: <UserCog className="h-10 w-10" />,
      color: "from-pink-500/30"
    },
    {
      title: "Interns",
      description: "Gaining hands-on experience while contributing to educational technology",
      icon: <BookOpen className="h-10 w-10" />,
      color: "from-indigo-500/30"
    },
    {
      title: "Accreditation Bodies",
      description: "Ensuring quality standards and educational outcomes are met",
      icon: <FileCheck className="h-10 w-10" />,
      color: "from-amber-500/30"
    }
  ];

  const stats = [
    { value: "190+", label: "Virtual Labs" },
    { value: "1600+", label: "Experiments" },
    { value: "11", label: "Partner Institutes" },
    { value: "17.2M", label: "Users" }
  ];

  const institutes = [
    {
      name: "IIT Delhi",
      role: "Coordinating Institute",
      image: "https://placehold.co/200x100/e2e8f0/1e293b?text=IIT+Delhi"
    },
    {
      name: "IIT Bombay",
      role: "Partner Institute",
      image: "https://placehold.co/200x100/e2e8f0/1e293b?text=IIT+Bombay"
    },
    {
      name: "IIT Kanpur",
      role: "Partner Institute",
      image: "https://placehold.co/200x100/e2e8f0/1e293b?text=IIT+Kanpur"
    },
    {
      name: "IIT Kharagpur",
      role: "Partner Institute",
      image: "https://placehold.co/200x100/e2e8f0/1e293b?text=IIT+Kharagpur"
    },
    {
      name: "IIT Madras",
      role: "Partner Institute",
      image: "https://placehold.co/200x100/e2e8f0/1e293b?text=IIT+Madras"
    },
    {
      name: "IIT Roorkee",
      role: "Partner Institute",
      image: "https://placehold.co/200x100/e2e8f0/1e293b?text=IIT+Roorkee"
    },
    {
      name: "IIT Guwahati",
      role: "Partner Institute",
      image: "https://placehold.co/200x100/e2e8f0/1e293b?text=IIT+Guwahati"
    },
    {
      name: "IIIT Hyderabad",
      role: "Partner Institute",
      image: "https://placehold.co/200x100/e2e8f0/1e293b?text=IIIT+Hyderabad"
    },
    {
      name: "Amrita Vishwa Vidyapeetham",
      role: "Partner Institute",
      image: "https://placehold.co/200x100/e2e8f0/1e293b?text=Amrita+University"
    },
    {
      name: "Dayalbagh Educational Institute",
      role: "Partner Institute",
      image: "https://placehold.co/200x100/e2e8f0/1e293b?text=DEI"
    },
    {
      name: "NIT Karnataka",
      role: "Partner Institute",
      image: "https://placehold.co/200x100/e2e8f0/1e293b?text=NITK"
    }
  ];

  const faqs = [
    {
      question: "What are Virtual Labs?",
      answer: "Virtual Labs are web-enabled experiments designed for remote operation. They provide students with the result of an experiment by one of the following methods: (a) Modeling the physical phenomenon by a set of equations and carrying out simulations to yield the result of the particular experiment; (b) Allowing the viewing of an actual experiment from a remote location."
    },
    {
      question: "How can I access Virtual Labs?",
      answer: "Virtual Labs can be accessed from any computer with a decent internet connection. Simply visit our website and navigate to the experiment you wish to perform. No special software installation is required."
    },
    {
      question: "Are Virtual Labs free to use?",
      answer: "Yes, Virtual Labs are completely free to use for students, educators, and institutions."
    },
    {
      question: "Can Virtual Labs replace physical laboratory experiences?",
      answer: "While Virtual Labs provide valuable learning experiences, they are designed to complement rather than replace physical laboratories. They are especially valuable when physical labs are inaccessible due to constraints of time, geography, or resources."
    },
    {
      question: "How can my institution become a nodal center?",
      answer: "Institutions interested in becoming nodal centers can apply through our website. The process involves signing an MoU and meeting certain infrastructure requirements to facilitate the use of Virtual Labs."
    },
    {
      question: "What disciplines are covered by Virtual Labs?",
      answer: "Virtual Labs cover a wide range of disciplines including Engineering (Electronics, Computer Science, Mechanical, etc.), Sciences (Physics, Chemistry, Biology), and more. New experiments are continuously being added to expand the coverage."
    },
    {
      question: "Can I contribute to Virtual Labs development?",
      answer: "Yes, Virtual Labs welcomes contributions from educators, developers, and subject matter experts. You can reach out to us through the contact form on our website to discuss potential collaborations."
    }
  ];

  return (
    <div className="min-h-screen w-full bg-background relative overflow-hidden">
      {/* Background pattern */}
      <motion.div className="absolute inset-0 -z-10">
        <svg className="absolute inset-0 w-[200%] h-[200%] opacity-30 dark:opacity-20">
          <defs>
            <pattern 
              id="circuit-about" 
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
            fill="url(#circuit-about)"
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
            Virtual Labs
          </h1>
          <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
            Transforming education through accessible, interactive laboratory experiences
          </p>
        </motion.div>

        {/* Tabs section */}
        <Tabs 
          defaultValue="overview" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full max-w-5xl mx-auto"
        >
          <TabsList className="grid grid-cols-5 w-full mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="goals">Goals and Philosophy</TabsTrigger>
            <TabsTrigger value="institutes">Participating Institutes</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-card/50 backdrop-blur-sm border border-primary/10 dark:border-white/10 rounded-xl p-8 shadow-lg"
            >
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-lg leading-relaxed">
                  Virtual Labs, an initiative of the Ministry of Education under NMEICT, offers free remote laboratory learning experiences. 
                  Workshops and nodal centers support institute partnerships within the Virtual Labs consortium. The project, led 
                  by IIT Delhi and involving eleven institutes, provides over 190 Virtual Labs and 1600+ web-enabled experiments 
                  across various domains using open-source technologies. These simulations are accessible online without any 
                  additional infrastructure or fees.
                </p>
              </div>
            </motion.div>

            {/* Stats section */}
            <motion.div 
              ref={statsRef}
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isStatsInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card/50 backdrop-blur-sm border border-primary/10 dark:border-white/10 rounded-xl p-6 text-center"
                >
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    className="text-3xl md:text-4xl font-bold text-primary dark:text-white"
                  >
                    {stat.value}
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={isStatsInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="text-sm text-muted-foreground mt-2"
                  >
                    {stat.label}
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>

            {/* Stakeholders section */}
            <div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-2xl font-bold text-center mb-8"
              >
                Stakeholders
              </motion.h2>
              
              <motion.div 
                ref={stakeholdersRef}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              >
                {stakeholders.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isStakeholdersInView ? { opacity: 1, y: 0 } : {}}
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

          <TabsContent value="goals">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-card/50 backdrop-blur-sm border border-primary/10 dark:border-white/10 rounded-xl p-8 shadow-lg"
            >
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <h2>Goals and Philosophy</h2>
                <p>
                  Virtual Labs aims to provide remote-access to Labs in various disciplines of Science and Engineering. 
                  These Virtual Labs would cater to students at the undergraduate level, post graduate level as well as 
                  to research scholars.
                </p>
                <h3>Our Mission</h3>
                <ul>
                  <li>To provide remote-access to Labs in various disciplines of Science and Engineering</li>
                  <li>To enrich the learning experience through experimentation</li>
                  <li>To create a complete Learning Management System around the Virtual Labs</li>
                  <li>To provide access to resources that are otherwise unavailable due to constraints on time and geography</li>
                </ul>
                <h3>Our Vision</h3>
                <p>
                  To develop a fully interactive simulation environment to create real world experiences and arouse curiosity 
                  in students to conduct experiments, thereby increasing the learning outcomes.
                </p>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="institutes">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="bg-card/50 backdrop-blur-sm border border-primary/10 dark:border-white/10 rounded-xl p-8 shadow-lg">
                <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
                  <h2>Participating Institutes</h2>
                  <p>
                    The Virtual Labs project is a multi-institute collaborative project. These premier institutions work together to create and maintain high-quality virtual laboratory experiences.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {institutes.map((institute, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-card border border-primary/10 dark:border-white/10 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
                    >
                      <div className="relative">
                        <img 
                          src={institute.image} 
                          alt={institute.name} 
                          className="w-full h-32 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                          <div className="p-4 text-white">
                            <h3 className="font-bold">{institute.name}</h3>
                            <p className="text-sm opacity-90">{institute.role}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="testimonials">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-card/50 backdrop-blur-sm border border-primary/10 dark:border-white/10 rounded-xl p-6 shadow-md"
                >
                  <p className="italic text-muted-foreground mb-4">
                    "Virtual Labs has transformed how we teach practical concepts. Students can now experiment without constraints of physical labs."
                  </p>
                  <div className="font-semibold">Dr. Rajesh Kumar</div>
                  <div className="text-sm text-muted-foreground">Professor, IIT Delhi</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-card/50 backdrop-blur-sm border border-primary/10 dark:border-white/10 rounded-xl p-6 shadow-md"
                >
                  <p className="italic text-muted-foreground mb-4">
                    "As a student from a rural college, Virtual Labs gave me access to advanced equipment I would never have experienced otherwise."
                  </p>
                  <div className="font-semibold">Priya Sharma</div>
                  <div className="text-sm text-muted-foreground">Engineering Student</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="bg-card/50 backdrop-blur-sm border border-primary/10 dark:border-white/10 rounded-xl p-6 shadow-md"
                >
                  <p className="italic text-muted-foreground mb-4">
                    "The interactive simulations have significantly improved student engagement and understanding of complex concepts."
                  </p>
                  <div className="font-semibold">Dr. Anita Desai</div>
                  <div className="text-sm text-muted-foreground">HOD, Computer Science, IIIT Hyderabad</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="bg-card/50 backdrop-blur-sm border border-primary/10 dark:border-white/10 rounded-xl p-6 shadow-md"
                >
                  <p className="italic text-muted-foreground mb-4">
                    "Virtual Labs has been instrumental in continuing education during the pandemic when physical labs were inaccessible."
                  </p>
                  <div className="font-semibold">Prof. Sunil Mehta</div>
                  <div className="text-sm text-muted-foreground">Principal, Engineering College</div>
                </motion.div>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="faq">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-card/50 backdrop-blur-sm border border-primary/10 dark:border-white/10 rounded-xl p-8 shadow-lg"
            >
              <div className="prose prose-lg dark:prose-invert max-w-none mb-6">
                <h2>Frequently Asked Questions</h2>
              </div>
              
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-lg font-medium">
                      {faq.question}
                    </AccordionTrigger>
                    <AnimatePresence>
                      <AccordionContent>
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-muted-foreground"
                        >
                          {faq.answer}
                        </motion.div>
                      </AccordionContent>
                    </AnimatePresence>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
