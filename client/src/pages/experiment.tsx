import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { queryClient } from "@/lib/queryClient";
import { apiRequest } from "@/lib/queryClient";
import ExperimentWorkspace from "@/components/experiment-workspaces";
import CustomVideoPlayer from "@/components/custom-video-player";
import PrePostTest from "@/components/pre-post-test";
import type { Experiment, Preferences } from "@shared/schema";

export default function ExperimentPage() {
  const { id } = useParams();

  const { data: experiment, isLoading: experimentLoading } = useQuery<Experiment>({
    queryKey: [`/api/experiments/${id}`],
  });

  const { data: preferences } = useQuery<Preferences>({
    queryKey: ["/api/preferences"],
  });

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

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">{experiment.title}</h1>
          <p className="text-muted-foreground">{experiment.description}</p>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => starMutation.mutate()}
          className={isStarred ? "text-yellow-500" : ""}
        >
          <Star className="h-4 w-4" fill={isStarred ? "currentColor" : "none"} />
        </Button>
      </div>

      <Tabs defaultValue="aim" className="space-y-4">
        <TabsList className="grid grid-cols-4 lg:grid-cols-8 w-full">
          <TabsTrigger value="aim">Aim</TabsTrigger>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="recap">Recap</TabsTrigger>
          <TabsTrigger value="pretest">Pre Test</TabsTrigger>
          <TabsTrigger value="experiment">Experiment</TabsTrigger>
          <TabsTrigger value="complexity">Complexity</TabsTrigger>
          <TabsTrigger value="posttest">Post Test</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
        </TabsList>

        <TabsContent value="aim" className="space-y-4">
          <div className="prose dark:prose-invert max-w-none">
            <h2>Aim of the Experiment</h2>
            <p>{experiment.aim}</p>
          </div>
        </TabsContent>

        <TabsContent value="overview" className="space-y-6">
          <div className="prose dark:prose-invert max-w-none">
            <h2>Overview</h2>
            <p>{experiment.overview}</p>
          </div>
          {experiment.videoUrl && (
            <div className="aspect-video rounded-lg overflow-hidden bg-card">
              <CustomVideoPlayer videoUrl={experiment.videoUrl} />
            </div>
          )}
        </TabsContent>

        <TabsContent value="recap" className="space-y-4">
          <div className="prose dark:prose-invert max-w-none">
            <h2>Prerequisites and Recap</h2>
            <p className="whitespace-pre-line">{experiment.recap}</p>
          </div>
        </TabsContent>

        <TabsContent value="pretest">
          <PrePostTest 
            questions={experiment.preTest}
            type="pre"
            experimentId={experiment.id}
          />
        </TabsContent>

        <TabsContent value="experiment">
          <ExperimentWorkspace experiment={experiment} />
        </TabsContent>

        <TabsContent value="complexity" className="space-y-6">
          <div className="prose dark:prose-invert max-w-none">
            <h2>Algorithm Complexity Analysis</h2>
            <div className="space-y-4">
              <div>
                <h3>Time Complexity</h3>
                <ul>
                  <li>Best Case: {experiment.complexity.timeComplexity?.best}</li>
                  <li>Average Case: {experiment.complexity.timeComplexity?.average}</li>
                  <li>Worst Case: {experiment.complexity.timeComplexity?.worst}</li>
                </ul>
              </div>
              <div>
                <h3>Space Complexity</h3>
                <p>{experiment.complexity.spaceComplexity}</p>
              </div>
              {experiment.complexity.recurrenceRelation && (
                <div>
                  <h3>Recurrence Relation</h3>
                  <pre className="bg-muted p-4 rounded-lg">
                    {experiment.complexity.recurrenceRelation}
                  </pre>
                </div>
              )}
              <div>
                <h3>Analysis</h3>
                <p>{experiment.complexity.analysis}</p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="posttest">
          <PrePostTest 
            questions={experiment.postTest}
            type="post"
            experimentId={experiment.id}
          />
        </TabsContent>

        <TabsContent value="feedback" className="space-y-4">
          <div className="prose dark:prose-invert max-w-none">
            <h2>Feedback</h2>
            <p>Your feedback is valuable to us. Share your experience and help us improve this virtual lab experience.</p>
            <Button onClick={handleFeedback}>
              Send Feedback
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}