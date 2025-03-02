import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import type { Experiment } from "@shared/schema";

interface NlpWorkspaceProps {
  experiment: Experiment;
}

export default function NlpWorkspace({ experiment }: NlpWorkspaceProps): JSX.Element {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <Tabs defaultValue="visualization" className="space-y-4">
      <TabsList>
        <TabsTrigger value="visualization">Visualization</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>

      <TabsContent value="visualization">
        <div className="h-64 flex items-center justify-center bg-card rounded-lg">
          <p className="text-muted-foreground">
            {experiment.title} visualization coming soon...
          </p>
        </div>
      </TabsContent>

      <TabsContent value="code">
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`
// ${experiment.title} implementation
function notImplemented() {
  // Coming soon...
}
          `}</code>
        </pre>
      </TabsContent>
    </Tabs>
  );
}
