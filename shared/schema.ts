import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const experiments = pgTable("experiments", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  discipline: text("discipline").notNull(),
  institute: text("institute").notNull(),
  estimatedTime: text("estimated_time").notNull(),
  objectives: text("objectives").array().notNull(),
  imageUrl: text("image_url").notNull(),
  rating: integer("rating").default(0),
  videoUrl: text("video_url"),
  aim: text("aim"),
  overview: text("overview"),
  recap: text("recap"),
  preTest: jsonb("pre_test").notNull().default([]),
  postTest: jsonb("post_test").notNull().default([]),
  complexity: jsonb("complexity").notNull().default({}),
});

export const preferences = pgTable("preferences", {
  id: serial("id").primaryKey(),
  theme: text("theme").notNull().default("system"),
  fontSize: integer("font_size").notNull().default(16),
  highContrast: boolean("high_contrast").notNull().default(false),
  starredExperiments: integer("starred_experiments").array().notNull().default([]),
});

// Define test question schema
export const questionSchema = z.object({
  id: z.number(),
  question: z.string(),
  options: z.array(z.string()),
  correctAnswer: z.number(),
  difficulty: z.enum(["Beginner", "Intermediate", "Advanced"]),
  explanation: z.string().optional(),
});

export const complexitySchema = z.object({
  timeComplexity: z.object({
    best: z.string(),
    average: z.string(),
    worst: z.string(),
  }),
  spaceComplexity: z.string(),
  recurrenceRelation: z.string().optional(),
  analysis: z.string(),
});

export const insertExperimentSchema = createInsertSchema(experiments).omit({ id: true });
export const insertPreferencesSchema = createInsertSchema(preferences).omit({ id: true });

export type Experiment = typeof experiments.$inferSelect;
export type InsertExperiment = z.infer<typeof insertExperimentSchema>;
export type Preferences = typeof preferences.$inferSelect;
export type InsertPreferences = z.infer<typeof insertPreferencesSchema>;
export type Question = z.infer<typeof questionSchema>;
export type Complexity = z.infer<typeof complexitySchema>;