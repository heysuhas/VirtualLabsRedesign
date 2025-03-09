import { Link } from "wouter";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { apiRequest } from "@/lib/queryClient";
import type { Experiment, Preferences } from "@shared/schema";

interface ExperimentCardProps {
  experiment: Experiment;
  onClick?: () => void;
}

export default function ExperimentCard({ experiment, onClick }: ExperimentCardProps) {
  const { data: preferences } = useQuery<Preferences>({
    queryKey: ["/api/preferences"],
  });

  const isStarred = preferences?.starredExperiments?.includes(experiment.id);

  const starMutation = useMutation({
    mutationFn: async (event: React.MouseEvent) => {
      event.preventDefault(); // Prevent card click when clicking star
      const currentStarred = preferences?.starredExperiments || [];
      const newStarred = currentStarred.includes(experiment.id)
        ? currentStarred.filter(id => id !== experiment.id)
        : [...currentStarred, experiment.id];

      await apiRequest("POST", "/api/preferences", {
        starredExperiments: newStarred
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/preferences"] });
    },
  });

  return (
    <Link href={`/experiments/${experiment.id}`} onClick={onClick}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 bg-card hover:bg-card/80">
          <div className="aspect-video relative overflow-hidden">
            <motion.img 
              src={experiment.imageUrl} 
              alt={experiment.title}
              className="object-cover w-full h-full"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/30 z-10" />
            <div className="absolute top-2 right-2 z-20">
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 
                  bg-gray-800/50 hover:bg-gray-800/70
                  dark:bg-gray-600/50 dark:hover:bg-gray-700/60
                  backdrop-blur-sm
                  text-white
                  hover:text-white
                  ring-1 ring-white/20 hover:ring-white/40
                  transition-colors"
                onClick={(e) => {
                  e.preventDefault();  // Prevent navigation
                  e.stopPropagation(); // Stop event bubbling
                  starMutation.mutate(e);
                }}
              >
                <Star 
                  className={`h-4 w-4 ${
                    isStarred ? 'text-yellow-400' : 'text-white'
                  }`} 
                  fill={isStarred ? "currentColor" : "none"} 
                />
              </Button>
            </div>
          </div>

          <CardHeader>
            <div className="flex items-start justify-between">
              <CardTitle className="text-xl group-hover:text-primary transition-colors">
                {experiment.title}
              </CardTitle>
              <Badge variant="secondary" className="animate-in fade-in">
                {experiment.rating}/5
              </Badge>
            </div>
            <CardDescription className="line-clamp-2">
              {experiment.description}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <motion.span 
                initial={{ opacity: 0.5 }}
                whileHover={{ opacity: 1 }}
              >
                {experiment.institute}
              </motion.span>
              <motion.span
                initial={{ opacity: 0.5 }}
                whileHover={{ opacity: 1 }}
              >
                {experiment.estimatedTime}
              </motion.span>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
}