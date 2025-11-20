import type { Express } from "express";
import { createServer, type Server } from "http";
import multer from "multer";
import { storage } from "./storage";
import { type ManipulationIndicator, type TechnicalAnalysis } from "@shared/schema";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB limit
  },
});

function generateMockAnalysis(fileName: string, fileType: string, fileSize: number) {
  // Generate varying results based on file characteristics for demo purposes
  const hash = fileName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const credibilityScore = Math.min(95, Math.max(15, (hash % 80) + 10));
  const isAuthentic = credibilityScore >= 70 ? "Likely Authentic" : credibilityScore >= 40 ? "Uncertain" : "Likely Manipulated";
  const confidenceRating = credibilityScore >= 80 || credibilityScore <= 30 ? "High Confidence" : "Medium Confidence";

  const manipulationIndicators: ManipulationIndicator[] = [];

  if (credibilityScore < 70) {
    if (fileType.startsWith('video/') || fileType.startsWith('image/')) {
      manipulationIndicators.push({
        type: "Facial Inconsistencies",
        location: fileType.startsWith('video/') ? "Face region (0:12-0:45)" : "Central face area",
        severity: credibilityScore < 40 ? "high" : "medium",
        confidence: Math.min(95, 60 + (70 - credibilityScore)),
        description: "Detected unnatural facial movements and characteristics suggesting AI-generated or manipulated content"
      });
    }

    if (fileType.startsWith('video/') || fileType.startsWith('audio/')) {
      manipulationIndicators.push({
        type: "Audio Artifacts",
        location: "Audio track",
        severity: credibilityScore < 30 ? "high" : credibilityScore < 50 ? "medium" : "low",
        confidence: Math.min(92, 55 + (70 - credibilityScore)),
        description: "Voice synthesis patterns detected with characteristics of AI-generated speech or audio manipulation"
      });
    }

    manipulationIndicators.push({
      type: "Compression Anomalies",
      location: "Entire file",
      severity: "low",
      confidence: Math.min(75, 50 + (70 - credibilityScore) / 2),
      description: "Multiple compression layers suggest post-processing and potential manipulation"
    });
  } else {
    // Authentic files might still have minor indicators
    if (Math.random() > 0.5) {
      manipulationIndicators.push({
        type: "Minor Metadata Inconsistencies",
        location: "File metadata",
        severity: "low",
        confidence: 45 + Math.random() * 20,
        description: "Some minor metadata discrepancies detected, but within normal range for authentic media"
      });
    }
  }

  const technicalAnalysis: TechnicalAnalysis = {
    metadata: {
      hasBeenEdited: credibilityScore < 60,
      originalCreationDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      softwareUsed: credibilityScore < 60 
        ? ["Adobe Premiere Pro", "Unknown AI Tool"]
        : ["Camera Software", "Standard Editor"]
    },
    forensicMarkers: {
      compressionArtifacts: credibilityScore < 50,
      noisePatternInconsistencies: credibilityScore < 40,
      lightingAnomalies: credibilityScore < 35,
      edgeDetectionIrregularities: credibilityScore < 45
    },
    aiDetection: {
      modelUsed: ["Xception", "DIRE", "CNN-RNN Ensemble"],
      deepfakeSignatures: credibilityScore < 50 
        ? ["GAN artifacts", "Temporal inconsistencies", "Spectral anomalies"]
        : [],
      syntheticMediaIndicators: credibilityScore < 40 
        ? ["Face swap patterns", "Voice cloning markers"]
        : []
    }
  };

  let explanation = "";
  
  if (credibilityScore >= 80) {
    explanation = `This ${fileType.split('/')[0]} file shows strong indicators of authenticity. Our multimodal analysis found no significant manipulation markers, with all forensic tests returning within normal parameters for genuine media.

The AI detection models (Xception, DIRE, and CNN-RNN ensemble) did not identify any GAN artifacts, deepfake signatures, or synthetic media patterns. Metadata analysis confirms standard creation and editing workflows consistent with authentic content.

With a credibility score of ${credibilityScore}/100, we assess this media as likely authentic with ${confidenceRating.toLowerCase()}. This content appears suitable for journalistic and legal use, though we always recommend corroborating with additional sources when possible.`;
  } else if (credibilityScore >= 50) {
    explanation = `This ${fileType.split('/')[0]} file presents mixed indicators requiring further investigation. Our analysis detected some anomalies that could suggest manipulation, but results are not conclusive enough for a definitive determination.

${manipulationIndicators.length > 0 ? `Notable findings include ${manipulationIndicators[0].description.toLowerCase()}.` : ''} The metadata shows some inconsistencies, and forensic analysis revealed patterns that deviate from typical authentic media.

With a credibility score of ${credibilityScore}/100, we recommend treating this content with caution and conducting additional verification before use in critical contexts. Consider seeking expert human review for important decisions.`;
  } else {
    explanation = `This ${fileType.split('/')[0]} file shows strong indicators of manipulation. Our multimodal analysis detected significant anomalies suggesting AI-generated or edited content.

${manipulationIndicators.length > 0 ? manipulationIndicators[0].description : ''} ${manipulationIndicators.length > 1 ? `Additionally, ${manipulationIndicators[1].description.toLowerCase()}.` : ''}

The metadata analysis shows the file has been edited using professional software, and compression analysis suggests multiple encoding passes which often indicate manipulation. Our AI detection models identified patterns commonly associated with deepfake generation.

With a credibility score of ${credibilityScore}/100, we assess this media as ${isAuthentic.toLowerCase()} with ${confidenceRating.toLowerCase()}. We strongly recommend treating this content with skepticism and conducting thorough verification before use in journalistic or legal contexts.`;
  }

  return {
    credibilityScore,
    confidenceRating,
    isAuthentic,
    manipulationIndicators,
    technicalAnalysis,
    explanation
  };
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Upload and analyze media file
  app.post("/api/analyze", upload.single('file'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const { originalname, mimetype, size } = req.file;

      // Generate mock analysis results
      const analysis = generateMockAnalysis(originalname, mimetype, size);

      // Store the scan result
      const mediaScan = await storage.createMediaScan({
        fileName: originalname,
        fileType: mimetype,
        fileSize: size,
        ...analysis,
      });

      res.json(mediaScan);
    } catch (error) {
      console.error("Error analyzing media:", error);
      res.status(500).json({ error: "Failed to analyze media" });
    }
  });

  // Get analysis results by ID
  app.get("/api/scans/:id", async (req, res) => {
    try {
      const scan = await storage.getMediaScan(req.params.id);
      
      if (!scan) {
        return res.status(404).json({ error: "Scan not found" });
      }

      res.json(scan);
    } catch (error) {
      console.error("Error fetching scan:", error);
      res.status(500).json({ error: "Failed to fetch scan" });
    }
  });

  // Get all scans (for potential dashboard)
  app.get("/api/scans", async (_req, res) => {
    try {
      const scans = await storage.getAllMediaScans();
      res.json(scans);
    } catch (error) {
      console.error("Error fetching scans:", error);
      res.status(500).json({ error: "Failed to fetch scans" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
