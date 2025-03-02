import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { queryClient } from "./lib/queryClient";
import NavigationHeader from "./components/navigation-header";
import CustomCursor from "./components/custom-cursor";
import Home from "./pages/home";
import Experiment from "./pages/experiment";
import NotFound from "./pages/not-found";

function Router() {
  return (
    <div className="min-h-screen bg-background cursor-none">
      <CustomCursor />
      <NavigationHeader />
      <main className="container mx-auto px-4 py-8 pt-24">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/experiments/:id" component={Experiment} />
          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;