import { useState, useEffect } from "react";
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
import { User, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

export default function NavigationHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

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
        <div className="flex items-center space-x-8">
          <Link href="/">
            <a className="flex items-center space-x-2 transition-opacity hover:opacity-80">
              <SiVirtualbox className="h-8 w-8" />
              <span className="font-bold text-xl">Virtual Labs</span>
            </a>
          </Link>

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
                            <div className="text-sm font-medium leading-none">Faculty</div>
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

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground  header-users">
            <User className="h-4 w-4" />
            <span>Users: 17.2M</span>
            <Activity className="ml-2 h-4 w-4" />
            <span>Views: 124.0M</span>
          </div>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}