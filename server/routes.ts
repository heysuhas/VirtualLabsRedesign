import type { Express } from "express"
import { createServer, type Server } from "http"
import { storage } from "./storage"

// Try different import methods to resolve the issue
// Method 1: Direct import (original)
// import { getWorkshopData } from "./routes/workshop-data"

// If Method 1 fails, you can try these alternatives:
// Method 2: Object import
// import { workshopRoutes } from "./routes/workshop-data";
// const { getWorkshopData } = workshopRoutes;

// Method 3: Default import
import workshopModule from "./routes/workshop-data";
const { getWorkshopData } = workshopModule;

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/experiments", async (_req, res) => {
    const experiments = await storage.getExperiments()
    res.json(experiments)
  })

  app.get("/api/experiments/:id", async (req, res) => {
    const id = Number.parseInt(req.params.id)
    const experiment = await storage.getExperiment(id)

    if (!experiment) {
      return res.status(404).json({ message: "Experiment not found" })
    }

    res.json(experiment)
  })

  app.get("/api/preferences", async (_req, res) => {
    const preferences = await storage.getPreferences()
    res.json(preferences)
  })

  app.post("/api/preferences", async (req, res) => {
    const preferences = await storage.updatePreferences(req.body)
    res.json(preferences)
  })

  // Workshop data route
  app.get("/api/workshop-data/:year", getWorkshopData)

  const httpServer = createServer(app)
  return httpServer
}

