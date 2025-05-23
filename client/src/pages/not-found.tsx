import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <Card className="w-full max-w-md mx-4 bg-card">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-destructive" />
            <h1 className="text-2xl font-bold text-foreground">Coming Soon</h1>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            We're building this page, Try again Later.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
