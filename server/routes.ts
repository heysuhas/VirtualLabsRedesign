import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/experiments", async (_req, res) => {
    const experiments = await storage.getExperiments();
    res.json(experiments);
  });

  app.get("/api/experiments/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const experiment = await storage.getExperiment(id);
    
    if (!experiment) {
      return res.status(404).json({ message: "Experiment not found" });
    }
    
    res.json(experiment);
  });

  app.get("/api/preferences", async (_req, res) => {
    const preferences = await storage.getPreferences();
    res.json(preferences);
  });

  app.post("/api/preferences", async (req, res) => {
    const preferences = await storage.updatePreferences(req.body);
    res.json(preferences);
  });

  const httpServer = createServer(app);
  return httpServer;
}
