import type { Request, Response } from "express"
import path from "path"
import fs from "fs/promises"
import Papa from "papaparse"

// Method 1: Named export (what you're currently using)
export async function getWorkshopData(req: Request, res: Response) {
  const { year } = req.params

  try {
    const csvPath = path.join(process.cwd(), "client", "src", "assets", "Workshop", `${year}.csv`)
    const fileContent = await fs.readFile(csvPath, "utf-8")

    const results = Papa.parse(fileContent, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim(),
      transform: (value) => value.trim(),
    })

    res.json(results.data)
  } catch (error) {
    console.error(`Error reading workshop data for year ${year}:`, error)
    res.status(404).json({ message: `Workshop data for year ${year} not found` })
  }
}

// Method 2: Alternative export as an object (as a backup)
export const workshopRoutes = {
  getWorkshopData,
}

// Method 3: Default export (as another option)
export default { getWorkshopData }

