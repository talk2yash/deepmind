import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, jsonb, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const mediaScans = pgTable("media_scans", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  fileName: text("file_name").notNull(),
  fileType: text("file_type").notNull(),
  fileSize: integer("file_size").notNull(),
  uploadedAt: timestamp("uploaded_at").notNull().defaultNow(),
  credibilityScore: real("credibility_score").notNull(),
  confidenceRating: text("confidence_rating").notNull(),
  isAuthentic: text("is_authentic").notNull(),
  manipulationIndicators: jsonb("manipulation_indicators").notNull(),
  technicalAnalysis: jsonb("technical_analysis").notNull(),
  explanation: text("explanation").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertMediaScanSchema = createInsertSchema(mediaScans).omit({
  id: true,
  uploadedAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type MediaScan = typeof mediaScans.$inferSelect;
export type InsertMediaScan = z.infer<typeof insertMediaScanSchema>;

export interface ManipulationIndicator {
  type: string;
  location: string;
  severity: "low" | "medium" | "high";
  confidence: number;
  description: string;
}

export interface TechnicalAnalysis {
  metadata: {
    hasBeenEdited: boolean;
    originalCreationDate?: string;
    softwareUsed?: string[];
  };
  forensicMarkers: {
    compressionArtifacts: boolean;
    noisePatternInconsistencies: boolean;
    lightingAnomalies: boolean;
    edgeDetectionIrregularities: boolean;
  };
  aiDetection: {
    modelUsed: string[];
    deepfakeSignatures: string[];
    syntheticMediaIndicators: string[];
  };
}
