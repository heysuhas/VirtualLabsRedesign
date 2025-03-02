import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ExperimentCard from "@/components/experiment-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import type { Experiment, Preferences } from "@shared/schema";

type FilterType = "all" | "popular" | "recent" | "starred";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const { data: experiments, isLoading } = useQuery<Experiment[]>({
    queryKey: ["/api/experiments"],
  });

  const { data: preferences } = useQuery<Preferences>({
    queryKey: ["/api/preferences"],
  });

  const filteredExperiments = experiments?.filter(exp => {
    const matchesSearch = exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         exp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         exp.discipline.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    switch (activeFilter) {
      case "popular":
        return (exp.rating ?? 0) >= 4;
      case "recent":
        // In a real app, we'd use createdAt date
        return true;
      case "starred":
        return preferences?.starredExperiments?.includes(exp.id) ?? false;
      default:
        return true;
    }
  });

  if (isLoading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-12 w-64" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-64 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold">Virtual Labs Experiments</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Access a wide range of virtual experiments designed to enhance your learning experience. 
          Choose from various disciplines and start experimenting today.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          type="search"
          placeholder="Search experiments..."
          className="max-w-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="flex gap-2">
          <Button
            variant={activeFilter === "all" ? "default" : "outline"}
            onClick={() => setActiveFilter("all")}
          >
            All
          </Button>
          <Button
            variant={activeFilter === "popular" ? "default" : "outline"}
            onClick={() => setActiveFilter("popular")}
          >
            Popular
          </Button>
          <Button
            variant={activeFilter === "recent" ? "default" : "outline"}
            onClick={() => setActiveFilter("recent")}
          >
            Recent
          </Button>
          <Button
            variant={activeFilter === "starred" ? "default" : "outline"}
            onClick={() => setActiveFilter("starred")}
          >
            Starred
          </Button>
        </div>
      </div>

      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {filteredExperiments?.map((experiment) => (
            <motion.div
              key={experiment.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ExperimentCard experiment={experiment} />
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredExperiments?.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full text-center py-12"
          >
            <p className="text-muted-foreground">No experiments found matching your search criteria.</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}