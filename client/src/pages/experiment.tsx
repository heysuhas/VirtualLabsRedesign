import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Star, Copy, BookOpen, Eye, Rewind, FileQuestion, Beaker, BarChart2, FileCheck, MessageSquare, ChevronRight, BarChart } from "lucide-react";
import { queryClient } from "@/lib/queryClient";
import { apiRequest } from "@/lib/queryClient";
import ExperimentWorkspace from "@/components/experiment-workspaces";
import CustomVideoPlayer from "@/components/custom-video-player";
import PrePostTest from "@/components/pre-post-test";
import type { Experiment, Preferences } from "@shared/schema";
import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function ExperimentPage() {
  const { id } = useParams();
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [activeTab, setActiveTab] = useState("aim");
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  const { data: experiment, isLoading: experimentLoading } = useQuery<Experiment>({
    queryKey: [`/api/experiments/${id}`],
  });

  const { data: preferences } = useQuery<Preferences>({
    queryKey: ["/api/preferences"],
  });

  // Check scroll position to show/hide arrows
  useEffect(() => {
    const checkScroll = () => {
      if (!tabsContainerRef.current) return;
      
      const { scrollLeft, scrollWidth, clientWidth } = tabsContainerRef.current;
      
      // Show left arrow if not at the beginning
      setShowLeftArrow(scrollLeft > 10);
      
      // Show right arrow if not at the end
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    };
    
    const container = tabsContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      // Initial check
      checkScroll();
      
      // Check on window resize too
      window.addEventListener('resize', checkScroll);
      
      return () => {
        container.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, []);

  const starMutation = useMutation({
    mutationFn: async () => {
      const currentStarred = preferences?.starredExperiments || [];
      const expId = parseInt(id!);
      const newStarred = currentStarred.includes(expId)
        ? currentStarred.filter(id => id !== expId)
        : [...currentStarred, expId];

      await apiRequest("POST", "/api/preferences", {
        starredExperiments: newStarred
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/preferences"] });
    },
  });

  const isStarred = preferences?.starredExperiments?.includes(parseInt(id!));

  if (experimentLoading) {
    return <Skeleton className="h-[600px] rounded-lg" />;
  }

  if (!experiment) {
    return <div>Experiment not found</div>;
  }

  const handleFeedback = () => {
    window.location.href = `mailto:hey.suhas@outlook.in?subject=Feedback for ${experiment.title}&body=`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const scrollTabs = (direction: 'left' | 'right') => {
    if (!tabsContainerRef.current) return;
    
    const scrollAmount = 200; // Adjust this value as needed
    const currentScroll = tabsContainerRef.current.scrollLeft;
    const newScroll = direction === 'left' 
      ? currentScroll - scrollAmount 
      : currentScroll + scrollAmount;
    
    tabsContainerRef.current.scrollTo({
      left: newScroll,
      behavior: 'smooth'
    });
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  // Tab items for both mobile and desktop
  const tabItems = [
    { value: "aim", label: "Aim", icon: <BookOpen className="h-4 w-4" /> },
    { value: "overview", label: "Overview", icon: <Eye className="h-4 w-4" /> },
    { value: "recap", label: "Recap", icon: <Rewind className="h-4 w-4" /> },
    { value: "pretest", label: "Pre Test", icon: <FileQuestion className="h-4 w-4" /> },
    { value: "experiment", label: "Experiment", icon: <Beaker className="h-4 w-4" /> },
    { value: "complexity", label: "Complexity", icon: <BarChart2 className="h-4 w-4" /> },
    { value: "posttest", label: "Post Test", icon: <FileCheck className="h-4 w-4" /> },
    { value: "feedback", label: "Feedback", icon: <MessageSquare className="h-4 w-4" /> }
  ];

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 bg-gradient-to-r from-primary/5 to-primary/10 p-4 rounded-xl">
          <div className="w-full">
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center gap-2">
                <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 dark:from-white dark:to-primary-foreground flex items-center">
                  {experiment.title}
                </h1>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => starMutation.mutate()}
                  className={cn(
                    "rounded-full transition-all duration-300 hover:scale-110 h-10 w-10 flex items-center justify-center self-center",
                    isStarred ? "text-yellow-500" : "text-muted-foreground hover:text-yellow-500"
                  )}
                  style={{ marginTop: "4px" }}
                >
                  <Star className="h-5 w-5" fill={isStarred ? "currentColor" : "none"} />
                </Button>
              </div>
              <p className="text-muted-foreground max-w-2xl mt-1">{experiment.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Tabs (Top Navigation) */}
      <div className="md:hidden">
        <Tabs defaultValue="aim" className="space-y-6" onValueChange={handleTabChange}>
          <div className="relative w-full bg-muted/30 rounded-lg p-1">
            {/* Mobile: Left fade and indicator */}
            <div className={`absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-10 flex items-center transition-opacity duration-200 ${showLeftArrow ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
              <button 
                onClick={() => scrollTabs('left')}
                className="bg-background rounded-full p-1.5 ml-1 shadow-sm hover:bg-primary/10 hover:scale-110 active:scale-95 transition-all"
                aria-label="Scroll tabs left"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground/70">
                  <path d="m15 18-6-6 6-6"/>
                </svg>
              </button>
            </div>
            
            {/* Scrollable tabs container */}
            <div ref={tabsContainerRef} className="overflow-auto py-1 no-scrollbar">
              <TabsList className="flex w-max min-w-full space-x-1 px-8 bg-transparent">
                {tabItems.map((tab) => (
                  <TabsTrigger 
                    key={tab.value}
                    value={tab.value} 
                    className="whitespace-nowrap flex items-center gap-1.5 px-3 py-2 data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:text-foreground"
                  >
                    {tab.icon}
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            {/* Mobile: Right fade and indicator */}
            <div className={`absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10 flex items-center justify-end transition-opacity duration-200 ${showRightArrow ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
              <button 
                onClick={() => scrollTabs('right')}
                className="bg-background rounded-full p-1.5 mr-1 shadow-sm hover:bg-primary/10 hover:scale-110 active:scale-95 transition-all"
                aria-label="Scroll tabs right"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground/70">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </button>
            </div>
          </div>

          <TabsContent value="aim" className="animate-in fade-in-50 duration-300">
            <TabContentAim experiment={experiment} />
          </TabsContent>

          <TabsContent value="overview" className="animate-in fade-in-50 duration-300">
            <TabContentOverview experiment={experiment} />
          </TabsContent>

          <TabsContent value="recap" className="animate-in fade-in-50 duration-300">
            <TabContentRecap experiment={experiment} />
          </TabsContent>

          <TabsContent value="pretest" className="animate-in fade-in-50 duration-300">
            <PrePostTest 
              questions={(experiment.preTest as any)}
              type="pre"
              experimentId={experiment.id as number}
            />
          </TabsContent>

          <TabsContent value="experiment" className="animate-in fade-in-50 duration-300">
            <ExperimentWorkspace experiment={experiment as Experiment} />
          </TabsContent>

          <TabsContent value="complexity" className="animate-in fade-in-50 duration-300">
            <TabContentComplexity experiment={experiment} copyToClipboard={copyToClipboard} />
          </TabsContent>

          <TabsContent value="posttest" className="animate-in fade-in-50 duration-300">
            <PrePostTest 
              questions={(experiment.postTest as any)}
              type="post"
              experimentId={experiment.id as number}
            />
          </TabsContent>

          <TabsContent value="feedback" className="animate-in fade-in-50 duration-300">
            <TabContentFeedback handleFeedback={handleFeedback} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Desktop Tabs (Side Navigation) */}
      <div className="hidden md:flex md:gap-6">
        {/* Collapsible Sidebar */}
        <div 
          className={cn(
            "relative transition-all duration-500 ease-in-out overflow-hidden",
            "bg-gradient-to-br from-muted/50 to-muted/30 backdrop-blur-sm rounded-xl shadow-sm",
            sidebarExpanded ? "w-[280px]" : "w-[70px]"
          )}
          onMouseEnter={() => setSidebarExpanded(true)}
          onMouseLeave={() => setSidebarExpanded(false)}
        >
          {/* Expand indicator */}
          <div 
            className={cn(
              "absolute right-2 top-1/2 -translate-y-1/2 z-10 transition-all duration-300",
              "bg-primary/10 text-primary rounded-full p-1 shadow-sm dark:bg-primary/20 dark:text-primary-foreground",
              sidebarExpanded ? "opacity-0" : "opacity-70"
            )}
          >
            <ChevronRight className="h-4 w-4" />
          </div>
          
          <div className="p-3 space-y-6">
            <Tabs 
              defaultValue="aim" 
              className="flex flex-col h-full" 
              orientation="vertical"
              onValueChange={handleTabChange}
            >
              <TabsList className="flex flex-col w-full h-auto bg-transparent space-y-1.5">
                {tabItems.map((tab) => (
                  <TabsTrigger 
                    key={tab.value}
                    value={tab.value} 
                    className={cn(
                      "justify-start text-sm font-medium rounded-lg transition-all duration-300",
                      "hover:bg-background/80 focus-visible:outline-none group h-10",
                      activeTab === tab.value ? 
                        "bg-background text-foreground shadow-sm border-l-2 border-primary dark:bg-background/90" : 
                        "text-muted-foreground"
                    )}
                  >
                    <div className={cn(
                      "flex items-center h-full transition-all duration-300",
                      sidebarExpanded ? "justify-start gap-3 pl-2" : "justify-center w-full"
                    )}>
                      <span className={cn(
                        "p-1.5 rounded-md transition-colors duration-200 flex-shrink-0",
                        activeTab === tab.value ? 
                          "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground" : 
                          "bg-muted/50 text-muted-foreground"
                      )}>
                        {tab.icon}
                      </span>
                      <span className={cn(
                        "transition-all duration-300 whitespace-nowrap",
                        sidebarExpanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10 absolute"
                      )}>
                        {tab.label}
                      </span>
                    </div>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className={cn(
              "transition-all duration-500 ease-in-out",
              sidebarExpanded ? "opacity-100 h-auto" : "opacity-0 h-0 overflow-hidden"
            )}>
              <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                <span className="bg-primary/10 text-primary p-1.5 rounded-md dark:bg-primary/20 dark:text-primary-foreground">
                  <Beaker className="h-4 w-4" />
                </span>
                Experiment Info
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">Estimated time</span>
                  <span className="font-medium">1 hour</span>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart className="h-4 w-4 text-muted-foreground dark:text-primary-foreground/70" />
                  <span 
                    className={cn(
                      "text-sm text-muted-foreground",
                      "dark:text-primary-foreground/70",
                      "transition-all duration-500",
                      !sidebarExpanded && "opacity-0 invisible"
                    )}
                  >
                    Intermediate
                  </span>
                </div>
                <div className="flex items-center justify-between pb-1">
                  <span className="text-muted-foreground">Category</span>
                  <span className="font-medium">Algorithms</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className={cn(
          "flex-1 bg-gradient-to-br from-background to-muted/5 backdrop-blur-sm rounded-xl p-6",
          "shadow-sm border border-border/10 min-h-[600px] animate-in fade-in-50 duration-300"
        )}>
          {activeTab === "aim" && <TabContentAim experiment={experiment} />}
          {activeTab === "overview" && <TabContentOverview experiment={experiment} />}
          {activeTab === "recap" && <TabContentRecap experiment={experiment} />}
          {activeTab === "pretest" && (
            <PrePostTest 
              questions={(experiment.preTest as any)}
              type="pre"
              experimentId={experiment.id as number}
            />
          )}
          {activeTab === "experiment" && <ExperimentWorkspace experiment={experiment as Experiment} />}
          {activeTab === "complexity" && <TabContentComplexity experiment={experiment} copyToClipboard={copyToClipboard} />}
          {activeTab === "posttest" && (
            <PrePostTest 
              questions={(experiment.postTest as any)}
              type="post"
              experimentId={experiment.id as number}
            />
          )}
          {activeTab === "feedback" && <TabContentFeedback handleFeedback={handleFeedback} />}
        </div>
      </div>
    </div>
  );
}

// Tab content components to avoid duplication
function TabContentAim({ experiment }: { experiment: any }) {
  return (
    <div className="space-y-6">
      <div className="prose dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <span className="bg-primary/10 text-primary p-1.5 rounded-md dark:bg-primary/20 dark:text-primary-foreground">
            <BookOpen className="h-5 w-5" />
          </span>
          Aim of the Experiment
        </h2>
        <div className="p-5 bg-muted/30 rounded-xl mb-6 border border-border/50">
          <h3 className="mt-0 text-lg font-medium">Estimated Time</h3>
          <p className="mb-0">1 hour</p>
        </div>
        
        <h3 className="text-xl font-medium">Learning Objectives</h3>
        <p>In this experiment, we will be able to do the following:</p>
        <ul className="space-y-2 my-4">
          <li className="flex gap-2">
            <span className="text-primary mt-1">•</span>
            <span>Given an unsorted array of numbers, generate a sorted array of numbers by applying Bubble Sort.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary mt-1">•</span>
            <span>Optimise the Bubble Sort algorithm to achieve better performance.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary mt-1">•</span>
            <span>Demonstrate knowledge of time complexity of Bubble Sort by counting the number of operations involved in each iteration.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary mt-1">•</span>
            <span>Compare Bubble Sort with other sorting algorithms and realise Bubble Sort as a stable comparison sorting algorithm.</span>
          </li>
        </ul>
        
        <div className="mt-6 p-5 bg-muted/30 rounded-xl border border-border/50">
          <p className="mb-0">{experiment.aim}</p>
        </div>
      </div>
    </div>
  );
}

function TabContentOverview({ experiment }: { experiment: any }) {
  return (
    <div className="space-y-6">
      <div className="prose dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <span className="bg-primary/10 text-primary p-1.5 rounded-md dark:bg-primary/20 dark:text-primary-foreground">
            <Eye className="h-5 w-5" />
          </span>
          Overview
        </h2>
        <div className="p-5 bg-muted/30 rounded-xl border border-border/50">
          <p className="mb-0">{experiment.overview}</p>
        </div>
      </div>
      {experiment.videoUrl && (
        <div className="mt-6 rounded-xl overflow-hidden shadow-lg">
          <CustomVideoPlayer videoUrl={experiment.videoUrl} />
        </div>
      )}
    </div>
  );
}

function TabContentRecap({ experiment }: { experiment: any }) {
  return (
    <div className="space-y-6">
      <div className="prose dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <span className="bg-primary/10 text-primary p-1.5 rounded-md dark:bg-primary/20 dark:text-primary-foreground">
            <Rewind className="h-5 w-5" />
          </span>
          Prerequisites and Recap
        </h2>
        <div className="p-5 bg-muted/30 rounded-xl border border-border/50">
          <p className="whitespace-pre-line mb-0">{experiment.recap}</p>
        </div>
      </div>
    </div>
  );
}

function TabContentComplexity({ experiment, copyToClipboard }: { experiment: any, copyToClipboard: (text: string) => void }) {
  return (
    <div className="space-y-6">
      <div className="prose dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <span className="bg-primary/10 text-primary p-1.5 rounded-md dark:bg-primary/20 dark:text-primary-foreground">
            <BarChart2 className="h-5 w-5" />
          </span>
          Algorithm Complexity Analysis
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="p-5 bg-muted/30 rounded-xl border border-border/50">
            <h3 className="text-xl font-medium flex items-center gap-2 mt-0">
              <span className="text-primary dark:text-primary-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                  <polyline points="17 6 23 6 23 12"></polyline>
                </svg>
              </span>
              Time Complexity
            </h3>
            <ul className="space-y-2 pl-0 list-none">
              <li className="flex justify-between items-center border-b border-border/30 pb-2">
                <span className="text-muted-foreground">Best Case:</span>
                <code className="bg-primary/5 px-2 py-0.5 rounded text-primary font-mono dark:bg-primary/20 dark:text-primary-foreground">
                  {experiment.complexity?.timeComplexity?.best || "O(n)"}
                </code>
              </li>
              <li className="flex justify-between items-center border-b border-border/30 pb-2">
                <span className="text-muted-foreground">Average Case:</span>
                <code className="bg-primary/5 px-2 py-0.5 rounded text-primary font-mono dark:bg-primary/20 dark:text-primary-foreground">
                  {experiment.complexity?.timeComplexity?.average || "O(n²)"}
                </code>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-muted-foreground">Worst Case:</span>
                <code className="bg-primary/5 px-2 py-0.5 rounded text-primary font-mono dark:bg-primary/20 dark:text-primary-foreground">
                  {experiment.complexity?.timeComplexity?.worst || "O(n²)"}
                </code>
              </li>
            </ul>
          </div>
          
          <div className="p-5 bg-muted/30 rounded-xl border border-border/50">
            <h3 className="text-xl font-medium flex items-center gap-2 mt-0">
              <span className="text-primary dark:text-primary-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                </svg>
              </span>
              Space Complexity
            </h3>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Required Space:</span>
              <code className="bg-primary/5 px-2 py-0.5 rounded text-primary font-mono dark:bg-primary/20 dark:text-primary-foreground">
                {experiment.complexity?.spaceComplexity || "O(1)"}
              </code>
            </div>
          </div>
        </div>
        
        {experiment.complexity?.recurrenceRelation && (
          <div className="mt-6 p-5 bg-muted/30 rounded-xl border border-border/50">
            <h3 className="text-xl font-medium flex items-center gap-2 mt-0">
              <span className="text-primary dark:text-primary-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </span>
              Recurrence Relation
            </h3>
            <div className="relative mt-3">
              <pre className="bg-background text-foreground p-4 rounded-lg border overflow-x-auto font-mono text-sm dark:bg-muted/50 dark:text-primary-foreground">
                {experiment.complexity.recurrenceRelation}
              </pre>
              <Button
                variant="outline"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8 bg-background/80 backdrop-blur-sm hover:bg-primary/10 hover:text-primary transition-colors dark:bg-muted/80 dark:hover:bg-primary/30"
                onClick={() => copyToClipboard(experiment.complexity.recurrenceRelation)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
        
        {experiment.complexity?.analysis && (
          <div className="mt-6 p-5 bg-muted/30 rounded-xl border border-border/50">
            <h3 className="text-xl font-medium flex items-center gap-2 mt-0">
              <span className="text-primary dark:text-primary-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
              </span>
              Analysis
            </h3>
            <p className="mt-3 mb-0 dark:text-primary-foreground">{experiment.complexity?.analysis}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function TabContentFeedback({ handleFeedback }: { handleFeedback: () => void }) {
  return (
    <div className="space-y-6">
      <div className="prose dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <span className="bg-primary/10 text-primary p-1.5 rounded-md dark:bg-primary/20 dark:text-primary-foreground">
            <MessageSquare className="h-5 w-5" />
          </span>
          Feedback
        </h2>
        <div className="p-5 bg-muted/30 rounded-xl border border-border/50">
          <p>Your feedback is valuable to us. Share your experience and help us improve this virtual lab experience.</p>
          <Button 
            onClick={handleFeedback}
            className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Send Feedback
          </Button>
        </div>
      </div>
    </div>
  );
}