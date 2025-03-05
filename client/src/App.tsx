import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { queryClient } from "./lib/queryClient";
import NavigationHeader from "./components/navigation-header";
import Landing from "./pages/landing";
import Home from "./pages/home";
import Experiment from "./pages/experiment";
import NotFound from "./pages/not-found";
import BlobCursor from "./components/blob-cursor";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background cursor-none">
        <BlobCursor />
        <NavigationHeader />
        <main className="container mx-auto px-4 py-8 pt-24">
          <Switch>
            <Route path="/" component={Landing} />
            <Route path="/home" component={Home} />
            <Route path="/experiments/:id" component={Experiment} />
            <Route component={NotFound} />
          </Switch>
        </main>
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}