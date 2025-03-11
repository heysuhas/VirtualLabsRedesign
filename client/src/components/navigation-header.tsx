import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "wouter";
import ThemeToggle from "./theme-toggle";
import { SiVirtualbox } from "react-icons/si";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { User, Activity, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NavigationHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-200",
      isScrolled
        ? "bg-background/70 backdrop-blur-lg border-b shadow-sm"
        : "bg-transparent"
    )}>
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left side with logo and desktop nav */}
        <div className="flex items-center space-x-8">
          <Link href="/">
            <a className="flex items-center space-x-2 transition-opacity hover:opacity-80">
              <SiVirtualbox className="h-8 w-8" />
              <span className="font-bold text-xl">Virtual Labs</span>
            </a>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>About</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[400px] p-4 md:w-[500px] lg:w-[600px]">
                      <div className="grid gap-3 p-4">
                        <div className="grid grid-cols-2 gap-4">
                          <Link href="/about/virtual-labs">
                            <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                              <div className="text-sm font-medium leading-none">Virtual Labs</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Learn about Virtual Labs initiative
                              </p>
                            </a>
                          </Link>
                          <Link href="/about/vlead">
                            <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                              <div className="text-sm font-medium leading-none">VLEAD</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              The Virtual Labs Engineering, Architecture, and Design (VLEAD) 
                              </p>
                            </a>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>I am</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[400px] p-4 md:w-[500px] lg:w-[600px]">
                      <div className="grid gap-3 p-4">
                        <div className="grid grid-cols-3 gap-4">
                          <Link href="/home">
                            <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                              <div className="text-sm font-medium leading-none">Learner</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Access experiments and learning materials
                              </p>
                            </a>
                          </Link>
                          <Link href="/outreach">
                            <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                              <div className="text-sm font-medium leading-none">Facilitator</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Resources for educators
                              </p>
                            </a>
                          </Link>
                          <Link href="/development">
                            <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                              <div className="text-sm font-medium leading-none">Creator</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Development tools and guidelines
                              </p>
                            </a>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>I want to</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[400px] p-4 md:w-[500px] lg:w-[600px]">
                      <div className="grid gap-3 p-4">
                        <div className="grid grid-cols-2 gap-4">
                          <Link href="/experiments">
                            <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                              <div className="text-sm font-medium leading-none">Create Experiment</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Host a New Experiment
                              </p>
                            </a>
                          </Link>
                          <Link href="/home">
                            <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                              <div className="text-sm font-medium leading-none">Start Learning</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Access Virtual Labs Experiments
                              </p>
                            </a>
                          </Link>
                          <Link href="/workshop">
                            <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                              <div className="text-sm font-medium leading-none">Host Workshop</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Help to host a Workshop 
                              </p>
                            </a>
                          </Link>
                          <Link href="/research">
                            <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                              <div className="text-sm font-medium leading-none">Explore Research</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Help improve Virtual Labs
                              </p>
                            </a>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Analytics</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[400px] p-4 md:w-[500px] lg:w-[600px]">
                      <div className="grid gap-3 p-4">
                        <div className="grid grid-cols-2 gap-4">
                          <Link href="/analytics/usage">
                            <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                              <div className="text-sm font-medium leading-none">Summary</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                View analytics summary
                              </p>
                            </a>
                          </Link>
                          <Link href="/analytics/feedback">
                            <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                              <div className="text-sm font-medium leading-none">Detailed Analysis</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Analysis of the Usage
                              </p>
                            </a>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        {/* Right side with stats, theme toggle and mobile menu */}
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-2 text-sm text-muted-foreground header-users">
            <User className="h-4 w-4" />
            <span>Users: 17.2M</span>
            <Activity className="ml-2 h-4 w-4" />
            <span>Views: 124.0M</span>
          </div>
          <ThemeToggle />

          {/* Mobile Navigation - moved here */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="ml-2">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] p-0">
                <div className="space-y-4 py-4">
                  <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-lg font-semibold">Menu</h2>
                    <div className="space-y-1">
                      <MobileNav onNavigate={() => setIsOpen(false)} />
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

// Add this component for mobile navigation
function MobileNav({ onNavigate }: { onNavigate: () => void }) {
  const [openSection, setOpenSection] = useState<string | null>(null);

  return (
    <div className="space-y-2">
      {['About', 'I am', 'I want to', 'Analytics'].map((section) => (
        <div key={section} className="space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => setOpenSection(openSection === section ? null : section)}
          >
            <span>{section}</span>
            <motion.div
              animate={{ rotate: openSection === section ? 180 : 0 }}
              className="ml-auto"
            >
              <ChevronDown className="h-4 w-4" />
            </motion.div>
          </Button>
          <AnimatePresence>
            {openSection === section && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="space-y-2 px-4"
              >
                {/* Add corresponding links based on section */}
                {getLinksForSection(section, onNavigate)}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

// Helper function to get links based on section
function getLinksForSection(section: string, onNavigate: () => void) {
  const links: { [key: string]: { href: string; label: string; description?: string }[] } = {
    'About': [
      { href: "/about/virtual-labs", label: "Virtual Labs", description: "Learn about Virtual Labs initiative" },
      { href: "/about/vlead", label: "VLEAD", description: "The Virtual Labs Engineering, Architecture, and Design" }
    ],
    'I am': [
      { href: "/home", label: "Learner", description: "Access experiments and learning materials" },
      { href: "/outreach", label: "Facilitator", description: "Resources for educators" },
      { href: "/development", label: "Creator", description: "Development tools and guidelines" }
    ],
    'I want to': [
      { href: "/experiments", label: "Create Experiment", description: "Host a New Experiment" },
      { href: "/home", label: "Start Learning", description: "Access Virtual Labs Experiments" },
      { href: "/workshop", label: "Host Workshop", description: "Help to host a Workshop" },
      { href: "/research", label: "Explore Research", description: "Help improve Virtual Labs" }
    ],
    'Analytics': [
      { href: "/analytics/usage", label: "Summary", description: "View analytics summary" },
      { href: "/analytics/feedback", label: "Detailed Analysis", description: "Analysis of the Usage" }
    ]
  };

  return links[section]?.map(link => (
    <Link key={link.href} href={link.href}>
      <a 
        className="block px-2 py-1.5 text-sm rounded-md transition-colors hover:bg-accent"
        onClick={() => onNavigate()}
      >
        <div className="font-medium">{link.label}</div>
        {link.description && (
          <p className="text-xs text-muted-foreground mt-0.5">
            {link.description}
          </p>
        )}
      </a>
    </Link>
  ));
}